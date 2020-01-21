import { ActionTypes } from '../ActionTypes';
import { RfiDeserializer } from '../../utils/RfiDeserializer';
import RfiModel from "../../../workflow/rfi-page/models/RfiModel";
import { RfiSorter } from '../../utils/RfiSorter';
import { Field, SortKeyModel } from '../../../workflow/rfi-page/models/SortKeyModel';
import RfiFetchRequestModel from '../../../metrics/models/RfiFetchRequestModel';
import RfiPriorityPostModel from '../../../workflow/rfi-page/models/RfiPriorityPostModel';
import { postRfiFetchTimeMetric } from '..';
import { server } from '../../../config';

export const sortRfis = (field: Field) => {
  return {type: ActionTypes.SORT_RFIS, field: field}
};

export const reorderRfis = (rfiList: RfiModel[], rfiId: string, newIndex: number) => {
  //clone rfiList
  let reprioritizedList: RfiModel[] = Object.assign([], rfiList);

  //find the rfi by rfiNum
  let changingRfi = rfiList.find((rfi) => {
    return rfi.rfiNum === rfiId;
  });

  let originalPriority = changingRfi!.priority;
  let postRfis: RfiPriorityPostModel[] = [];

  //change everything after it
  if (newIndex + 1 < originalPriority) { //moving up
    for (let i = newIndex; i < originalPriority - 1; i++) {
      reprioritizedList[i].priority = reprioritizedList[i].priority + 1;
      postRfis.push(new RfiPriorityPostModel(reprioritizedList[i].rfiNum, reprioritizedList[i].priority));
    }
  } else { //moving down
    for (let i = originalPriority; i <= newIndex; i++) {
      reprioritizedList[i].priority = reprioritizedList[i].priority - 1;
      postRfis.push(new RfiPriorityPostModel(reprioritizedList[i].rfiNum, reprioritizedList[i].priority));
    }
  }

  //change its prio
  changingRfi!.priority = newIndex + 1;
  postRfis.push(new RfiPriorityPostModel(changingRfi!.rfiNum, changingRfi!.priority));

  //resort by new priority
  reprioritizedList = RfiSorter.sort(reprioritizedList, new SortKeyModel(Field.PRIORITY, true));


  //Try to post updates; if they are invalid, reload page instead
  return (dispatch: any) => {
    dispatch(reprioritizeRfis(reprioritizedList));
    postRfiPriorityUpdate(postRfis)
      .then(response => response.json()).catch((reason) => {console.log(reason)})
      .then(success => {
        if (!success)
          dispatch(fetchLocalUpdate());
      });
  };

};

const reprioritizeRfis = (reprioritizedList: RfiModel[]) => {
  return {
    type: ActionTypes.REPRIORITIZE_RFIS,
    reprioritizedList: reprioritizedList
  };
};

const postRfiPriorityUpdate = (rfis: RfiPriorityPostModel[]) => {
  return fetch(
    server + '/api/rfis/update-priority',
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
  let rfiList = RfiDeserializer.deserialize(rfis);
  postRfiFetchTimeMetric(new RfiFetchRequestModel(startTime, new Date().getTime()));
  return {
    type: ActionTypes.FETCH_RFI_SUCCESS,
    rfis: rfiList
  }
};

export const fetchRfis = () => {
  let startTime: number = new Date().getTime();
  return (dispatch: any) => {
    return fetch(server + '/api/rfis')
      .then(dispatch(fetchRfiPending()))
      .then(response => response.json())
      .then(rfis => dispatch(fetchRfiSuccess(rfis, startTime)))
      .catch((reason => {console.log("Failed to fetch RFIs: " + reason)}));
  }
};

export const fetchRfiUpdating = (rfis: any) => {
  let rfiList = RfiDeserializer.deserialize(rfis);
  return {
    type: ActionTypes.FETCH_RFI_UPDATE,
    rfis: rfiList
  }
};

export const fetchLocalUpdate = () => {
  return (dispatch: any) => {
    return fetch(server + '/api/rfis')
      .then(response => response.json())
      .then(rfis => dispatch(fetchRfiUpdating(rfis)))
      .catch((reason => {console.log("Failed to fetch RFIs: " + reason)}));
  }
};
