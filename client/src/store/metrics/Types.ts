export enum MetricsActionTypes {
  FETCH_SITE_VISITS_SUCCESS = '@@metrics/FETCH_SITE_VISITS_SUCCESS',
  FETCH_GETS_CLICKS_SUCCESS = '@@metrics/FETCH_GETS_CLICKS_SUCCESS',
  FETCH_REFRESH_CLICKS_SUCCESS = '@@metrics/FETCH_REFRESH_CLICKS_SUCCESS',
  FETCH_SITE_VISITS_GRAPH_WEEK_SUCCESS = '@@metrics/FETCH_SITE_VISITS_GRAPH_WEEK_SUCCESS'
}


export interface MetricState {
  readonly siteVisits: number;
  readonly refreshClicks: number;
  readonly GetsClicks: number;
  readonly siteVisitsGraphWeek: number[];
}
