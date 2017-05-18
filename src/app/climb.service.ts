import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Climb } from './climb';


@Injectable()
export class ClimbService {
  // private _climbs: BehaviorSubject<Climb[]> = new BehaviorSubject<Climb[]>([]);
  // public climbs: Observable<Climb[]> = this._climbs.asObservable();
  // constructor(db: AngularFireDatabase) {
  //   // What i am trying to do here, is everytime angularfire dectect a change
  //   // it should update the BehaviorSubject
  //   // http://stackoverflow.com/questions/39494058/angular-2-behavior-subject-vs-observable
  //   db.list('/climbs').subscribe(
  //     climbsList => {
  //         const climbs = climbsList.map(Climb.fromJsonList);
  //         this._climbs.next(climbs);
  //       }
  //   );
  //
  //   db.list('/climbs').subscribe(this._climbs)
  // }

  public climbs: Observable<Climb[]>;
  constructor(db: AngularFireDatabase) {
    this.climbs = db.list('/climbs').map(Climb.fromJsonList);
  }
  ngOnInit() {

  }

}
