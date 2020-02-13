export class TargetModel {
  constructor(
    public id: number,
    public rfiId: number,
    public exploitDateId: number,
    public name: string,
    public mgrs: string,
    public notes: string | null,
    public description: string | null){}
}
