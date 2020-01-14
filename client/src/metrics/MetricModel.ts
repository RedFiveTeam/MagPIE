export default class MetricModel {
  private readonly _siteVisits: string;
  private readonly _GetsButtonClicks: string;

  constructor(siteVisits: string, GETSButtonClicks: string) {
    this._siteVisits = siteVisits;
    this._GetsButtonClicks = GETSButtonClicks;
  }

  get siteVisits(): string {
    return this._siteVisits;
  }

  get GetsClicks(): string {
    return this._GetsButtonClicks;
  }

}
