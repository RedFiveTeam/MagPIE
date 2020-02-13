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
  newDate.setHours(0,0,0,0);
  return newDate;
};

export const exitTgtPage = () => {
  return {
    type: TgtActionTypes.EXIT_TGT_PAGE,
    viewTgtPage: false
  }
};

export const updateTgtSuccess = (targets: TargetModel[]) => {
  return {
    type: TgtActionTypes.UPDATE_TGT_SUCCESS,
    targets: targets
  }
};

export const fetchDatesAndTargetsSuccess = (rfi: RfiModel, exploitDates: ExploitDateModel[], targets: TargetModel[],
                                            firstLoad: boolean) => {
  if (firstLoad)
    return {
      type: TgtActionTypes.NAVIGATE_TO_TGT_PAGE,
      rfi: rfi,
      exploitDates: exploitDates,
      targets: targets
    };
  return {
    type: TgtActionTypes.RELOAD_TGT_PAGE,
    exploitDates: exploitDates,
    targets: targets
  };
};

export const updateExploitDateSuccess = (exploitDates: ExploitDateModel[]) => {
  return {
    type: TgtActionTypes.UPDATE_EXPLOIT_DATE,
    exploitDates: ExploitDateSorter.sort(exploitDates)
  }
};

export const setDatePlaceholder = (show: boolean) => {
  return {
    type: TgtActionTypes.SHOW_DATE_PLACEHOLDER,
    showDatePlaceholder: show
  }
};

export const postExploitDateDelete = (exploitDateId: number) => {
  return fetch(
    '/api/rfis/' + exploitDateId + '/delete',
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const postTargetsDelete = (exploitDateId: number) => {
  return fetch(
    '/api/rfis/' + exploitDateId + '/targets/delete',
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const postExploitDatesUpdate = (exploitDate: ExploitDatePostModel, oldId?: number) => {
  return fetch(
    '/api/rfis/change-exploit-date/' + (oldId ? oldId : ''),
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

export const postTargetDelete = (tgtId: number) => {
  return fetch(
    '/api/rfis/delete-target/' + tgtId,
    {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const postTarget = (target: TargetPostModel) => {
  return fetch(
    '/api/rfis/post-target',
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