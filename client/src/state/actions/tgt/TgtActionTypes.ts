import RfiModel from '../../../workflow/rfi-page/models/RfiModel';
import { ExploitDateModel } from '../../../workflow/tgt-page/models/ExploitDateModel';
import { TargetModel } from '../../../workflow/tgt-page/models/TargetModel';

export enum TgtActionTypes {
  NAVIGATE_TO_TGT_PAGE = 'NAVIGATE_TO_TGT_PAGE',
  RELOAD_TGT_PAGE = 'RELOAD_TGT_PAGE',
  EXIT_TGT_PAGE = 'EXIT_TGT_PAGE',
  SHOW_DATE_PLACEHOLDER = 'SHOW_DATE_PLACEHOLDER',
  UPDATE_RFI_DATE = 'UPDATE_RFI_DATE',
  UPDATE_TGT_SUCCESS = 'UPDATE_TGT_SUCCESS'
}


export interface TgtState {
  readonly  viewTgtPage: boolean;
  readonly  rfi: RfiModel;
  readonly  exploitDates: ExploitDateModel[];
  readonly  showDatePlaceholder: boolean;
  readonly  targets: TargetModel[];
}
