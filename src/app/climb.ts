interface ClimbJSON {
  $key: string;
  station: number;
  color: string;
  level: number;
  setter: string;
  setDate: Date;
  note: string;
}

export class Climb {

  static fromJsonList(climbs: any[]): Climb[] {
    console.log(`Inside Climb.fromJsonList, total of ${climbs.length}`);
    return climbs.map(Climb.fromJSON);
  }

  static toJSON(climb: Climb): any {
    return {
      station: climb.station,
      color: climb.color,
      level: climb.level,
      setter: climb.setter,
      setDate: climb.setDate,
      note: climb.note,
    }
  }

  static fromJSON(json: ClimbJSON): Climb {
    const climb = Object.create(Climb.prototype);
    return Object.assign(climb, json, {
      note: json.note ? json.note : 'No note',
      key: json.$key ? json.$key : null
    });
  }

  constructor(
    public station: number,
    public color: string,
    public level: number,
    public setter: string,
    public setDate: Date,
    public note: string,
    public key?: string,
  ) {}
}
