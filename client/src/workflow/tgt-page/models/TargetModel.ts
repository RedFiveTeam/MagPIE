export class TargetModel {
  constructor(
    public rfiNum: string,
    public exploitDateId: number,
    public name: string,
    public mgrs: string,
    public notes: string | null,
    public description: string | null
  ){}
}