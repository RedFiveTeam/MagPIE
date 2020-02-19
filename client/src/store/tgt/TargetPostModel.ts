import { TargetStatus } from './TargetModel';

export class TargetPostModel {
  constructor(
    public targetId: number | null,
    public rfiId: number,
    public exploitDateId: number,
    public name: string,
    public mgrs: string,
    public notes: string | null,
    public description: string | null,
    public status: TargetStatus = TargetStatus.NOT_STARTED) {
  }
}
