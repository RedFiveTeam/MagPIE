import { ActionTypes } from '../actions/ActionTypes';
import { RFIDeserializer } from '../../rm-dashboard/RFIDeserializer';

const initState = {
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_RFI_SUCCESS:
      return {...state, rfis: new RFIDeserializer().deserialize(action.body)};
    case ActionTypes.FETCH_METRICS_SUCCESS:
      return {...state, siteVisitCount: action.body};
    default:
      return state;
  }
};

export default reducer;
