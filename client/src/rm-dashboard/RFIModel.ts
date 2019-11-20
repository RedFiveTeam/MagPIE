export default class RFIModel {

  private readonly _id: string;
  private readonly _getsUrl: string;
  private readonly _status: string;
  private readonly _lastUpdate: number;
  private readonly _unit: string;
  private readonly _ltiov: number;
  private readonly _country: string;

  constructor(id: string, getsUrl: string, status: string, lastUpdate: number, unit: string, ltiov: number,
              country: string) {
    this._id = id;
    this._getsUrl = getsUrl;
    this._status = status;
    this._lastUpdate = lastUpdate;
    this._unit = unit;
    this._ltiov = ltiov;
    this._country = country;
  }

  get ltiov(): number {
    return this._ltiov;
  }

  get id(): string {
    return this._id;
  }

  get getsUrl(): string {
    return this._getsUrl;
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

  get country(): string {
    return this._country;
  }

}
