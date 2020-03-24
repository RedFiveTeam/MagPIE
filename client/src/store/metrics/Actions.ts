import { MetricsActionTypes } from './Types';
import GetsClickRequestModel from './GetsClickRequestModel';
import SortClickRequestModel from './SortClickRequestModel';
import RfiFetchRequestModel from './RfiFetchRequestModel';

export const fetchSiteVisitsSuccess = (body: any) => {
  return {
    type: MetricsActionTypes.FETCH_SITE_VISITS_SUCCESS,
    body,
  };
};

export const fetchGetsClicksSuccess = (body: any) => {
  return {
    type: MetricsActionTypes.FETCH_GETS_CLICKS_SUCCESS,
    body,
  };
};

export const fetchRefreshClicksSuccess = (body: any) => {
  return {
    type: MetricsActionTypes.FETCH_REFRESH_CLICKS_SUCCESS,
    body,
  };
};

export const fetchSiteVisitsGraphWeekSuccess = (body: any) => {
  return {
    type: MetricsActionTypes.FETCH_SITE_VISITS_GRAPH_WEEK_SUCCESS,
    body,
  };
};

export const postSiteVisit = () => {
  return () => {
    return fetch('/api/metrics/site-visit',
      {
        method: 'post',
      },
    ).catch((reason) => {
      console.log('Failed to post sort click metrics: ' + reason);
    });
  };
};

export const postGetsClick = (getsClickRequestModel: GetsClickRequestModel) => {
  return () => {
    return fetch('/api/metrics/gets-click',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getsClickRequestModel),
      },
    ).catch((reason) => {
      console.log('Failed to post GETS click metrics: ' + reason);
    });
  };
};

export const postSortClick = (sortClickRequestModel: SortClickRequestModel) => {
  fetch('/api/metrics/sort-click',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sortClickRequestModel),
    },
  ).catch((reason) => {
    console.log('Failed to post sort click metrics: ' + reason);
  });
};

export const postRfiFetchTimeMetric = (rfiFetchRequestModel: RfiFetchRequestModel) => {
  fetch('/api/metrics/rfi-fetch',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rfiFetchRequestModel),
    },
  ).catch((reason) => {
    console.log('Failed to post RFI fetch time metrics: ' + reason);
  });
};

export const postRefreshClick = () => {
  return () => {
    return fetch('/api/metrics/refresh-click',
      {
        method: 'post',
      },
    ).catch((reason) => {
      console.log('Failed to post refresh click metrics: ' + reason);
    });
  };
};

export const fetchMetric = (uri: string) => {
  return fetch('/api/metrics/' + uri,
    {
      method: 'get'
    }
  );
};
