import { ActionTypes } from '../redux/actions/ActionTypes';
import { RfiDeserializer } from './RfiDeserializer';
import RfiModel from './RfiModel';
import { RfiSorter } from './RfiSorter';
import { Field, SortKeyModel } from './SortKeyModel';
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

export const reorderRfis = (rfiList: RfiModel[], rfiId: string, newIndex: number) => {
  //clone rfiList
  let reprioritizedList: RfiModel[] = Object.assign([], rfiList);

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
  RfiSorter.sortByPriority(reprioritizedList, new SortKeyModel(Field.PRIORITY, false));

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

const fetchRfiSuccess = (rfis: any, startTime: number) => {
  // (rfis === null) ? rfiList = {} : rfiList = RfiDeserializer.deserialize(rfis)
  let rfiList = RfiDeserializer.deserialize(rfis);
  postRfiFetchTimeMetric(new RfiFetchRequestModel(startTime, new Date().getTime()));
  return {
    type: ActionTypes.FETCH_RFI_SUCCESS,
    body: rfiList
  }
};

export const fetchRfis = () => {
  let startTime: number = new Date().getTime();
  return (dispatch: any) => {
    return fetch('/api/rfis')
      .then(dispatch(fetchRfiPending()))
      .then(response => response.json())
      .then(rfis => dispatch(fetchRfiSuccess(rfis, startTime)))
  }
};
