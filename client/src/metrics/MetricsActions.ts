import { ActionTypes } from '../redux/actions/ActionTypes';

const fetchSiteVisitsSuccess = (body: any) => {
  return {
    type: ActionTypes.FETCH_SITE_VISITS_SUCCESS,
    body
  }
};

const fetchGETSClicksSuccess = (body: any) => {
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


export const fetchSiteVisitMetrics = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/site-visits')
      .then(response => response.text())
      .then(body => dispatch(fetchSiteVisitsSuccess(body)));
  }
};

export const fetchGETSClicksMetrics = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/gets-clicks')
      .then(response => response.text())
      .then(body => dispatch(fetchGETSClicksSuccess(body)));
  }
};

export const fetchRefreshClicksMetrics = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/refresh-clicks')
      .then(response => response.text())
      .then(body => dispatch(fetchRefreshClicksSuccess(body)));
  }
}