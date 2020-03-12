import { TargetModel } from '../tgt/TargetModel';
import { Reducer } from 'redux';
import { IxnActionTypes, IxnState } from './Types';
import { SegmentModel } from '../tgtSegment/SegmentModel';
import IxnModel from './IxnModel';


const initState: IxnState = {
  viewIxnPage: false,
  target: {} as TargetModel,
  dateString: '',
  segments: [] as SegmentModel[],
  ixns: [] as IxnModel[],
  autofocus: false,
};

const reducer: Reducer<IxnState> = (state = initState, action: any) => {
  switch (action.type) {
    case IxnActionTypes.NAVIGATE_TO_IXN_PAGE:
      return {
        ...state,
        viewIxnPage: true,
        target: action.target,
        dateString: action.dateString,
        segments: action.segments,
        ixns: action.ixns,
      };
    case IxnActionTypes.RELOAD_IXN_PAGE:
      return {
        ...state,
        segments: action.segments,
        ixns: action.ixns,
        autofocus: action.autofocus,
      };
    case IxnActionTypes.EXIT_IXN_PAGE:
      return {
        ...state,
        viewIxnPage: false
      };
    default:
      return {...state}
  }
};

export { reducer as ixnReducer };
export { initState as ixnInitState };
