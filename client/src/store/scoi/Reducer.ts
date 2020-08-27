import { ScoiActionTypes, ScoiState } from './Types';
import { Reducer } from 'redux';

const initState: ScoiState = {
  viewScoiPage: false,
  scois: [],
};

const reducer: Reducer<ScoiState> = (state = initState, action: any) => {
  switch (action.type) {
    case ScoiActionTypes.NAVIGATE_TO_SCOI_PAGE:
      return {
        ...state,
        scois: action.scois,
        viewScoiPage: true,
      };
    case ScoiActionTypes.EXIT_SCOI_PAGE:
      return {
        ...state,
        viewScoiPage: false,
      };
    default:
      return {...state};
  }
};

export { reducer as scoiReducer };
export { initState as scoiInitState };
