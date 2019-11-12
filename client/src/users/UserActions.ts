import GETSClickRequestModel from '../metrics/Model/GETSClickRequestModel';

export const postSiteVisit = () => {
  return (dispatch: any) => {
    return fetch('/api/metrics/site-visit',
      {
        method: 'post'
      }
    );
  }
};

export const postGETSClick = (getsClickRequestModel: GETSClickRequestModel) => {
  console.log(getsClickRequestModel);
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
