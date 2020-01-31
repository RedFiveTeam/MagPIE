import { ActionTypes } from '../actions/ActionTypes';
import RfiModel from '../../workflow/rfi-page/models/RfiModel';
import { ExploitDateSorter } from '../utils/ExploitDateSorter';
import { Reducer } from 'redux';
import { TgtState } from '../actions/tgt/TgtActionTypes';
import { ExploitDateModel } from '../../workflow/tgt-page/models/ExploitDateModel';
import { TargetModel } from '../../workflow/tgt-page/models/TargetModel';

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
    case ActionTypes.NAVIGATE_TO_TGT_PAGE:
      sortedExploitDates = ExploitDateSorter.sort(action.exploitDates);
      return {
        ...state,
        viewTgtPage: true,
        showDatePlaceholder: false,
        rfi: action.rfi,
        exploitDates: sortedExploitDates,
        targets: action.targets
      };
    case ActionTypes.RELOAD_TGT_PAGE:
      sortedExploitDates = ExploitDateSorter.sort(action.exploitDates);
      return {
        ...state,
        exploitDates: sortedExploitDates,
        targets: action.targets
      };
    case ActionTypes.EXIT_TGT_PAGE:
      return {
        ...state,
        viewTgtPage: false
      };
    case ActionTypes.UPDATE_RFI_DATE:
      return {
        ...state,
        exploitDates: action.exploitDates
      };
    case ActionTypes.SHOW_DATE_PLACEHOLDER:
      return {
        ...state,
        showDatePlaceholder: action.showDatePlaceholder
      };
    case ActionTypes.UPDATE_TGT_SUCCESS:
      return {
        ...state,
        targets: action.targets
      };
    default:
      return {...state};
  }
};

export { reducer as tgtReducer };
