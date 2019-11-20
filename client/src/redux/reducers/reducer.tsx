import { ActionTypes } from '../actions/ActionTypes';
import RFIModel from '../../rm-dashboard/RFIModel';

const initState = {
  rfis: [] as RFIModel[],
  orderAscending: true,
  sortKey: 'ltiov'
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_RFI_SUCCESS:
      return {...state, rfis: action.body};
    case ActionTypes.FETCH_SITE_VISITS_SUCCESS:
      return {...state, siteVisits: action.body};
    case ActionTypes.FETCH_GETS_CLICKS_SUCCESS:
      return {...state, GETSClicks: action.body};
    case ActionTypes.SET_SORT:
      return {...state, sortKey: action.key, orderAscending: action.order};
    case ActionTypes.SORT_RFIS_SUCCESS:
      return {...state, rfis: action.body};
    default:
      return state;
  }
};

export default reducer;
