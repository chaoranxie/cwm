import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {

  routeSub: Subscription;
  id: string;


  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // debugger;
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    } );
  }



}
