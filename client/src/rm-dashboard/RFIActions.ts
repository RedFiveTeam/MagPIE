import { ActionTypes } from '../redux/actions/ActionTypes';
import { RFIDeserializer } from './RFIDeserializer';
import { postRfiFetchTimeMetric } from '../users/UserActions';
import RfiFetchRequestModel from '../metrics/Model/RfiFetchRequestModel';

export const sortById = () => {
  return {type: ActionTypes.SORT_RFIS_BY_ID}
};

export const sortByCountry = () => {
  return {type: ActionTypes.SORT_RFIS_BY_COUNTRY}
};

export const sortByCustomer = () => {
  return {type: ActionTypes.SORT_RFIS_BY_CUSTOMER}
};

export const sortByLtiov = () => {
  return {type: ActionTypes.SORT_RFIS_BY_LTIOV}
};

const fetchRfiPending = () => {
  return {
    type: ActionTypes.FETCH_RFI_PENDING
  }
};

const fetchRFISuccess = (rfis: any, startTime: number) => {
  let rfiList = RFIDeserializer.deserialize(rfis);
  postRfiFetchTimeMetric(new RfiFetchRequestModel(startTime, new Date().getTime()));
  return {
    type: ActionTypes.FETCH_RFI_SUCCESS,
    body: rfiList
  }
};

export const fetchRFIs = () => {
  let startTime: number = new Date().getTime();
  return (dispatch: any) => {
    return fetch('/api/rfis')
      .then(dispatch(fetchRfiPending()))
      .then(response => response.json())
      .then(rfis => dispatch(fetchRFISuccess(rfis, startTime)))
  }
};
