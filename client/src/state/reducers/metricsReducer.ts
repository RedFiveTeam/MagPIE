import { ActionTypes } from '../actions/ActionTypes';

const initState = {
  siteVisits: 0,
  refreshClicks: 0,
  GetsClicks: 0,
  siteVisitsGraphWeek: [] as number[]
};

const metricsReducer = (state = initState, action: any) => {
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

export default metricsReducer;