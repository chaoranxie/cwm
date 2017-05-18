import { Component, Input, OnInit } from '@angular/core';
import { Climb } from '../climb';

@Component({
  selector: 'app-climb',
  templateUrl: './climb.component.html',
})
export class ClimbComponent implements OnInit {
  @Input() climb: Climb;
  constructor() { }

  ngOnInit() {
  }

}
