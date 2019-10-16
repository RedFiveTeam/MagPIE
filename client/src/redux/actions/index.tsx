import { ActionTypes } from './ActionTypes';

export * from './FactActions';

export const pendingFetch = () => ({
  type: ActionTypes.FETCH_PENDING,
});


export const getRfi = (data: any) => ({
  type: ActionTypes.FETCH_RFI_SUCCESS,
  data
});

export const fetchGETSRfi = () => {
  return (dispatch: any) => {
    dispatch(pendingFetch());
    fetch('/api/rfi')
      .then(res => res.text()
      )
      .then(data => {
        return dispatch(getRfi(data));
      })
  }
};
export const getMap = (data: any) => ({
  type: ActionTypes.FETCH_MAP_SUCCESS,
  data
});

export const fetchHiperStare = () => {
  return (dispatch: any) => {
    dispatch(pendingFetch());
    fetch('/api/map')
      .then(res => res.text()
      )
      .then(data => {
        return dispatch(getMap(data));
      })
  }
};


