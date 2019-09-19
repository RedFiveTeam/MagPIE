import { ActionTypes } from './ActionTypes';
import { pendingFetch } from './index';

export const getFact = (data: string) => ({
  type: ActionTypes.FETCH_FACT_SUCCESS,
  data
});

export const fetchActions = () => {
  return (dispatch: any) => {
    dispatch(pendingFetch());
    fetch('http://localhost:8080/fact')
      .then(res => res.text()
      )
      .then(data => {
        return dispatch(getFact(data));
      })
  }
};
