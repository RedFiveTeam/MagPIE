export default class MetricModel {
  private readonly _siteVisits: string;
  private readonly _GETSButtonClicks: string;


  constructor(siteVisits: string, GETSButtonClicks: string) {
    this._siteVisits = siteVisits;
    this._GETSButtonClicks = GETSButtonClicks;
  }

  get siteVisits(): string {
    return this._siteVisits;
  }

  get GETSClicks(): string {
    return this._GETSButtonClicks;
  }

}
