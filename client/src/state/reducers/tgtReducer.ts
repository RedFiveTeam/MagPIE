import { ActionTypes } from '../actions/ActionTypes';
import RfiModel from '../../workflow/rfi-page/models/RfiModel';
import { TargetModel } from '../../workflow/tgt-page/models/TargetModel';
import { ExploitDateModel } from '../../workflow/tgt-page/models/ExploitDateModel';
import { ExploitDateSorter } from '../utils/ExploitDateSorter';

const initState = {
  viewTgtPage: false,
  rfi: {} as RfiModel,
  exploitDates: [] as ExploitDateModel[],
  showDatePlaceholder: false,
  targets: [] as TargetModel[]
};

const tgtReducer = (state = initState, action: any) => {
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
        rfi: action.rfi
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

export default tgtReducer;
