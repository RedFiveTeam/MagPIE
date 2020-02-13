
import { MetricsActionTypes, MetricState } from './Types';
import { Reducer } from 'redux';

const initState: MetricState = {
  siteVisits: 0,
  refreshClicks: 0,
  GetsClicks: 0,
  siteVisitsGraphWeek: [] as number[]
};

const reducer: Reducer<MetricState> = (state = initState, action: any) => {
  switch (action.type) {
    case MetricsActionTypes.FETCH_SITE_VISITS_SUCCESS:
      return {...state, siteVisits: action.body};
    case MetricsActionTypes.FETCH_REFRESH_CLICKS_SUCCESS:
      return {...state, refreshClicks: action.body};
    case MetricsActionTypes.FETCH_GETS_CLICKS_SUCCESS:
      return {...state, GetsClicks: action.body};
    case MetricsActionTypes.FETCH_SITE_VISITS_GRAPH_WEEK_SUCCESS:
      return {...state, siteVisitsGraphWeek: action.body};
    default:
      return {...state}
  }
};

export { reducer as metricsReducer };
export { initState as metricsInitState };