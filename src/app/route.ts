interface RouteJSON {
  $key: string;
  station: number;
  color: string;
  grade: number;
  setter: string;
  setDate: Date;
  type: string;
  additionalInfo: string;
  hasCompleted?: boolean
}

export class Route {

  static fromJsonList(routes: any[]): Route[] {
    return routes.map(Route.fromJSON);
  }

  static toJSON(route: Route): any {
    return {
      grade: route.grade,
      color: route.color,
      station: route.station,
      setter: route.setter,
      setDate: route.setDate.toJSON(),
      type: route.type,
    }
  }

  static fromJSON(json: RouteJSON): Route {
    debugger;
    // Note this is different from new Route()
    // in this case the constructor is actuall not run
    // test: Route=new Route(...{station:1});
    const route = Object.create(Route.prototype);
    return Object.assign(route, json, {
      key: json.$key ? json.$key : null,
      hasCompleted: json.hasCompleted ? json.hasCompleted : false,
      setDate: new Date(json.setDate),
    });
  }

  constructor(
    public station: number,
    public color: string,
    public grade: number,
    public setter: string,
    public setDate: Date,
    public type: string,
    public additionalInfo: string,
    public key?: string,
    public hasCompleted?: boolean,
  ) {
    this.hasCompleted = hasCompleted || false;
  }
}
