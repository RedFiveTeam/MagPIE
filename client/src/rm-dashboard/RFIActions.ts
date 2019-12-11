import { ActionTypes } from '../redux/actions/ActionTypes';
import { RFIDeserializer } from './RFIDeserializer';
import RFIModel from './RFIModel';
import { RFISorter } from './RFISorter';
import { Field, SortKey } from './SortKey';
import { postRfiFetchTimeMetric } from '../users/UserActions';
import RfiFetchRequestModel from '../metrics/Model/RfiFetchRequestModel';
import RfiPostModel from './RfiPostModel';

export const sortByPriority = () => {
  return {type: ActionTypes.SORT_RFIS_BY_PRIORITY}
};

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

export const reorderRfis = (rfiList: RFIModel[], rfiId: string, newIndex: number) => {
  //clone rfiList
  let reprioritizedList: RFIModel[] = Object.assign([], rfiList);

  //find the rfi by id
  let changingRfi = rfiList.find((rfi) => {
    return rfi.id === rfiId;
  });

  let originalPriority = changingRfi!.priority;
  let postRfis: RfiPostModel[] = [];

  //change everything after it
  if (newIndex + 1 < originalPriority) { //moving up
    for (let i = newIndex; i < originalPriority - 1; i++) {
      reprioritizedList[i].priority = reprioritizedList[i].priority + 1;
      postRfis.push(new RfiPostModel(reprioritizedList[i].id, reprioritizedList[i].priority));
    }
  } else { //moving down
    for (let i = originalPriority; i <= newIndex; i++) {
      reprioritizedList[i].priority = reprioritizedList[i].priority - 1;
      postRfis.push(new RfiPostModel(reprioritizedList[i].id, reprioritizedList[i].priority));
    }
  }

  //change its prio
  changingRfi!.priority = newIndex + 1;
  postRfis.push(new RfiPostModel(changingRfi!.id, changingRfi!.priority));

  //resort by new priority
  RFISorter.sortByPriority(reprioritizedList, new SortKey(Field.PRIORITY, false));

  postRfiPriorityUpdate(postRfis);

  return {
    type: ActionTypes.REPRIORITIZE_RFIS,
    reprioritizedList: reprioritizedList
  };
};

const postRfiPriorityUpdate = (rfis: RfiPostModel[]) => {
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
