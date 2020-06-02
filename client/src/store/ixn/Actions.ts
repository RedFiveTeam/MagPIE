import { TargetModel } from '../tgt/TargetModel';
import { IxnActionTypes } from './Types';
import { SegmentModel } from '../tgtSegment/SegmentModel';
import { SegmentDeserializer } from './SegmentDeserializer';
import IxnModel from './IxnModel';
import { IxnDeserializer } from './IxnDeserializer';
import { TargetPostModel } from '../tgt/TargetPostModel';
import { postTarget } from '../tgt';

export const loadIxnPage = (target: TargetModel|null, dateString: string|null, segments: SegmentModel[],
                            ixns: IxnModel[], isLocalUpdate: boolean, newSegment?: SegmentModel) => {
  if (target) {
    return {
      type: IxnActionTypes.NAVIGATE_TO_IXN_PAGE,
      target: target,
      segments: segments,
      ixns: ixns,
      dateString: dateString,
    };
  } else {
    return {
      type: IxnActionTypes.RELOAD_IXN_PAGE,
      segments: segments,
      ixns: ixns,
      isLocalUpdate: isLocalUpdate,
      newSegment: newSegment,
    };
  }
};

export const exitIxnPage = () => {
  return {
    type: IxnActionTypes.EXIT_IXN_PAGE,
  };
};

export const setAddSegment = (addSegment: boolean) => {
  return {
    type: IxnActionTypes.ADD_SEGMENT,
    addSegment: addSegment,
  };
};

export const setEditSegment = (segmentId: number) => {
  return {
    type: IxnActionTypes.EDIT_SEGMENT,
    editSegment: segmentId,
  };
};

export const setEditIxn = (ixnId: number) => {
  return {
    type: IxnActionTypes.EDIT_IXN,
    editIxn: ixnId,
  };
};

export const setAddNote = (ixnId: number) => {
  return {
    type: IxnActionTypes.ADD_NOTE,
    addNote: ixnId,
  };
};

export const saveRollup = (newTarget: TargetPostModel, dateString: string, userName: string) => {
  return (dispatch: any) => {
    postTarget([newTarget], userName)
      .then(response => fetch('/api/targets?rfiId=' + newTarget.rfiId))
      .then(response => response.json())
      .then((targets: TargetModel[]) => dispatch(navigateToIxnPage(targets.find((target) => target.id ===
        newTarget.targetId)!, dateString)))
      .catch((reason => {
        console.log(reason);
      }));
  };
};

export const navigateToIxnPage = (target: TargetModel, dateString: string) => {
  return (dispatch: any) => {
    fetchSegments(target.id)
      .then(segments => dispatch(
        fetchIxns(target.id, target, dateString, SegmentDeserializer.deserialize(segments), false)))
      .catch((reason => {
        console.log(reason);
      }));
  };
};

export const updateSegment = (segment: SegmentModel) => {
  let newSegment: SegmentModel|undefined;
  return (dispatch: any) => {
    postSegment(segment)
      .then(response => response.json())
      .then(newSegmentResponse => {
        console.log('new seg response' + newSegmentResponse);
        if (newSegmentResponse) {
          newSegment = SegmentDeserializer.deserialize(newSegmentResponse)[0];
          return fetchSegments(segment.targetId);
        } else {
          console.log('im an edit');
          return fetchSegments(segment.targetId);
        }
      })
      .then(
        segments => dispatch(fetchIxns(segment.targetId, null, null, SegmentDeserializer.deserialize(segments), false,
                                       newSegment)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const updateIxn = (ixn: IxnModel, userName: string) => {
  return (dispatch: any) => {
    postIxn(ixn, userName)
      .then(response => fetchSegments(ixn.targetId))
      .then(
        segments => dispatch(fetchIxns(ixn.targetId, null, null, SegmentDeserializer.deserialize(segments), false)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const fetchSegments = (targetId: number) => {
  return fetch('/api/ixn/segment/' + targetId)
    .then(response => response.json())
    .catch((reason => {
      console.log(reason);
    }));
};

export const fetchIxns = (targetId: number, target: TargetModel|null, dateString: string|null, segments: SegmentModel[],
                          isLocalUpdate: boolean, newSegment?: SegmentModel) => {
  return (dispatch: any) => {
    return fetch('/api/ixn/' + targetId)
      .then(response => response.json())
      .then(ixns => dispatch(loadIxnPage(target, dateString, segments, IxnDeserializer.deserialize(ixns), isLocalUpdate,
                                         newSegment)))
      .catch((reason => {
        console.log(reason);
      }));
  };
};

export const deleteIxn = (ixn: IxnModel) => {
  return (dispatch: any) => {
    return postIxnDelete(ixn.id!)
      .then(response => fetchSegments(ixn.targetId))
      .then(segments => dispatch(fetchIxns(ixn.targetId, null, null, SegmentDeserializer.deserialize(segments), false)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const deleteSegment = (segment: SegmentModel) => {
  return (dispatch: any) => {
    return postSegmentDelete(segment.id!)
      .then(response => fetchSegments(segment.targetId))
      .then(
        segments => dispatch(fetchIxns(segment.targetId, null, null, SegmentDeserializer.deserialize(segments), false)))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

export const postIxnDelete = (ixnId: number) => {
  return fetch('/api/ixn/' + ixnId,
               {
                 method: 'delete',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
               },
  ).catch((reason) => {
    console.log('Failed to delete ixn: ' + reason);
  });
};

export const postSegmentDelete = (segmentId: number) => {
  return fetch('/api/ixn/segment/' + segmentId,
               {
                 method: 'delete',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
               },
  ).catch((reason) => {
    console.log('Failed to delete segment: ' + reason);
  });
};

export const postSegment = (segment: SegmentModel) => {
  return fetch('/api/ixn/segment/post',
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(segment),
               },
  );
};

export const postIxn = (ixn: IxnModel, userName: string) => {
  return fetch('/api/ixn/post?userName=' + userName,
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(ixn),
               },
  ).catch((reason) => {
    console.log('Failed to post ixn: ' + reason);
  });
};

export const postCancelAddSegment = (targetId: number) => {
  return fetch('/api/metrics/cancel-add-segment/' + targetId,
               {
                 method: 'post',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                 },
               },
  ).catch((reason) => {
    console.log('Failed to cancel-add-segment metric: ' + reason);
  });
};
