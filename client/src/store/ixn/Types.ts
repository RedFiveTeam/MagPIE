import { TargetModel } from '../tgt/TargetModel';
import { SegmentModel } from '../tgtSegment/SegmentModel';

export enum IxnActionTypes {
  NAVIGATE_TO_IXN_PAGE = 'NAVIGATE_TO_IXN_PAGE',
  RELOAD_IXN_PAGE = 'RELOAD_IXN_PAGE',
  EXIT_IXN_PAGE = 'EXIT_IXN_PAGE'
}

export interface IxnState {
  readonly viewIxnPage: boolean;
  readonly target: TargetModel;
  readonly dateString: string;
  readonly segments: SegmentModel[];
}
