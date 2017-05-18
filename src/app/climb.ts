interface ClimbJSON {
  setter: string;
  color: string;
  level: number;
  station: number;
  note: string;
}

export class Climb {

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
