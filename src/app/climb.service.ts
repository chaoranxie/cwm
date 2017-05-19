import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Climb } from './climb';

@Injectable()
export class ClimbService implements OnInit {
  // private _climbs: BehaviorSubject<Climb[]> = new BehaviorSubject<Climb[]>([]);
  // public climbs: Observable<Climb[]> = this._climbs.asObservable();
  // constructor(db: AngularFireDatabase) {
  //   // What i am trying to do here, is everytime angularfire dectect a change
  //   // it should update the BehaviorSubject
  //   // http://stackoverflow.com/questions/39494058/angular-2-behavior-subject-vs-observable
  //   db.list('/climbs').subscribe(
  //     climbsList => {
  //         // the map here apply to one object which is a Climb
  //         const climbs = climbsList.map(Climb.fromJSON);
  //         this._climbs.next(climbs);
  //       }
  //   );
  //
  //   db.list('/climbs').subscribe(this._climbs)
  // }

  private fbClimbs: FirebaseListObservable<any>;
  public climbs: Observable<Climb[]>;
  constructor(db: AngularFireDatabase) {
    // the map here apply to one object which is a list
    this.fbClimbs = db.list('/climbs', {
      query: {
        orderByChild: 'level',
      }
    });
    this.climbs = this.fbClimbs.map(Climb.fromJsonList);
    // debugger
  }

  addClimb(climb: Climb) {
    return this.fbClimbs.push(Climb.toJSON(climb));
  }

  ngOnInit() {

  }

}
