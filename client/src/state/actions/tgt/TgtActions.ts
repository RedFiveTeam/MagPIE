import RfiModel from '../../../workflow/rfi-page/models/RfiModel';
import { ActionTypes } from '../ActionTypes';
import moment from 'moment';
import { server } from '../../../config';
import { RfiExploitDatesPostModel } from '../../../workflow/tgt-page/models/RfiExploitDatesPostModel';
import 'isomorphic-fetch';
import { Moment } from 'moment';
import { ExploitDateDeserializer } from '../../utils/ExploitDateDeserializer';

export const exitTgtPage = () => {
  return {
    type: ActionTypes.EXIT_TGT_PAGE,
    viewTgtPage: false
  }
};

export const fetchExploitDatesSuccess = (rfi: RfiModel, dates: Moment[]) => {
  return {
    type: ActionTypes.NAVIGATE_TO_TGT_PAGE,
    viewTgtPage: true,
    rfi: rfi,
    dates: dates
  }
};

export const setDatePlaceholder = (show: boolean) => {
  return {
    type:ActionTypes.SHOW_DATE_PLACEHOLDER,
    showDatePlaceholder: show
  }
};

export const navigateToTgtPage = (rfi: RfiModel) => {
  return (dispatch: any) => {
    return fetch(
      server + '/api/rfis/dates',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: rfi.rfiNum,
      }
    ).then(response => response.json())
      .then(dates => dispatch(fetchExploitDatesSuccess(rfi, ExploitDateDeserializer.deserialize(dates))))
      .catch((reason => {
        console.log("Failed to fetch exploit dates : " + reason)
      }));
  };

};

export const updateRfiDate = (rfi: RfiModel, date: Date) => {
  let exploitDate: RfiExploitDatesPostModel = new RfiExploitDatesPostModel(
    null,
    new Date(moment(date).utc(true).unix() * 1000), //convert date to UTC
    rfi.rfiNum,
  );
  return (dispatch: any) => {
    postRfiExploitDatesUpdate(exploitDate)
      .then(response => dispatch(navigateToTgtPage(rfi)))
      .catch((reason) => {
        console.log(reason)
      })
  };
};

const postRfiExploitDatesUpdate = (exploitDate: RfiExploitDatesPostModel) => {
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

