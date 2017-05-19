import { Component } from '@angular/core';
import { ClimbService } from './climb.service';
import { Climb } from './climb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(
    private climbService: ClimbService,
  ) {
  }

  addClimb() {
    this.climbService.addClimb();
  }

}
