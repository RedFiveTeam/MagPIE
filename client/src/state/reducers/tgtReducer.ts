import { ActionTypes } from '../actions/ActionTypes';
import RfiModel from '../../workflow/rfi-page/models/RfiModel';
import { Moment } from 'moment';

const initState = {
  viewTgtPage: false,
  rfi: {} as RfiModel,
  dates: [] as Moment[],
  showDatePlaceholder: false
};

const tgtReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionTypes.NAVIGATE_TO_TGT_PAGE:
      return {...state,
        viewTgtPage: true,
        rfi: action.rfi,
        dates: action.dates,
        showDatePlaceholder: false
      };
    case ActionTypes.EXIT_TGT_PAGE:
      return {...state,
        viewTgtPage: false
      };
    case ActionTypes.UPDATE_RFI_DATE:
      return {...state,
        rfi: action.rfi
      };
    case ActionTypes.SHOW_DATE_PLACEHOLDER:
      return {...state,
        showDatePlaceholder: action.showDatePlaceholder
      };
    default:
      return {...state};
  }
};

export default tgtReducer;
