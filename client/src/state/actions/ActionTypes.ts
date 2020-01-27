import { MetricsActionTypes } from './metrics/MetricsActionTypes';
import { RfiActionTypes } from './rfi/RfiActionTypes';
import { TgtActionTypes } from './tgt/TgtActionTypes';

export const ActionTypes = {...RfiActionTypes, ...MetricsActionTypes, ...TgtActionTypes};
