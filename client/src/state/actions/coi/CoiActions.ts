import RfiModel from '../../../workflow/rfi-page/models/RfiModel';
import { ActionTypes } from '../ActionTypes';
import moment from 'moment';
import { server } from '../../../config';
import { RfiExploitDatesPostModel } from '../../../workflow/coi-page/models/RfiExploitDatesPostModel';
import 'isomorphic-fetch';

export const navigateToCoiPage = (rfi: RfiModel) => {
  return {
    type: ActionTypes.NAVIGATE_TO_COI_PAGE,
    viewCoiPage: true,
    rfi: rfi
  }
};

export const exitCoiPage = () => {
  return {
    type: ActionTypes.EXIT_COI_PAGE,
    viewCoiPage: false
  }
};

export const updateRfiDate = (date1: Date, date2: Date, rfi: RfiModel) => {
  postRfiExploitDatesUpdate(
    new RfiExploitDatesPostModel(
      rfi.rfiNum,
      new Date(moment(date1).utc(true).unix() * 1000), //convert date to UTC
      new Date(moment(date2).utc(true).unix() * 1000)
    )).catch((reason) => {console.log(reason)});

  rfi = new RfiModel(
    rfi.rfiNum,
    rfi.getsUrl,
    rfi.status,
    rfi.customer,
    rfi.ltiov,
    rfi.country,
    rfi.description,
    rfi.priority,
    moment(date1).utc(true),
    moment(date2).utc(true)
  );
  return {
    type: ActionTypes.UPDATE_RFI_DATE,
    rfi: rfi
  }
};

const postRfiExploitDatesUpdate = (rfi: RfiExploitDatesPostModel) => {
  return fetch(
    server + '/api/rfis/update-exploit-dates',
    {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rfi),
    }
  )
};


