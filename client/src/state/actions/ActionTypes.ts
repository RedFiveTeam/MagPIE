import { MetricsActionTypes } from './metrics/MetricsActionTypes';
import { RfiActionTypes } from './rfi/RfiActionTypes';
import { TgtActionTypes } from './tgt/TgtActionTypes';
import { IxnActionTypes } from './ixn/IxnActionTypes';

export const ActionTypes = {...RfiActionTypes, ...MetricsActionTypes, ...TgtActionTypes, ...IxnActionTypes};
