import { Moment } from 'moment';

export enum RFIStatus {
  PENDING='PENDING',
  OPEN='OPEN',
  CLOSED='CLOSED'
}

export default class RFIModel {
  private readonly _id: string;
  private readonly _getsUrl: string;
  private readonly _status: RFIStatus;
  private readonly _customer: string;
  private readonly _ltiov: Moment | undefined;
  private readonly _country: string;

  constructor(
    id: string,
    getsUrl: string,
    status: RFIStatus = RFIStatus.PENDING,
    customer: string,
    ltiov: Moment | undefined,
    country: string
  ) {
    this._id = id;
    this._getsUrl = getsUrl;
    this._status = status;
    this._customer = customer;
    this._ltiov = ltiov;
    this._country = country;
  }

  get ltiov(): Moment | undefined {
    return this._ltiov;
  }

  get id(): string {
    return this._id;
  }

  get getsUrl(): string {
    return this._getsUrl;
  }

  get status(): RFIStatus {
    return this._status;
  }

  get customer(): string {
    return this._customer;
  }

  get country(): string {
    return this._country;
  }
}
