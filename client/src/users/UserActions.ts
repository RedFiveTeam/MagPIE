export const postSiteVisit = () => {
  return (dispatch: any) => {
    return fetch('/api/site-visit',
      {
        method: 'post'
      }
    );
  }
};
