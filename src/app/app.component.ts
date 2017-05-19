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
    public userService: UserService,
  ) {
  }

  isLoggedIn(): boolean {
    // Fixme: This is not good, there should be a better way
    // this.userService.user | async

    return this.userService.afAuth.auth.currentUser !== null;
  }

  addClimb() {
    const climb: Climb = new Climb (76, 'red', 5.9, 'setter', new Date(), 'no note entered')
    this.climbService.addClimb(climb);
  }

  loginGoogle() {
    this.userService.loginGoogle()
  }

  logout() {
    this.userService.logout()
  }

}
