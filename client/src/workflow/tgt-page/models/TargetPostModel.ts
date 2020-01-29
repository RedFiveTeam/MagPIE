export class TargetPostModel {
  constructor(
    public rfiNum: string,
    public exploitDate: Date,
    public name: string,
    public mgrs: string,
    public notes: string | null,
    public description: string | null
  ){}
}