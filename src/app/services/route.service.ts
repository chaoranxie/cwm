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
        endAt: 10,
      }
    });


  }

  addRoute(route: Route) {
    this.fbRoutes.push(route).then(
      (ret) => {
        // debugger;
        // FIXME:
        // This is weird, for newly added Route, i need to manually set the $key value
        // i did this becasue or else you cant mark a new route as complete without a key,
        // interesting though, this has not been an issue since everytime you get redirected
        // to route/list, all the new route are retrieved again from server.

        // for Route that i got back from the server they do have $key but it does not
        // show up when you do Object.keys(route)

        // route.$key = ret.key;
        this.store.dispatch(this.routeActions.addRouteSuccess(route));
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }

  addCompletion(routeKey: string) {
    const userId = this.userService.afAuth.auth.currentUser.uid;
    this.db.object(`/routeCompletions/${userId}/${routeKey}`).set(true).then(
      (ret) => {
        this.store.dispatch(this.routeActions.addCompletionSuccess(routeKey));
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }

  ngOnInit() {

  }

  getRoutes(): Observable<Route[]> {
    return this.fbRoutes.take(1);
  }

  getCompletions(): Observable<string[]> {
    if (this.userService.afAuth.auth.currentUser === null) {
      return Observable.of([]);
    } else {
      const userId = this.userService.afAuth.auth.currentUser.uid;
      // Note that it is important to do take 1 here or else
      // we will constantly be emitting new obserable
      // return this.db.list(`/routeCompletions/${userId}`).map(completions => {
      return this.db.list(`/routeCompletions/${userId}`).take(1).map(completions => {
        return completions.map(completion => completion.$key)
      })
    }
  }

}
