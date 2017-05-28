
import { Component, Input, OnInit, OnChanges, EventEmitter, Output, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Route } from '../route';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteComponent implements OnInit, OnChanges {
  @Input() route: Route;

  @Output() selectedRoute: EventEmitter<string>;

  constructor() {
    this.selectedRoute = new EventEmitter<string>();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  ngOnInit() {
    console.log('route component init');
  }

  // ngOnChanges() {
  //   console.log('route onChanges fired');
  // }

  selectRoute(route: Route) {
    this.selectedRoute.emit(route.key)
  }

}
