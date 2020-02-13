import { TargetModel } from '../../../workflow/tgt-page/models/TargetModel';
import { ActionTypes } from '../ActionTypes';

export const navigateToIxnPage = (target: TargetModel, dateString: string) => {
  return {
    type: ActionTypes.NAVIGATE_TO_IXN_PAGE,
    target: target,
    dateString: dateString
  }
};

export const exitIxnPage = () => {
  return {
    type: ActionTypes.EXIT_IXN_PAGE
  }
};
