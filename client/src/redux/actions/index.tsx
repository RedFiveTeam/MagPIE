import { ActionTypes } from './ActionTypes';

export * from './FactActions';

export const pendingFetch = () => ({
  type: ActionTypes.FETCH_PENDING,
});

export const pendingRfi = () => ({
  type: ActionTypes.FETCH_RFI_PENDING,
});

export const updateApiString = (data: any) => ({
  type: ActionTypes.UPDATE_API,
    data
});

export const updateApi = (e: any) => {
  return (dispatch: any) => {
    dispatch(updateApiString(e));
  }
};


export const getRfi = (data: any) => ({
  type: ActionTypes.FETCH_RFI_SUCCESS,
  data
});

export const fetchGETSRfi = () => {
  return (dispatch: any) => {
    dispatch(pendingFetch());
    fetch('/api/gets/rfis')
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




