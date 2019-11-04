export default class RFIModel {
  private readonly _id: string;
  private readonly _urlToGETS: string;

  constructor(id: string, getsUrl: string) {
    this._id = id;
    this._urlToGETS = getsUrl;
  }

  get id(): string {
    return this._id;
  }

  get urlToGETS(): string {
    return this._urlToGETS;
  }
}
