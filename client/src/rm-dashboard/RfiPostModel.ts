export default class RfiPostModel {
    public rfiId: string;
    public priority: number;


  constructor(rfiId: string, priority: number) {
    this.rfiId = rfiId;
    this.priority = priority;

  }
}