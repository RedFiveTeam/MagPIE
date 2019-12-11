import { Moment } from 'moment';

export enum RFIStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export default class RFIModel {
  constructor(
    public id: string,
    public getsUrl: string,
    public status: RFIStatus = RFIStatus.PENDING,
    public customer: string,
    public ltiov: Moment | undefined,
    public country: string,
    public description: string,
    public priority: number) {
  }
}
