import { ActionTypes } from '../redux/actions/ActionTypes';

const fetchMetricsSuccess = (body: any) => {
  return {
    type: ActionTypes.FETCH_METRICS_SUCCESS,
    body
  }
};

export const fetchMetrics = () => {
  return (dispatch: any) => {
    return fetch('/api/site-visit')
      .then(response => response.text())
      .then(body => dispatch(fetchMetricsSuccess(body)));
  }
};
