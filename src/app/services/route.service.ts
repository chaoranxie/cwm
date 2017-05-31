import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription} from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Store } from '@ngrx/store';

import { environment } from '../../environments/environment';
import '../rxjs-extensions';
import { Route } from '../model';
import { UserService } from '../services/user.service';
import { AppStore } from '../store/app-store';
import { RouteActions } from '../store/actions';

@Injectable()
export class RouteService implements OnInit {

  private fbRoutes: FirebaseListObservable<any>;
  private completionSubscription: Subscription;

  public routeCompletionsBS: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    private db: AngularFireDatabase,
    public userService: UserService,
    private store: Store<AppStore>,
    private routeActions: RouteActions
  ) {

    this.fbRoutes = db.list('/routes', {
      query: {
        orderByChild: 'grade',
        startAt: 4,
        endAt: 4,
      }
    });

    this.userService.user.subscribe(currentUser => {
      if (currentUser !== null) {
        // could test using db.list( to get a list back
        this.completionSubscription = db.list(`/routeCompletions/${currentUser.uid}/`).subscribe(obj => {
          this.routeCompletionsBS.next(obj);
        });
      } else {
        if (this.completionSubscription) {
          this.completionSubscription.unsubscribe()
        }
        this.routeCompletionsBS.next({});
      }
    });
  }

  addRoute(route: Route) {
    this.fbRoutes.push(route).then(
      (ret) => {
        route.$key = ret.key;
        this.store.dispatch(this.routeActions.addRouteSuccess(route));
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }

  completeRoute(routeKey: string) {
    const userId = this.userService.afAuth.auth.currentUser.uid;
    this.db.object(`/routeCompletions/${userId}/${routeKey}`).set(true).then(
      (ret) => {
        this.store.dispatch(this.routeActions.completeRouteSuccess(routeKey));
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }

  ngOnInit() {

  }

  getRoutes(): Observable<Route[]> {
    return this.fbRoutes;
  }

  saveRoute(route: Route): Observable<Route> {
    this.fbRoutes.push(route).then(ret => {

    });

    return Observable.of(route)
  }

}
