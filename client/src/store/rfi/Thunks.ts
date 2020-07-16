import RfiModel from './RfiModel';
import RfiPriorityPostModel from './RfiPriorityPostModel';
import { RfiSorter } from './RfiSorter';
import { Field, SortKeyModel } from '../sort/SortKeyModel';
import { fetchRfiPending, fetchRfiSuccess, fetchRfiUpdating, postRfiPriorityUpdate, reprioritizeRfis } from './Actions';

export const fetchRfis = () => {
  return (dispatch: any) => {
    return fetch('/api/rfi')
      .then(dispatch(fetchRfiPending()))
      .then(response => response.json())
      .then(rfis => dispatch(fetchRfiSuccess(rfis)))
      .catch((reason => {
        console.log('Failed to fetch RFIs: ' + reason);
      }));
  };
};

export const fetchLocalUpdate = () => {
  return (dispatch: any) => {
    return fetch('/api/rfi')
      .then(response => response.json())
      .then(rfis => dispatch(fetchRfiUpdating(rfis)))
      .catch((reason => {
        console.log('Failed to fetch RFIs: ' + reason);
      }));
  };
};

export const reorderRfis = (rfiList: RfiModel[], rfiId: string, newIndex: number, userName: string) => {
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
    postRfiPriorityUpdate(postRfis, `?userName=${userName}`)
      .then(response => response.json()).catch((reason) => {
      console.log(reason);
    })
      .then(success => {
        if (!success) {
          dispatch(fetchLocalUpdate());
        }
      });
  };
};
