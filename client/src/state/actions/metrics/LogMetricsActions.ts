import GetsClickRequestModel from '../../../metrics/models/GetsClickRequestModel';
import SortClickRequestModel from '../../../metrics/models/SortClickRequestModel';
import RfiFetchRequestModel from '../../../metrics/models/RfiFetchRequestModel';
import { server } from '../../../config';

export const postSiteVisit = () => {
      return fetch(server + '/api/metrics/site-visit',
      {
        method: 'post'
      }
    );
};

export const postGetsClick = (getsClickRequestModel: GetsClickRequestModel) => {
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
    )
};

export const postSortClick = (sortClickRequestModel: SortClickRequestModel) => {
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
  )
};

export const postRfiFetchTimeMetric = (rfiFetchRequestModel: RfiFetchRequestModel) => {
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
  )
};

export const postRefreshClick = () => {
  return () => {
    return fetch(
      server + '/api/metrics/refresh-click',
      {
        method: 'post'
      }
    );
  }
};
