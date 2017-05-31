import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { OnInit, OnChanges, OnDestroy } from '@angular/core';

import { Route } from '../model/route';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteComponent implements OnInit, OnChanges, OnDestroy {
  @Input() route: Route;

  @Output() selectedRoute: EventEmitter<Route>;

  constructor() {
    this.selectedRoute = new EventEmitter<Route>();
  }

  ngOnInit() {
    console.log('Route ngOnInit')
  }

  ngOnDestroy() {
    console.log('Route ngOnDestroy')
  }

  ngOnChanges() {
    console.log('Route ngOnChanges')
  }

  selectRoute(route: Route) {
    this.selectedRoute.emit(route)
  }

}
