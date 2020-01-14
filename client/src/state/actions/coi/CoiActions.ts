import RfiModel from '../../../workflow/rfi-page/models/RfiModel';
import { ActionTypes } from '../ActionTypes';

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


