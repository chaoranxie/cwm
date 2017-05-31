import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Route } from '../model/route';
import { RouteService } from '../services/route.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/app-store';
import { RouteActions } from '../store/actions';
import {colors, setters, types, grades} from './route.options';

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
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.route = new Route(null, null, null, null, null, null, null);
    this.createForm(this.route);
  }
  createForm(route: Route) {
    this.routeForm = this.fb.group({
      station: [route.station, Validators.required],
      color: [route.color, Validators.required],
      grade: [route.grade, Validators.required],
      setter: [route.setter, Validators.required],
      setDate: ['', Validators.required],
      type: [route.type, Validators.required],
    }, {validator: this.routeFormValidator});
  }

  routeFormValidator(fg: FormGroup): { [key: string]: boolean } {
    return null;
  }

  onSubmit() {
    if (this.routeForm.invalid)
      return;
    let route: Route = this.getRouteFromFormValue(this.routeForm.value);
    this.saveRoute(route);
  }

  getRouteFromFormValue(formValue: any): Route {
    let route: Route;
    route = new Route(
      Number(formValue.station),
      formValue.color,
      Number(formValue.grade),
      formValue.setter,
      new Date(formValue.setDate),
      formValue.type,
      '');
    return route;
  }

  saveRoute(route: Route) {
    this.store.dispatch(this.routeActions.addRoute(route));
    this.router.navigate(['/route/list']);
  }

}
