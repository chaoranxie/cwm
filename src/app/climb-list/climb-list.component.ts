import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-climb-list',
  templateUrl: './climb-list.component.html',
  styleUrls: ['./climb-list.component.css']
})
export class ClimbListComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;
  queryList: FirebaseListObservable<any[]>;
  colorSubject: Subject<any>;

  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  constructor(db: AngularFireDatabase) {
    this.colorSubject = new Subject();
    this.items = db.list('/items', {
      query: {
        orderByChild: 'color',
        equalTo: this.colorSubject
      }
    });

    // this.item = db.object('/item');
    // this.queryList = db.list('/items', {
    //   query: {
    //     limitToLast: 10,
    //     orderByKey: true
    //   }
    // });

  }
  ngOnInit() {
    // debugger;
    // const myItems = [
    //   {color:'red', station:38, level: 5.4},
    //   {color:'blue', station:37, level: 5.4},
    //   {color:'purple', station:36, level: 5.11},
    //   {color:'green', station:35, level: 5.10}
    // ];
    //
    // myItems.map(item => {
    //   this.items.push(item);
    // })

  }
  filterBy(color: string) {
    this.colorSubject.next(color);
  }
}
