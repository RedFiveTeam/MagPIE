import { ActionTypes } from '../actions/ActionTypes';
import { RFIDeserializer } from '../../rm-dashboard/RFIDeserializer';

const initState = {
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_RFI_SUCCESS:
      return {...state, rfis: new RFIDeserializer().deserialize(action.body)};
    case ActionTypes.FETCH_SITE_VISITS_SUCCESS:
      return {...state, siteVisits: action.body};
    case ActionTypes.FETCH_GETS_CLICKS_SUCCESS:
      return {...state, GETSClicks: action.body};
    default:
      return state;
  }
};

export default reducer;
