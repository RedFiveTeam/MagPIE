import { TargetModel } from '../tgt/TargetModel';
import { SegmentModel } from '../tgtSegment/SegmentModel';
import IxnModel from './IxnModel';

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
  readonly ixns: IxnModel[];
  readonly autofocus: boolean;
}
