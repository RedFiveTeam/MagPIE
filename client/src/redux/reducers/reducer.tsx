import { ActionTypes } from '../actions/ActionTypes';

const initState = {
  pending: false,
  fact: "",
  error: null
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_PENDING:
      return {
        ...state,
        pending: true
      };
    case ActionTypes.FETCH_FACT_SUCCESS:
      return {
        ...state,
        pending: false,
        fact: action.data
      };
    case ActionTypes.FETCH_MAP_SUCCESS:
      return {
        ...state,
        pending: false,
        map: action.data
      };
    default:
      return state;
  }
};

export default reducer;
