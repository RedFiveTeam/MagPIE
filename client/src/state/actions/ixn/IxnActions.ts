import { TargetModel } from '../../../workflow/tgt-page/models/TargetModel';
import { ActionTypes } from '../ActionTypes';

export const navigateToIxnPage = (target: TargetModel) => {
  return {
    type: ActionTypes.NAVIGATE_TO_IXN_PAGE,
    target: target
  }
};

export const exitIxnPage = () => {
  return {
    type: ActionTypes.EXIT_IXN_PAGE
  }
};
