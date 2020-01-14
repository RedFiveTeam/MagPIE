import { MetricsActionTypes } from './metrics/MetricsActionTypes';
import { RfiActionTypes } from './rfi/RfiActionTypes';
import { CoiActionTypes } from './coi/CoiActionTypes';

export const ActionTypes = {...RfiActionTypes, ...MetricsActionTypes, ...CoiActionTypes};
