import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/combineLatest';
// import 'rxjs/add/operator/forEach';



import { Climb } from './climb';
import { UserService } from './user.service';

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
  // public fbClimbCompletions: FirebaseObjectObservable<any>;

  public fbClimbCompletions: BehaviorSubject<any> =
    new BehaviorSubject<any>({});


  public completions: Observable<any[]>;
  private _completions: BehaviorSubject<any[]> =    new BehaviorSubject<any[]>([]);


  constructor(
    private db: AngularFireDatabase,
    public userService: UserService,
  ) {


    // the map here apply to one object which is a list
    this.fbClimbs = db.list('/climbs', {
      query: {
        orderByChild: 'level',
      }
    });

    // This is updated in the combineLatest
    // this.climbs = this.fbClimbs.map(Climb.fromJsonList);

    // FIXME: cant just hardcode the user name
    // this.fbClimbCompletions = db.object(`/climbCompletions/noone/`);
    // this.fbClimbCompletions = db.object(`/climbCompletions/1wfIVwiRErQdiJSe1gcH5oHHz0p2/`);

    //  public fbClimbCompletions: FirebaseObjectObservable<any>;
    // this.userService.user.subscribe(currentUser => {
    //   // debugger;
    //   if (currentUser!==null) {
    //   console.log(currentUser);
    //     this.fbClimbCompletions = db.object(`/climbCompletions/${currentUser.uid}/`);
    //   }
    // });
    this.userService.user.subscribe(currentUser => {
      // debugger;
      if (currentUser!==null) {
      console.log(currentUser);
        db.object(`/climbCompletions/${currentUser.uid}/`).subscribe(obj=> {
          this.fbClimbCompletions.next(obj);
        });
      }
    });

    // It seems like fbClimbCompletions is only filed once, i really should be using a behavior here
    // so that it can be fired more than once.
    this.climbs = this.fbClimbs.combineLatest(this.fbClimbCompletions, (fbClimbs, fbCompletions) => {
      const finalClimbs: Climb[] = [];
      fbClimbs.forEach(climbJson => {
        const myClimb: Climb = Climb.fromJSON(climbJson);
        myClimb.hasCompleted = fbCompletions[climbJson.$key] || false;
        finalClimbs.push(myClimb);
      })
      debugger;
      return finalClimbs;
    });

    // this.fbClimbCompletions.subscribe(completionList => {
    //   this._completions.next(completionList);
    // })
    // this.completions.subscribe(console.log);
    // this.completions = Observable.combineLatest(
    //   this.climbs,
    //   this.fbClimbCompletions
    // ).map(
    //   ([
    //     climbs, completions
    //   ]) => {
    //     debugger;
    //     return climbs;
    //   }
    // )
    //
    // this.completions.subscribe(() => {
    //
    //   debugger;
    // })



  }

  addClimb(climb: Climb) {
    return this.fbClimbs.push(Climb.toJSON(climb));
  }

  markClimbAsCompletedByUser(userId: string, climbId: string){
    this.db.object(`/climbCompletions/${userId}/${climbId}`).set(true);
  }

  ngOnInit() {

  }

}
