import RfiModel from '../rfi/RfiModel';
import { ExploitDateModel } from './ExploitDateModel';
import { ExploitDateDeserializer } from './ExploitDateDeserializer';
import { ExploitDatePostModel } from './ExploitDatePostModel';

import { TargetPostModel } from './TargetPostModel';
import {
  fetchDatesAndTargetsSuccess,
   postExploitDateDelete, postExploitDatesUpdate, postTarget, postTargetDelete, postTargetsDelete,
  truncateAndConvertDateToUtc,
  updateExploitDateSuccess,
  updateTgtSuccess
} from './Actions';

const moment = require('moment');

export const fetchRfiTargets = (rfi: RfiModel, dates: ExploitDateModel[], firstLoad: boolean) => {
  return (dispatch: any) => {
    return fetch('/api/rfi/' + rfi.id + '/targets')
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

export const deleteTargetsByExploitDateId = (exploitDateId: number) => {
  return (dispatch: any) => {
    postTargetsDelete(exploitDateId)
      .then(response => response.json())
      .then(dates => dispatch(updateExploitDateSuccess(ExploitDateDeserializer.deserialize(dates))))
      .catch((reason) => {
        console.log(reason)
      })
  }
};

export const updateRfiDate = (rfiId: number, date: Date, oldDate?: ExploitDateModel) => {
  let newDate = truncateAndConvertDateToUtc(date); //convert date to UTC
  let exploitDate: ExploitDatePostModel = new ExploitDatePostModel(
    (oldDate ? new Date(moment(oldDate.exploitDate).utc(true).unix() * 1000) : null),
    newDate,
    rfiId
  );
  return (dispatch: any) => {
    postExploitDatesUpdate(exploitDate, oldDate ? oldDate.id : undefined)
      .then(response => response.json())
      .then(dates => dispatch(updateExploitDateSuccess(ExploitDateDeserializer.deserialize(dates))))
      .catch((reason) => {
        console.log(reason)
      })
  };
};

export const submitPostTarget = (target: TargetPostModel, rfi: RfiModel) => {
  return (dispatch: any) => {
    postTarget(target)
      .then(response => dispatch(loadTgtPage(rfi, true)))
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
    return fetch('/api/rfi/' + rfi.id + '/exploit-dates')
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