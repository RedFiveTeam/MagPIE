import RfiModel from '../../../workflow/rfi-page/models/RfiModel';
import { ActionTypes } from '../ActionTypes';
import moment from 'moment';
import { server } from '../../../config';
import { ExploitDatePostModel } from '../../../workflow/tgt-page/models/ExploitDatePostModel';
import 'isomorphic-fetch';
import { ExploitDateDeserializer } from '../../utils/ExploitDateDeserializer';
import { TargetPostModel } from '../../../workflow/tgt-page/models/TargetPostModel';
import { TargetModel } from '../../../workflow/tgt-page/models/TargetModel';
import { ExploitDateModel } from '../../../workflow/tgt-page/models/ExploitDateModel';

export const exitTgtPage = () => {
  return {
    type: ActionTypes.EXIT_TGT_PAGE,
    viewTgtPage: false
  }
};

export const updateTgtSuccess = (targets: TargetModel[]) => {
  return {
    type: ActionTypes.UPDATE_TGT_SUCCESS,
    targets: targets
  }
};

export const fetchDatesAndTargetsSuccess = (rfi: RfiModel, exploitDates: ExploitDateModel[], targets: TargetModel[],
                                            firstLoad: boolean) => {
  if (firstLoad)
    return {
      type: ActionTypes.NAVIGATE_TO_TGT_PAGE,
      rfi: rfi,
      exploitDates: exploitDates,
      targets: targets
    };
  return {
    type: ActionTypes.RELOAD_TGT_PAGE,
    exploitDates: exploitDates,
    targets: targets
  };
};

export const setDatePlaceholder = (show: boolean) => {
  return {
    type: ActionTypes.SHOW_DATE_PLACEHOLDER,
    showDatePlaceholder: show
  }
};

export const loadTgtPage = (rfi: RfiModel, firstLoad: boolean) => {
  return (dispatch: any) => {
    return fetch(server + '/api/rfis/' + rfi.id + '/exploit-dates')
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

export const fetchRfiTargets = (rfi: RfiModel, dates: ExploitDateModel[], firstLoad: boolean) => {
  return (dispatch: any) => {
    return fetch(server + '/api/rfis/' + rfi.id + '/targets')
      .then(response => response.json())
      .then(targets => dispatch(fetchDatesAndTargetsSuccess(rfi, dates, targets, firstLoad)))
      .catch((reason => {
        console.log("Failed to fetch Targets: " + reason)
      }));
  }
};

export const updateRfiDate = (rfi: RfiModel, date: Date) => {
  let exploitDate: ExploitDatePostModel = new ExploitDatePostModel(
    null,
    new Date(moment(date).utc(true).unix() * 1000), //convert date to UTC
    rfi.rfiNum,
  );
  return (dispatch: any) => {
    postRfiExploitDatesUpdate(exploitDate)
      .then(response => dispatch(loadTgtPage(rfi, true)))
      .catch((reason) => {
        console.log(reason)
      })
  };
};

export const submitNewTarget = (target: TargetPostModel, rfi: RfiModel) => {
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

const postRfiExploitDatesUpdate = (exploitDate: ExploitDatePostModel) => {
  return fetch(
    server + '/api/rfis/change-exploit-date',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exploitDate),
    }
  );
};

const postTarget = (target: TargetPostModel) => {
  return fetch(
    server + '/api/rfis/add-target',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(target),
    }
  );
};

const postTargetDelete = (tgtId: number) => {
  return fetch(
    server + '/api/rfis/delete-target/' + tgtId,
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};
