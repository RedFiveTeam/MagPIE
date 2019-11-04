import { ActionTypes } from '../redux/actions/ActionTypes';

const fetchRFISuccess = (body: any) => {
  return {
    type: ActionTypes.FETCH_RFI_SUCCESS,
    body
  }
};

export const fetchRFIs = () => {
  return (dispatch: any) => {
    return fetch('/api/rfis')
      .then(response => response.json())
      .then(body => dispatch(fetchRFISuccess(body)));
  }
};
