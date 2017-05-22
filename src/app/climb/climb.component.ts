import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Climb } from '../climb';

@Component({
  selector: 'app-climb',
  templateUrl: './climb.component.html',
  styleUrls: ['./climb.component.css']

})
export class ClimbComponent implements OnInit {
  @Input() climb: Climb;

  @Output() selectedClimb: EventEmitter<string>;

  constructor() {
    this.selectedClimb = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  selectClimb(climb: Climb) {
    this.selectedClimb.emit(climb.key)
  }

}
