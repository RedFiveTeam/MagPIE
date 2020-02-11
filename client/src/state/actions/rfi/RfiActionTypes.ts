import RfiModel from '../../../workflow/rfi-page/models/RfiModel';
import { SortKeyModel } from '../../../workflow/rfi-page/models/SortKeyModel';

export enum RfiActionTypes {
  FETCH_RFI_PENDING = 'FETCH_RFI_PENDING',
  FETCH_RFI_SUCCESS = 'FETCH_RFI_SUCCESS',
  FETCH_RFI_UPDATE = 'FETCH_RFI_UPDATE',
  SORT_RFIS = 'SORT_RFIS',
  REPRIORITIZE_RFIS = 'REPRIORITIZE_RFIS'
}

export interface RfiState {
  readonly rfis: RfiModel[];
  readonly sortKey: SortKeyModel,
  readonly pendingRfis: RfiModel[],
  readonly openRfis: RfiModel[],
  readonly closedRfis: RfiModel[],
  readonly loading: boolean,
}
