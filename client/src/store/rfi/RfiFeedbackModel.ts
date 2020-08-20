export default class RfiFeedbackModel {
  constructor(
    public rfiNum: string,
    public stars: number,
    public timeliness: string,
    public quality: string,
    public missionImpact: string,
    public comments: string,
  ) {
  }
}
