import { ActionTypes } from '../actions/ActionTypes';
import { MetricState } from '../actions/metrics/MetricsActionTypes';
import { Reducer } from 'redux';

const initState: MetricState = {
  siteVisits: 0,
  refreshClicks: 0,
  GetsClicks: 0,
  siteVisitsGraphWeek: [] as number[]
};

const reducer: Reducer<MetricState> = (state = initState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_SITE_VISITS_SUCCESS:
      return {...state, siteVisits: action.body};
    case ActionTypes.FETCH_REFRESH_CLICKS_SUCCESS:
      return {...state, refreshClicks: action.body};
    case ActionTypes.FETCH_GETS_CLICKS_SUCCESS:
      return {...state, GetsClicks: action.body};
    case ActionTypes.FETCH_SITE_VISITS_GRAPH_WEEK_SUCCESS:
      return {...state, siteVisitsGraphWeek: action.body};
    default:
      return {...state}
  }
};

export { reducer as metricsReducer };
