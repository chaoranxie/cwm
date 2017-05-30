import { Injectable, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import {Observable, Subscription} from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../../environments/environment';

import '../rxjs-extensions';


import { Route } from '../model/route';
import { UserService } from '../services/user.service';

const defaultRoutes = JSON.parse(localStorage.getItem("routes2")) || [];


@Injectable()
export class RouteService implements OnInit {

  private fbRoutes: FirebaseListObservable<any>;
  private completionSubscription: Subscription;

  public routesBS: BehaviorSubject<any> = new BehaviorSubject<any>(defaultRoutes);
  public routeCompletionsBS: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private db: AngularFireDatabase,
    public userService: UserService,
  ) {

    this.fbRoutes = db.list('/routes', {
      query: {
        orderByChild: 'grade',
        startAt: 4,
        endAt: 16,
      }
    });

    this.fbRoutes.subscribe(routes => {
      this.routesBS.next(routes);
    })

    this.userService.user.subscribe(currentUser => {

      // debugger;

      if (currentUser !== null) {
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
    this.db.object(`/routeCompletions/${userId}/${routeId}`).set(true);
  }

  ngOnInit() {

  }

}
