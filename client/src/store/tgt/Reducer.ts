import { TgtActionTypes } from './Types';
import RfiModel from '../rfi/RfiModel';
import { ExploitDateSorter } from './ExploitDateSorter';
import { Reducer } from 'redux';
import { TgtState } from './Types';
import { ExploitDateModel } from './ExploitDateModel';

const initState: TgtState = {
  rfi: {} as RfiModel,
  viewTgtPage: false,
  exploitDates: [],
  showDatePlaceholder: false,
  addTgt: -1,
  editTgt: -1,
  targets: [],
  newExploitDate: undefined,
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
        targets: action.targets,
        addTgt: -1,
        editTgt: -1,
      };
    case TgtActionTypes.RELOAD_TGT_PAGE:
      sortedExploitDates = ExploitDateSorter.sort(action.exploitDates);
      let newExploitDate: ExploitDateModel = action.exploitDates.find(
        (exploitDate: ExploitDateModel) => exploitDate.id === action.newExploitDateId);
      return {
        ...state,
        exploitDates: sortedExploitDates,
        targets: action.targets,
        newExploitDate: newExploitDate
      };
    case TgtActionTypes.EXIT_TGT_PAGE:
      return {
        ...state,
        addTgt: -1,
        editTgt: -1,
        viewTgtPage: false,
      };
    case TgtActionTypes.UPDATE_EXPLOIT_DATE:
      return {
        ...state,
        exploitDates: action.exploitDates,
      };
    case TgtActionTypes.SHOW_DATE_PLACEHOLDER:
      return {
        ...state,
        showDatePlaceholder: action.showDatePlaceholder,
      };
    case TgtActionTypes.UPDATE_TGT_SUCCESS:
      return {
        ...state,
        targets: action.targets,
      };
    case TgtActionTypes.UPDATE_TGT_LOCAL:
      let newTargets = Array.from(state.targets);
      if (action.target.id > 0) {
        for (let tgt in newTargets) {
          if (newTargets[tgt].id === action.target.id) {
            newTargets[tgt] = action.target;
            break;
          }
        }
      } else {
        newTargets.push(action.target);
      }
      return {
        ...state,
        targets: newTargets,
        addTgt: -1,
        editTgt: -1,
      };
    case TgtActionTypes.ADD_TGT:
      return {
        ...state,
        addTgt: action.addTgt,
      };
    case TgtActionTypes.EDIT_TGT:
      return {
        ...state,
        editTgt: action.editTgt,
      };
    case TgtActionTypes.RESET_ADD_EDIT_TGT:
      return {
        ...state,
        addTgt: -1,
        editTgt: -1,
      };
    default:
      return {...state};
  }
};

export { reducer as tgtReducer };
export { initState as tgtInitState };
