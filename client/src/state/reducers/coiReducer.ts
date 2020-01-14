import { ActionTypes } from '../actions/ActionTypes';
import RfiModel from '../../workflow/rfi-page/models/RfiModel';

const initState = {
  viewCoiPage: false,
  rfi: {} as RfiModel
};

const coiReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionTypes.NAVIGATE_TO_COI_PAGE:
      return {...state, viewCoiPage: true, rfi: action.rfi};
    case ActionTypes.EXIT_COI_PAGE:
      return {...state, viewCoiPage: false};
    default:
      return {...state};
  }
};

export default coiReducer;
