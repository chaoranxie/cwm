import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/combineLatest';



import { Route } from './route';
import { UserService } from './user.service';

const defaultRoutes = JSON.parse(localStorage.getItem("routes222")) || [];


@Injectable()
export class RouteService implements OnInit {

  private fbRoutes: FirebaseListObservable<any>;
  public routes: Observable<Route[]>;

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
      debugger;
      this.routesBS.next(routes);
    })

    this.userService.user.subscribe(currentUser => {
      debugger;
      if (currentUser !== null) {
        db.object(`/routeCompletions/${currentUser.uid}/`).subscribe(obj => {
          this.routeCompletionsBS.next(obj);
        });
      } else {
        this.routeCompletionsBS.next({});
      }
    });


    this.routes = this.routesBS.combineLatest(this.routeCompletionsBS, (routes, completions) => {
      debugger;
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
