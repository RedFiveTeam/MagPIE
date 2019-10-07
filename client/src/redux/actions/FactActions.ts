import { ActionTypes } from './ActionTypes';
import { pendingFetch } from './index';

export const getFact = (data: string) => ({
  type: ActionTypes.FETCH_FACT_SUCCESS,
  data
});

export const fetchFact = () => {
  return (dispatch: any) => {
    dispatch(pendingFetch());
    fetch('/api/fact')
      .then(res => res.text()
      )
      .then(data => {
        return dispatch(getFact(data));
      })
  }
};
