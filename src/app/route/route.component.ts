
import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Route } from '../route';
import { OnDestroy, OnChanges } from '@angular/core';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
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
