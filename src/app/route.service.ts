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

@Injectable()
export class RouteService implements OnInit {

  private fbRoutes: FirebaseListObservable<any>;
  public routes: Observable<Route[]>;

  public fbRouteCompletions: BehaviorSubject<any> =
    new BehaviorSubject<any>({});


  public completions: Observable<any[]>;
  private _completions: BehaviorSubject<any[]> =    new BehaviorSubject<any[]>([]);


  constructor(
    private db: AngularFireDatabase,
    public userService: UserService,
  ) {

    this.fbRoutes = db.list('/routes', {
      query: {
        orderByChild: 'grade',
      }
    });

    this.userService.user.subscribe(currentUser => {
      if (currentUser!==null) {
      console.log(currentUser);
        db.object(`/routeCompletions/${currentUser.uid}/`).subscribe(obj=> {
          this.fbRouteCompletions.next(obj);
        });
      }
    });


    this.routes = this.fbRoutes.combineLatest(this.fbRouteCompletions, (fbRoutes, fbCompletions) => {
      const finalRoutes: Route[] = [];
      fbRoutes.forEach(routeJson => {
        const myRoute: Route = Route.fromJSON(routeJson);
        myRoute.hasCompleted = fbCompletions[routeJson.$key] || false;
        finalRoutes.push(myRoute);
      })
      return finalRoutes;
    });


  }

  addRoute(route: Route) {
    return this.fbRoutes.push(Route.toJSON(route));
  }

  markRouteAsCompletedByUser(userId: string, routeId: string){
    this.db.object(`/routeCompletions/${userId}/${routeId}`).set(true);
  }

  ngOnInit() {

  }

}
