import { ActionTypes } from '../actions/ActionTypes';

const initState = {
  title: "",
};

const reducer = (state = initState, action: any) => {
  if (action.type === ActionTypes.UPDATE_TITLE) {
    return {...state, title: action.event.target.value}
  }
  else {
    return state;
  }
};

export default reducer;
