import { Moment } from 'moment';

export const formatRfiNum = (id: string): string => {
  let year: string = id.substr(id.length - 8, 2);
  let number: string = id.substr(id.length - 3, 3);
  return `${year}-${number}`;
};

export const convertTimeStringToMoment = (time: string): Moment => {
  const moment = require('moment');
  time = time.replace(/_/g, '0');

  let hours: number = +time.substr(0, 2);
  let minutes: number = +time.substr(3, 2);
  let seconds: number = +time.substr(6, 2);

  let timeDate: Date = new Date(
    (hours * 3600 +
      minutes * 60 +
      seconds)
    * 1000,
  );
  return moment(timeDate).utc();
};

export enum RowAction {
  NONE,
  DELETING,
  SUBMITTING
}

interface ViewState {
  rfiId: number|undefined;
  tgtId: number|undefined;
}

export interface Cookie {
  userName: string;
  segments: number[];
  viewState: ViewState
}
