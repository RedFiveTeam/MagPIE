import { TgtActionTypes } from './Types';
import RfiModel from '../rfi/RfiModel';
import { ExploitDateSorter } from './ExploitDateSorter';
import { Reducer } from 'redux';
import { TgtState } from './Types';
import { ExploitDateModel } from './ExploitDateModel';
import { TargetModel } from './TargetModel';

const initState: TgtState = {
  rfi: {} as RfiModel,
  viewTgtPage: false,
  exploitDates: [] as ExploitDateModel[],
  showDatePlaceholder: false,
  targets: [] as TargetModel[]
};

const reducer: Reducer<TgtState> = (state = initState, action: any) => {
  let sortedExploitDates: ExploitDateModel[];

  switch (action.type) {
    case TgtActionTypes.NAVIGATE_TO_TGT_PAGE:
      sortedExploitDates = ExploitDateSorter.sort(action.exploitDates);
      return {
        ...state,
        viewTgtPage: true,
        showDatePlaceholder: false,
        rfi: action.rfi,
        exploitDates: sortedExploitDates,
        targets: action.targets
      };
    case TgtActionTypes.RELOAD_TGT_PAGE:
      sortedExploitDates = ExploitDateSorter.sort(action.exploitDates);
      return {
        ...state,
        exploitDates: sortedExploitDates,
        targets: action.targets
      };
    case TgtActionTypes.EXIT_TGT_PAGE:
      return {
        ...state,
        viewTgtPage: false
      };
    case TgtActionTypes.UPDATE_EXPLOIT_DATE:
      return {
        ...state,
        exploitDates: action.exploitDates
      };
    case TgtActionTypes.SHOW_DATE_PLACEHOLDER:
      return {
        ...state,
        showDatePlaceholder: action.showDatePlaceholder
      };
    case TgtActionTypes.UPDATE_TGT_SUCCESS:
      return {
        ...state,
        targets: action.targets
      };
    default:
      return {...state};
  }
};

export { reducer as tgtReducer };
export { initState as tgtInitState };