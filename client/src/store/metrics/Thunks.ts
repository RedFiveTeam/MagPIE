import {
  fetchGetsClicksSuccess,
  fetchRefreshClicksSuccess,
  fetchSiteVisitsGraphWeekSuccess,
  fetchSiteVisitsSuccess
} from './Actions';


export const fetchSiteVisitMetrics = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/site-visits')
      .then(response => response.text())
      .then(body => dispatch(fetchSiteVisitsSuccess(body)))
      .catch((reason => {console.log("Failed to fetch site visits: " + reason)}));
  }
};

export const fetchGetsClicksMetrics = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/gets-clicks')
      .then(response => response.text())
      .then(body => dispatch(fetchGetsClicksSuccess(body)))
      .catch((reason => {console.log("Failed to fetch GETS clicks: " + reason)}));
  }
};

export const fetchSiteVisitsGraphWeek = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/site-visits-week')
      .then(response => response.json())
      .then(body => dispatch(fetchSiteVisitsGraphWeekSuccess(body)))
      .catch((reason => {console.log("Failed to fetch site visit graph: " + reason)}));
  }
};

export const fetchRefreshClicksMetrics = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/refresh-clicks')
      .then(response => response.text())
      .then(body => dispatch(fetchRefreshClicksSuccess(body)))
      .catch((reason => {console.log("Failed to fetch refresh clicks: " + reason)}));
  }
};
