interface ClimbJSON {
  setter: string;
  color: string;
  level: number;
  station: number;
  note: string;
  setDate: Date;
}

export class Climb {

  static fromJsonList(climbs: any[]): Climb[] {
    console.log(`Inside Climb.fromJsonList, total of ${climbs.length}`)
    return climbs.map(Climb.fromJSON);
  }

  static fromJSON(json: ClimbJSON): Climb {
    let climb = Object.create(Climb.prototype);
    return Object.assign(climb, json, {
      note: json.note ? json.note : "No note"
    });
  }

  constructor(
    setter: string,
    color: string,
    level: number,
    station: number
  ) {}
}
