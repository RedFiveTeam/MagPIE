export default class RfiFeedbackModel {
  public rfiNum: string;
  public stars: number;

  constructor(rfiNum: string, stars: number) {
    this.rfiNum = rfiNum;
    this.stars = stars;
  }
}
