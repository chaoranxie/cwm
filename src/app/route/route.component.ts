
import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Route } from '../route';
import { OnDestroy, OnChanges } from '@angular/core';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',

  // It seems like this will only trigger change if the object for the input changed,
  // for example, if i do something like
  // routes[index] = Object.assign(Object.create(Route.prototype), route, {hasCompleted:newValue});
  // but if i just change value like           route.hasCompleted = newValue;
  // the UI will not change (oddly enough it did, WHY? )

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteComponent implements OnInit, OnChanges, OnDestroy {
  @Input() route: Route;

  @Output() selectedRoute: EventEmitter<string>;

  constructor() {
    this.selectedRoute = new EventEmitter<string>();
  }


  ngOnInit() {
    console.log("Route ngOnInit")

  }

  ngOnDestroy(){
    console.log("Route ngOnDestroy")

  }

  ngOnChanges(){
      console.log("Route ngOnChanges")
  }

  selectRoute(route: Route) {
    this.selectedRoute.emit(route.key)
  }

}
