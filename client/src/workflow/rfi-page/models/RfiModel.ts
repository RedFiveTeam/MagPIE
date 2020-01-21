import { Moment } from 'moment';

export enum RfiStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export default class RfiModel {
  constructor(
    public rfiNum: string,
    public getsUrl: string,
    public status: RfiStatus = RfiStatus.PENDING,
    public customer: string,
    public ltiov: Moment | undefined,
    public country: string,
    public description: string,
    public priority: number,
    public exploitStart?: Moment | null,
    public exploitEnd?: Moment | null
  ) {
    if (!exploitStart) {
      this.exploitStart = null;
    }
    if (!exploitEnd) {
      this.exploitEnd = null;
    }
  }
}
