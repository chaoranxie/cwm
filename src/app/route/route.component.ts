
import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Route } from '../route';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteComponent implements OnInit {
  @Input() route: Route;

  @Output() selectedRoute: EventEmitter<string>;

  constructor() {
    this.selectedRoute = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  selectRoute(route: Route) {
    this.selectedRoute.emit(route.key)
  }

}
