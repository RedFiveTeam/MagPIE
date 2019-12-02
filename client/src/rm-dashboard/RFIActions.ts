import { ActionTypes } from '../redux/actions/ActionTypes';
import { RFIDeserializer } from './RFIDeserializer';

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

const fetchRFISuccess = (body: any) => {
  let rfis = RFIDeserializer.deserialize(body);
  return {
    type: ActionTypes.FETCH_RFI_SUCCESS,
    body: rfis
  }
};

export const fetchRFIs = () => {
  return (dispatch: any) => {
    return fetch('/api/rfis')
      .then(response => response.json())
      .then(body => dispatch(fetchRFISuccess(body)));
  }
};
