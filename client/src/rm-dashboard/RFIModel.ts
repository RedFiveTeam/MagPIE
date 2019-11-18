export default class RFIModel {
  private readonly _id: string;
  private readonly _urlToGETS: string;
  private readonly _status: string;
  private readonly _lastUpdate: number;
  private readonly _unit: string;

  constructor(id: string, getsUrl: string, status: string, lastUpdate: number, unit: string) {
    this._id = id;
    this._urlToGETS = getsUrl;
    this._status = status;
    this._lastUpdate = lastUpdate;
    this._unit = unit;
  }

  get id(): string {
    return this._id;
  }

  get urlToGETS(): string {
    return this._urlToGETS;
  }

  get status(): string {
    return this._status;
  }

  get lastUpdate(): number {
    return this._lastUpdate;
  }

  get unit(): string {
    return this._unit;
  }
}
