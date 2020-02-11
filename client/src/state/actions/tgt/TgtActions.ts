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
import { ExploitDateSorter } from '../../utils/ExploitDateSorter';

export const truncateAndConvertDateToUtc = (date: Date): Date => {
  let newDate = new Date(moment(date).utc(true).unix() * 1000); //convert date to UTC
  newDate.setHours(0,0,0,0);
  return newDate;
};

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

export const updateRfiDateSuccess = (exploitDates: ExploitDateModel[]) => {
  return {
    type: ActionTypes.UPDATE_RFI_DATE,
    exploitDates: ExploitDateSorter.sort(exploitDates)
  }
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

export const deleteExploitDate = (exploitDateId: number) => {
  return (dispatch: any) => {
    postExploitDateDelete(exploitDateId)
      .then(response => response.json())
      .then(dates => dispatch(updateRfiDateSuccess(ExploitDateDeserializer.deserialize(dates))))
      .catch((reason) => {
        console.log(reason)
      })
  }
};

export const deleteTargetsByExploitDateId = (exploitDateId: number) => {
  return (dispatch: any) => {
    postTargetsDelete(exploitDateId)
      .then(response => response.json())
      .then(dates => dispatch(updateRfiDateSuccess(ExploitDateDeserializer.deserialize(dates))))
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
      .then(dates => dispatch(updateRfiDateSuccess(ExploitDateDeserializer.deserialize(dates))))
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

const postExploitDateDelete = (exploitDateId: number) => {
  return fetch(
    server + '/api/rfis/' + exploitDateId + '/delete',
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

const postTargetsDelete = (exploitDateId: number) => {
  return fetch(
    server + '/api/rfis/' + exploitDateId + '/targets/delete',
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

const postExploitDatesUpdate = (exploitDate: ExploitDatePostModel, oldId?: number) => {
  return fetch(
    server + '/api/rfis/change-exploit-date/' + (oldId ? oldId : ''),
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
