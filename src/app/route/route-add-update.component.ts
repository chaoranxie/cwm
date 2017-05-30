import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Route } from '../model/route';
import { RouteService } from '../services/route.service';
import { Router } from '@angular/router';



function routeFormValidator(fg: FormGroup): {[key: string]: boolean} {
  debugger;
  return null;
}


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

  grades = [
    {value: 4, viewValue: '5.4'},
    {value: 5, viewValue: '5.5'},
    {value: 6, viewValue: '5.6'},
    {value: 7, viewValue: '5.7'},
    {value: 8, viewValue: '5.8'},
    {value: 9, viewValue: '5.9'},
    {value: 10, viewValue: '5.10'},
    {value: 11, viewValue: '5.11'},
    {value: 12, viewValue: '5.12'},
    {value: 13, viewValue: '5.13'},
    {value: 14, viewValue: '5.14'},
    {value: 15, viewValue: '5.15'},
    {value: 16, viewValue: '5.16'}
  ];

  colors = [
    {value: 'black', viewValue: 'Black'},
    {value: 'blue', viewValue: 'Blue'},
    {value: 'green', viewValue: 'Green'},
    {value: 'orange', viewValue: 'Orange'},
    {value: 'purple', viewValue: 'Purple'},
    {value: 'red', viewValue: 'Red'},
    {value: 'white', viewValue: 'White'},
    {value: 'yellow', viewValue: 'Yellow'},
    {value: 'other', viewValue: 'Other'}
  ];

  types = [
    {value: 'top_rope', viewValue: 'Top Rope Only'},
    {value: 'lead', viewValue: 'Lead Climb Only'},
    {value: 'both', viewValue: 'Both'},
  ];

  setters = [
    'ek',
    'jw',
    'ks',
    'ly',
    'ps',
    'rw',
    'sm',
    'tex',
    'zgy',
    'other',
  ];

  routeForm: FormGroup;
  route: Route;




  constructor(private fb: FormBuilder,
              private router: Router,

              private routeService: RouteService) { }

  ngOnInit() {
    this.route = new Route(25, null, null, null, null,null,null);
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
  });
  // }, {validator: routeFormValidator});
}

onSubmit() {
    //validations

    // debugger;
    if (this.routeForm.invalid)
      return;

    let route: Route = this.getRouteFromFormValue(this.routeForm.value);
    this.saveRoute(route);
  }

  getRouteFromFormValue(formValue: any): Route {
    debugger;
    let route: Route;
    route = new Route(
      Number(formValue.station),
      formValue.color,
      // null,
      Number(formValue.grade),
      // null,
      // null,
      // null,
      formValue.setter,
      new Date(formValue.setDate),
      formValue.type,
      '');

    return route;
  }

  saveRoute(route: Route) {
    this.routeService.addRoute(route).then(response => {
      debugger;
      this.router.navigate(['/route/list']);
    });
  }


}
