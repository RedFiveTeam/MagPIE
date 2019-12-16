import GETSClickRequestModel from '../metrics/Model/GETSClickRequestModel';
import SortClickRequestModel from '../metrics/Model/SortClickRequestModel';
import RfiFetchRequestModel from '../metrics/Model/RfiFetchRequestModel';

export const postSiteVisit = () => {
  return () => {
    return fetch('/api/metrics/site-visit',
      {
        method: 'post'
      }
    );
  }
};

export const postGETSClick = (getsClickRequestModel: GETSClickRequestModel) => {
    return fetch(
      '/api/metrics/gets-click',
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
    '/api/metrics/sort-click',
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
    '/api/metrics/rfi-fetch',
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