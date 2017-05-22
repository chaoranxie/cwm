import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ClimbService } from '../climb.service';
import { UserService } from '../user.service';


import { Climb } from '../climb';


@Component({
  selector: 'app-climb-list',
  templateUrl: './climb-list.component.html',
})
export class ClimbListComponent implements OnInit {
  public climbs: Observable<Climb[]>;

  constructor(
    private climbService: ClimbService,
    public userService: UserService,
  ) {
    this.climbs = climbService.climbs;
  }

  markClimbAsCompleted(message: string){
    this.climbService.markClimbAsCompletedByUser(this.userService.afAuth.auth.currentUser.uid, message)
  }

  ngOnInit() {
  }
}
