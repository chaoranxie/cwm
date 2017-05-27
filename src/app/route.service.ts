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
  public routes: Observable<Route[]>;
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
        endAt: 11,
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


    this.routes = this.routesBS.combineLatest(this.routeCompletionsBS, (routes, completions) => {
      // Save the data if the routes are from firebase server
      if (routes.length >0 && routes[0].$key !== undefined) {
        localStorage.setItem("routes", JSON.stringify(routes));
      }
      const finalRoutes: Route[] = [];
      routes.forEach(routeJson => {
        const myRoute: Route = Route.fromJSON(routeJson);
        myRoute.hasCompleted = completions[routeJson.$key] || false;
        finalRoutes.push(myRoute);
      })
      return finalRoutes;
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
