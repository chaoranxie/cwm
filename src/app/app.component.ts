import { Component } from '@angular/core';
import { ClimbService } from './climb.service';
import { UserService } from './user.service';

import { Climb } from './climb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(
    private climbService: ClimbService,
    private userService: UserService,

  ) {
  }

  isLoggedIn(): boolean{
    debugger;
    return this.userService.afAuth.auth.currentUser !== null;
  }

  addClimb() {
    this.climbService.addClimb();
  }

  loginGoogle() {
    this.userService.loginGoogle()
  }

  logout() {
    this.userService.logout()
  }

}
