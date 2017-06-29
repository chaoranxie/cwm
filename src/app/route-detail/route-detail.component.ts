import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription} from 'rxjs/Rx';
import { AppStore } from '../store/app-store';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/filter';

import { Route } from '../model';

//
// Show detail information about Route
// Show all the comments on this route
// Allow people to add additional comments
@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {

  routeSub: Subscription;
  id: string;
  route: Route;
  public routes;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppStore>,
  ) { }

  ngOnInit() {

          // Once you have the id,
          // Check local store and if exists return it

          // If not,
            // make call to get the data which will save it in store.
            // then, use the store
    this.routes = this.store.select('routes');

    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      // this.attending = this.people.map(p => p.filter(person => person.attending));

      this.routes.map(r => r.filter(route => route.$key===this.id)).subscribe(result => {
        this.route= result[0];
      })
      // this.store.select('routes').filter(route => route.$key===this.id).subscribe(routes => {
      //   debugger;
      // });
      // })

// .filter(route => route.$key==='-KkreHSpGzs4cec4lojf')
      //   }).take(1).subscribe(routes => {
      //   debugger;
      //   this.route=routes[0];
      // });

    } );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  hasCompleted(routeKey: string): boolean {
    return false;
  }
}
