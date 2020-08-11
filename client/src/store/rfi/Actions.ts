import { RfiActionTypes } from './Types';
import { RfiDeserializer } from './RfiDeserializer';
import RfiModel from './RfiModel';
import { Field } from '../sort/SortKeyModel';
import RfiPriorityPostModel from './RfiPriorityPostModel';

export const loadSuccess = () => {
  return {type: RfiActionTypes.LOAD_SUCCESS};
};

export const sortRfis = (field: Field) => {
  return {type: RfiActionTypes.SORT_RFIS, field: field};
};

export const reprioritizeRfis = (reprioritizedList: RfiModel[]) => {
  return {
    type: RfiActionTypes.REPRIORITIZE_RFIS,
    reprioritizedList: reprioritizedList,
  };
};

export const postRfiPriorityUpdate = (rfis: RfiPriorityPostModel[], pathVars: string) => {
  return fetch('/api/rfi/update-priority' + pathVars,
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(rfis),
               },
  );
};

export const postProductUpload = (data: FormData, rfiId: number, userName: string) => {
  fetch(`api/uploadProduct?rfiId=${rfiId}&userName=${userName}`,
        {
          method: 'post',
          body: data,
        })
    .then(response => {})
    .catch(reason => console.log(`Upload failed: ${reason}`))
};

export const fetchRfiPending = () => {
  return {
    type: RfiActionTypes.FETCH_RFI_PENDING,
  };
};

export const fetchRfiSuccess = (rfis: any) => {
  let rfiList = RfiDeserializer.deserialize(rfis);
  return {
    type: RfiActionTypes.FETCH_RFI_SUCCESS,
    rfis: rfiList,
  };
};

export const fetchRfiUpdating = (rfis: any) => {
  let rfiList = RfiDeserializer.deserialize(rfis);
  return {
    type: RfiActionTypes.FETCH_RFI_UPDATE,
    rfis: rfiList,
  };
};

export const loadUserMetricsPage = () => {
  return {
    type: RfiActionTypes.NAVIGATE_USER_METRICS_PAGE,
  };
};

export const exitUserMetricsPage = () => {
  return {
    type: RfiActionTypes.EXIT_USER_METRICS_PAGE,
  };
};
