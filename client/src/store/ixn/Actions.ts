import { TargetModel } from '../tgt/TargetModel';
import { IxnActionTypes } from './Types';
import { SegmentModel } from '../tgtSegment/SegmentModel';
import { SegmentDeserializer } from './SegmentDeserializer';

export const loadIxnPage = (target: TargetModel | null, dateString: string | null, segments: SegmentModel[]) => {
  if (target) {
    return {
      type: IxnActionTypes.NAVIGATE_TO_IXN_PAGE,
      target: target,
      segments: segments,
      dateString: dateString
    }
  } else {
    return {
      type: IxnActionTypes.RELOAD_IXN_PAGE,
      segments: segments,
    }
  }
};

export const exitIxnPage = () => {
  return {
    type: IxnActionTypes.EXIT_IXN_PAGE
  }
};

export const navigateToIxnPage = (target: TargetModel, dateString: string) => {
  return (dispatch: any) => {
    fetchSegments(target.id)
      .then(segments => dispatch(loadIxnPage(target, dateString, SegmentDeserializer.deserialize(segments))))
  }
};

export const updateSegment = (segment: SegmentModel) => {
  return (dispatch: any) => {
    postSegment(segment)
      .then(response => fetchSegments(segment.targetId))
      .then(segments => dispatch(loadIxnPage(null, null, SegmentDeserializer.deserialize(segments))))
      .catch((reason) => {
        console.log(reason);
      })
  }
};

export const fetchSegments = (targetId: number) => {
  return fetch('/api/ixns/segment/' + targetId)
    .then(response => response.json())
    .catch((reason => {
      console.log(reason);
    }))
};

export const postSegment = (segment: SegmentModel) => {
  return fetch(
    '/api/ixns/segment/post',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(segment),
    }
  );
};