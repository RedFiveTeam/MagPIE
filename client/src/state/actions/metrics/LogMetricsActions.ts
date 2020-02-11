import GetsClickRequestModel from '../../../metrics/models/GetsClickRequestModel';
import SortClickRequestModel from '../../../metrics/models/SortClickRequestModel';
import RfiFetchRequestModel from '../../../metrics/models/RfiFetchRequestModel';
import { server } from '../../../config';

export const postSiteVisit = () => {
  return () => {
    return fetch(
      server + '/api/metrics/site-visit',
      {
        method: 'post'
      }
    ).catch((reason => {console.log("Failed to post sort click metric: " + reason)}));
  }
};

export const postGetsClick = (getsClickRequestModel: GetsClickRequestModel) => {
  return () => {
    return fetch(
      server + '/api/metrics/gets-click',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getsClickRequestModel),
      }
    ).catch((reason => {console.log("Failed to post GETS click metric: " + reason)}));
  }
};

export const postSortClick = (sortClickRequestModel: SortClickRequestModel) => {
  return () => {
    return fetch(
      server + '/api/metrics/sort-click',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sortClickRequestModel),
      }
    ).catch((reason => {console.log("Failed to post sort click metric: " + reason)}));
  }
};

export const postRfiFetchTimeMetric = (rfiFetchRequestModel: RfiFetchRequestModel) => {

  return () => {
    return fetch(
      server + '/api/metrics/rfi-fetch',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rfiFetchRequestModel),
      }
    ).catch((reason => {console.log("Failed to post RFI fetch time metric: " + reason)}));
  }
};

export const postRefreshClick = () => {
  return () => {
    return fetch(
      server + '/api/metrics/refresh-click',
      {
        method: 'post'
      }
    ).catch((reason => {console.log("Failed to post refresh click metric: " + reason)}));
  }
};
