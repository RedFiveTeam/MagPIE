import RfiModel from '../rfi/RfiModel';
import { TgtActionTypes } from './Types';
import moment from 'moment';
import { ExploitDatePostModel } from './ExploitDatePostModel';
import 'isomorphic-fetch';
import { TargetPostModel } from './TargetPostModel';
import { TargetModel } from './TargetModel';
import { ExploitDateModel } from './ExploitDateModel';
import { ExploitDateSorter } from './ExploitDateSorter';

export const truncateAndConvertDateToUtc = (date: Date): Date => {
  let newDate = new Date(moment(date).utc(true).unix() * 1000); //convert date to UTC
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const exitTgtPage = () => {
  return {
    type: TgtActionTypes.EXIT_TGT_PAGE,
    viewTgtPage: false,
  };
};

export const updateTgtSuccess = (targets: TargetModel[]) => {
  return {
    type: TgtActionTypes.UPDATE_TGT_SUCCESS,
    targets: targets,
  };
};

export const updateTgtsLocal = (targets: TargetModel[], isCopy: boolean) => {
  return {
    type: TgtActionTypes.UPDATE_TGT_LOCAL,
    targets: targets,
    isCopy: isCopy,
  };
};

export const addTgt = (exploitDateId: number) => {
  return {
    type: TgtActionTypes.ADD_TGT,
    addTgt: exploitDateId,
  };
};

export const editTgt = (targetId: number) => {
  return {
    type: TgtActionTypes.EDIT_TGT,
    editTgt: targetId,
  };
};

export const resetAddEditTgt = () => {
  return {
    type: TgtActionTypes.RESET_ADD_EDIT_TGT,
  };
};

export const fetchDatesAndTargetsSuccess = (rfi: RfiModel, exploitDates: ExploitDateModel[], targets: TargetModel[],
                                            firstLoad: boolean, newExploitDateId: number) => {
  if (firstLoad) {
    return {
      type: TgtActionTypes.NAVIGATE_TO_TGT_PAGE,
      rfi: rfi,
      exploitDates: exploitDates,
      targets: targets,
    };
  }
  return {
    type: TgtActionTypes.RELOAD_TGT_PAGE,
    exploitDates: exploitDates,
    targets: targets,
    newExploitDateId: newExploitDateId,
  };
};

export const updateExploitDateSuccess = (exploitDates: ExploitDateModel[]) => {
  return {
    type: TgtActionTypes.UPDATE_EXPLOIT_DATE,
    exploitDates: ExploitDateSorter.sort(exploitDates),
  };
};

export const setDatePlaceholder = (show: boolean) => {
  return {
    type: TgtActionTypes.SHOW_DATE_PLACEHOLDER,
    showDatePlaceholder: show,
  };
};

export const postExploitDateDelete = (exploitDateId: number) => {
  return fetch(
    '/api/targets/dates/delete?exploitDateId=' + exploitDateId,
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const postExploitDatesUpdate = (exploitDate: ExploitDatePostModel) => {
  return fetch(
    '/api/targets/dates/post',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exploitDate),
    },
  );
};

export const postTargetDelete = (tgtId: number) => {
  return fetch(
    '/api/targets/delete?targetId=' + tgtId,
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const postTarget = (targets: TargetPostModel[], userName: string, isCopy?: boolean) => {
  return fetch(
    '/api/targets/post?userName=' + userName + (isCopy ? '&isCopy=true' : ''),
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(targets),
    },
  ).catch((reason) => {
    console.log('Failed to post target: ' + reason);
  });
};

export const postCollapseClick = (userName: string) => {
  return fetch(
    '/api/metrics/click-collapse',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: userName,
    },
  ).catch((reason) => {
    console.log('Failed to post collapse click: ' + reason);
  });
};
