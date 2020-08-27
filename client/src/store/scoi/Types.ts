import { ScoiModel } from './ScoiModel';

export enum ScoiActionTypes {
  NAVIGATE_TO_SCOI_PAGE = 'NAVIGATE_SCOI_PAGE',
  EXIT_SCOI_PAGE = 'EXIT_SCOI_PAGE'
}

export interface ScoiState {
  readonly viewScoiPage: boolean;
  readonly scois: ScoiModel[];
}
