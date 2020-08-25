import { RfiActionTypes } from './Types';
import { RfiDeserializer } from './RfiDeserializer';
import RfiModel from './RfiModel';
import { Field } from '../sort/SortKeyModel';
import RfiPriorityPostModel from './RfiPriorityPostModel';
import { TgtActionTypes } from '../tgt';
import { fetchLocalUpdate } from './Thunks';
import RfiFeedbackModel from './RfiFeedbackModel';

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

export const updateTgtRfiSuccess = (rfis: any, rfiId: number) => {
  let rfiList = RfiDeserializer.deserialize(rfis);
  let rfi = rfiList.find((rfi) => rfi.id === rfiId);
  if (rfi) {
    return {
      type: TgtActionTypes.UPDATE_RFI,
      rfi: rfi
    };
  } else {
    console.error(`Rfi with id ${rfiId} not found`);
    return {}
  }
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

export const updateTgtRfi = (rfiId: number) => {
  return (dispatch: any) => {
    return fetch('/api/rfi')
      .then(response => response.json())
      .then(rfis => dispatch(updateTgtRfiSuccess(rfis, rfiId)))
      .catch((reason => {
        console.log('Failed to fetch RFIs: ' + reason);
      }));
  };
};

export const postProductUpload = (data: FormData, rfiId: number, userName: string) => {
  return (dispatch: any) => {
    fetch(`api/product?rfiId=${rfiId}&userName=${userName}`,
          {
            method: 'post',
            body: data,
          })
      .then(response => dispatch(updateTgtRfi(rfiId)))
      .catch(reason => console.log(`Upload failed: ${reason}`));
  }
};

export const postRfiFeedback = (feedback: RfiFeedbackModel) => {
  return fetch('/api/rfi/feedback',
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(feedback),
               },
  )
    .then(response => response.status)
    .catch(reason => console.log(`Post feedback failed: ${reason}`))
    ;
};

export const postProductUploadRfiPage = (data: FormData, rfiId: number, userName: string) => {
  return (dispatch: any) => {
    fetch(`api/product?rfiId=${rfiId}&userName=${userName}`,
          {
            method: 'post',
            body: data,
          })
      .then(response => dispatch(fetchLocalUpdate()))
      .catch(reason => console.log(`Upload failed: ${reason}`));
  }
};

export const postProductDelete = (rfiId: number, userName: string) => {
  return fetch(
    `/api/product/delete?rfiId=${rfiId}&userName=${userName}`,
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const postProductUndoDelete = (rfiId: number, userName: string) => {
  return fetch(
    `/api/product/undo-delete?rfiId=${rfiId}&userName=${userName}`,
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
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
