import { ActionTypes } from '../redux/actions/ActionTypes';

const fetchSiteVisitsSuccess = (body: any) => {
  return {
    type: ActionTypes.FETCH_SITE_VISITS_SUCCESS,
    body
  }
};

const fetchGetsClicksSuccess = (body: any) => {
  return {
    type: ActionTypes.FETCH_GETS_CLICKS_SUCCESS,
    body
  }
};

const fetchRefreshClicksSuccess = (body: any) => {
  return {
    type: ActionTypes.FETCH_REFRESH_CLICKS_SUCCESS,
    body
  }
};

const fetchSiteVisitsGraphWeekSuccess = (body: any) => {
  return {
    type: ActionTypes.FETCH_SITE_VISITS_GRAPH_WEEK_SUCCESS,
    body
  }
};


export const fetchSiteVisitMetrics = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/site-visits')
      .then(response => response.text())
      .then(body => dispatch(fetchSiteVisitsSuccess(body)));
  }
};

export const fetchGetsClicksMetrics = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/gets-clicks')
      .then(response => response.text())
      .then(body => dispatch(fetchGetsClicksSuccess(body)));
  }
};

export const fetchSiteVisitsGraphWeek = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/site-visits-week')
      .then(response => response.json())
      .then(body => dispatch(fetchSiteVisitsGraphWeekSuccess(body)));
  }
};

export const fetchRefreshClicksMetrics = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/refresh-clicks')
      .then(response => response.text())
      .then(body => dispatch(fetchRefreshClicksSuccess(body)));
  }
};