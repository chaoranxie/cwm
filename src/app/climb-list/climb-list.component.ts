import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ClimbService } from '../climb.service';
import { Climb } from '../climb';


@Component({
  selector: 'app-climb-list',
  templateUrl: './climb-list.component.html',
})
export class ClimbListComponent implements OnInit {
  public climbs: Observable<Climb[]>;

  constructor(
    private climbService: ClimbService,
  ) {
    this.climbs = climbService.climbs;
  }

  ngOnInit() {
  }
}
