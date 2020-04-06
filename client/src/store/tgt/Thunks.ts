import RfiModel from '../rfi/RfiModel';
import { ExploitDateModel } from './ExploitDateModel';
import { ExploitDateDeserializer } from './ExploitDateDeserializer';
import { ExploitDatePostModel } from './ExploitDatePostModel';

import { TargetPostModel } from './TargetPostModel';
import {
  fetchDatesAndTargetsSuccess,
  postExploitDateDelete,
  postExploitDatesUpdate,
  postTarget,
  postTargetDelete,
  updateExploitDateSuccess,
  updateTgtSuccess,
} from './Actions';

export const fetchRfiTargets = (rfi: RfiModel, dates: ExploitDateModel[], firstLoad: boolean) => {
  return (dispatch: any) => {
    return fetch('/api/targets?rfiId=' + rfi.id)
      .then(response => response.json())
      .then(targets => dispatch(fetchDatesAndTargetsSuccess(rfi, dates, targets, firstLoad)))
      .catch((reason => {
        console.log("Failed to fetch Targets: " + reason)
      }));
  }
};

export const deleteExploitDate = (exploitDateId: number) => {
  return (dispatch: any) => {
    postExploitDateDelete(exploitDateId)
      .then(response => response.json())
      .then(dates => dispatch(updateExploitDateSuccess(ExploitDateDeserializer.deserialize(dates))))
      .catch((reason) => {
        console.log(reason)
      })
  }
};

export const postExploitDate = (rfi: RfiModel, exploitDate: ExploitDatePostModel) => {
  return (dispatch: any) => {
    postExploitDatesUpdate(exploitDate)
      .then(response => dispatch(loadTgtPage(rfi, false)))
      .catch((reason) => {
        console.log(reason)
      })
  };
};

export const submitPostTarget = (target: TargetPostModel, rfi: RfiModel, userName: string) => {
  return (dispatch: any) => {
    postTarget(target, userName)
      .then(response => dispatch(loadTgtPage(rfi, false)))
      .catch((reason) => {
        console.log(reason)
      })
  };
};

export const deleteTgt = (tgtId: number) => {
  return (dispatch: any) => {
    postTargetDelete(tgtId)
      .then(response => response.json())
      .then(tgts => dispatch(updateTgtSuccess(tgts)))
      .catch((reason) => {
        console.log('Error deleting target: ' + reason)
      })
  };
};

export const loadTgtPage = (rfi: RfiModel, firstLoad: boolean) => {
  return (dispatch: any) => {
    return fetch('/api/targets/dates?rfiId=' + rfi.id)
      .then(response => response.json())
      .then(exploitDates => dispatch(
        fetchRfiTargets(
          rfi,
          ExploitDateDeserializer.deserialize(exploitDates),
          firstLoad
        )
      ))
      .catch(reason => {
        console.log("Failed to fetch exploit dates: " + reason)
      });
  };
};
