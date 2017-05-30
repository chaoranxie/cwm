import { Component } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { UserService } from '../../services/user.service';
import { Angulartics2 } from 'angulartics2';

import { Location } from '@angular/common';

import { Route } from '../../model/route';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public angulartics2: Angulartics2,
    private routeService: RouteService,
    public userService: UserService,
  ) {
    this.angulartics2.eventTrack.next({ action: 'myAction', properties: { category: 'myCategory' }});

  }


  loginGoogle() {
    this.userService.loginGoogle()
  }

  logout() {
    this.userService.logout()
  }

}
