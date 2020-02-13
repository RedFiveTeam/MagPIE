import { RfiActionTypes } from './Types';
import { RfiDeserializer } from './RfiDeserializer';
import RfiModel from "./RfiModel";
import { Field } from '../sort/SortKeyModel';
import RfiFetchRequestModel from '../metrics/RfiFetchRequestModel';
import RfiPriorityPostModel from './RfiPriorityPostModel';
import { postRfiFetchTimeMetric } from '../metrics';


export const sortRfis = (field: Field) => {
  return {type: RfiActionTypes.SORT_RFIS, field: field}
};

export const reprioritizeRfis = (reprioritizedList: RfiModel[]) => {
  return {
    type: RfiActionTypes.REPRIORITIZE_RFIS,
    reprioritizedList: reprioritizedList
  };
};

export const postRfiPriorityUpdate = (rfis: RfiPriorityPostModel[]) => {
  return fetch(
    '/api/rfis/update-priority',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rfis),
    }
  )
};

export const fetchRfiPending = () => {
  return {
    type: RfiActionTypes.FETCH_RFI_PENDING
  }
};

export const fetchRfiSuccess = (rfis: any, startTime: number) => {
  let rfiList = RfiDeserializer.deserialize(rfis);
  postRfiFetchTimeMetric(new RfiFetchRequestModel(startTime, new Date().getTime()));
  return {
    type: RfiActionTypes.FETCH_RFI_SUCCESS,
    rfis: rfiList
  }
};


export const fetchRfiUpdating = (rfis: any) => {
  let rfiList = RfiDeserializer.deserialize(rfis);
  return {
    type: RfiActionTypes.FETCH_RFI_UPDATE,
    rfis: rfiList
  }
};


