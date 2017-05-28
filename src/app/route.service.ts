import { Injectable, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import {Observable, Subscription} from 'rxjs/Rx';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/combineLatest';



import { Route } from './route';
import { UserService } from './user.service';

const defaultRoutes = JSON.parse(localStorage.getItem("routes")) || [];


@Injectable()
export class RouteService implements OnInit {

  private fbRoutes: FirebaseListObservable<any>;
  // public routes: Observable<Route[]>;
  public routes: Route[] = [];

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
        startAt: 6,
        endAt: 8,
      }
    });

    this.fbRoutes.subscribe(routes => {
      this.routesBS.next(routes);
    })

    this.userService.user.subscribe(currentUser => {
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


    this.routesBS.combineLatest(this.routeCompletionsBS, (routesFB, completionsFB) => {
      // debugger;
      if (this.routes.length == 0){
        // debugger;
        routesFB.forEach(routeJson => {
          const myRoute: Route = Route.fromJSON(routeJson);
          myRoute.hasCompleted = completionsFB[routeJson.$key] || false;

          this.routes.push(myRoute);
        })
      } else {
        // debugger;
        // this.routes[0].hasCompleted = !!this.routes[0].hasCompleted;
      }




    }).subscribe(routes => {

      // debugger;
    });
    //
    // // Update
    // // Questions:
    // How do i store data so it can be accessed easily
    // // TODO: experiment with

    // TODO:
    // Ravi mentioned just keep 2 observables and then the component itself will check if one exists

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
