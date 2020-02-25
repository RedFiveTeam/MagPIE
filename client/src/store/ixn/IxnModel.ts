import { Moment } from 'moment';

export default class IxnModel {
  constructor(
    public id: number | null,
    public rfiId: number,
    public exploitDateId: number,
    public targetId: number,
    public segmentId: number,
    public exploitAnalyst: string,
    public time: Moment,
    public activity: string,
    public track: string
  ) {
  }
}