import { TargetModel } from '../../workflow/tgt-page/models/TargetModel';
import { ActionTypes } from '../actions/ActionTypes';
import { Reducer } from 'redux';
import { IxnState } from '../actions/ixn/IxnActionTypes';


const initState: IxnState = {
  viewIxnPage: false,
  target: {} as TargetModel
};

const reducer: Reducer<IxnState> = (state = initState, action: any) => {
  switch (action.type) {
    case ActionTypes.NAVIGATE_TO_IXN_PAGE:
      return {
        ...state,
        viewIxnPage: true,
        target: action.target
      };
    case ActionTypes.EXIT_IXN_PAGE:
      return {
        ...state,
        viewIxnPage: false
      };
    default:
      return {...state}
  }
};

export { reducer as ixnReducer };
