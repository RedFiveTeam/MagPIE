import RfiModel from './RfiModel';
import { SortKeyModel } from '../sort/SortKeyModel';

export enum RfiActionTypes {
  FETCH_RFI_PENDING = 'FETCH_RFI_PENDING',
  FETCH_RFI_SUCCESS = 'FETCH_RFI_SUCCESS',
  FETCH_RFI_UPDATE = 'FETCH_RFI_UPDATE',
  SORT_RFIS = 'SORT_RFIS',
  REPRIORITIZE_RFIS = 'REPRIORITIZE_RFIS',
  LOAD_SUCCESS = 'LOAD_SUCCESS',
}

export interface RfiState {
  readonly rfis: RfiModel[];
  readonly sortKey: SortKeyModel,
  readonly pendingRfis: RfiModel[],
  readonly openRfis: RfiModel[],
  readonly closedRfis: RfiModel[],
  readonly loading: boolean,
}
