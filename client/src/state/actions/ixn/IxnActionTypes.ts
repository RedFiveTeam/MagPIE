import { TargetModel } from '../../../workflow/tgt-page/models/TargetModel';

export enum IxnActionTypes {
  NAVIGATE_TO_IXN_PAGE = 'NAVIGATE_TO_IXN_PAGE',
  EXIT_IXN_PAGE = 'EXIT_IXN_PAGE'
}

export interface IxnState {
  readonly  viewIxnPage: boolean;
  readonly  target: TargetModel;
}
