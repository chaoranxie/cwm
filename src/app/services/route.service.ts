import { Injectable, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import {Observable, Subscription} from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../../environments/environment';

import '../rxjs-extensions';


import { Route, RouteJSON } from '../model';
import { UserService } from '../services/user.service';



@Injectable()
export class RouteService implements OnInit {

  private fbRoutes: FirebaseListObservable<any>;
  private completionSubscription: Subscription;

  public routeCompletionsBS: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private db: AngularFireDatabase,
    public userService: UserService,
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
        this.completionSubscription = db.object(`/routeCompletions/${currentUser.uid}/`).subscribe(obj => {
          this.routeCompletionsBS.next(obj);
        });
      } else {
        if (this.completionSubscription){
            this.completionSubscription.unsubscribe()
        }
        this.routeCompletionsBS.next({});
      }
    });

  }

  addRoute(route: Route) {
    return this.fbRoutes.push(Route.toJSON(route));
  }

  markRouteAsCompletedByUser(userId: string, routeId: string) {
    this.db.object(`/routeCompletions/${userId}/${routeId}`).set(true)

    // .then( ret => {
    //   debugger;
    // });
  }

  ngOnInit() {

  }


  getRoutes(): Observable<RouteJSON[]> {
    return this.fbRoutes;
  }

  saveRoute(route: Route): Observable<Route> {
    this.fbRoutes.push(Route.toJSON(route)).then(route => {
      debugger;
    });

    return Observable.of(route)
  }

}
