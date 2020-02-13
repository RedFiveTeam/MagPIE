import { TgtState } from './tgt/Types';
import { tgtReducer } from './tgt/Reducer';
import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import { RfiState } from './rfi/Types';
import { rfiReducer } from './rfi/Reducer';
import { MetricState } from './metrics/Types';
import { metricsReducer } from './metrics/Reducer';
import { ixnReducer } from './ixn/Reducer';
import { IxnState } from './ixn/Types';

export interface ApplicationState {
  tgts: TgtState;
  rfis: RfiState;
  ixns: IxnState;
  metrics: MetricState;
  router: RouterState | undefined;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    tgts: tgtReducer,
    rfis: rfiReducer,
    ixns: ixnReducer,
    metrics: metricsReducer,
    router: connectRouter(history),
  });