import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Route } from '../model/route';
import { AppStore } from '../store/app-store';
import { RouteActions } from '../store/actions';

import { colors, setters, types, grades } from './route.options';

@Component({
  selector: 'app-route-add-update',
  templateUrl: './route-add-update.component.html',
  styleUrls: ['./route-add-update.component.css']
})
export class RouteAddUpdateComponent implements OnInit {

  grade: number;
  setter: string;
  setDate: string;
  color: string;
  type: string;
  routeForm: FormGroup;
  route: Route;
  colors: any[] = colors;
  grades: any[] = grades;
  setters: any[] = setters;
  types: any[] = types;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppStore>,
    private routeActions: RouteActions,
  ) { }

  ngOnInit() {
    this.route = new Route();
    // this.route.station = 1;
    // this.route.grade = 4;
    // this.route.color ='blue';
    // this.route.setter = 'other';
    // this.route.type = 'both';
    this.createForm(this.route);
  }

  createForm(route: Route) {
    this.routeForm = this.fb.group({
      station: [route.station, Validators.required],
      color: [route.color, Validators.required],
      grade: [route.grade, Validators.required],
      setter: [route.setter, Validators.required],
      setDate: [route.setDate, Validators.required],
      type: [route.type, Validators.required],
    }, { validator: this.routeFormValidator });
  }

  routeFormValidator(fg: FormGroup): { [key: string]: boolean } {
    return null;
  }

  onSubmit() {
    if (this.routeForm.invalid) {
      return;
    }
    const route: Route = this.getRouteFromFormValue(this.routeForm.value);
    this.saveRoute(route);
  }

  getRouteFromFormValue(formValue: any): Route {
    const route: Route = new Route()
    route.station = Number(formValue.station);
    route.setter = formValue.setter;
    route.color = formValue.color;
    route.grade = Number(formValue.grade)
    route.type = formValue.type;
    route.setDate = formValue.setDate.toJSON();
    return route;
  }

  saveRoute(route: Route) {
    this.store.dispatch(this.routeActions.addRoute(route));
    this.router.navigate(['/route/list']);
  }

}
