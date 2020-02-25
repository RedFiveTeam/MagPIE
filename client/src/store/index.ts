import { TgtState } from './tgt';
import { tgtReducer } from './tgt/Reducer';
import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import { RfiState } from './rfi';
import { rfiReducer } from './rfi/Reducer';
import { MetricState } from './metrics';
import { metricsReducer } from './metrics/Reducer';
import { ixnReducer } from './ixn/Reducer';
import { IxnState } from './ixn';

export interface ApplicationState {
  tgtState: TgtState;
  rfiState: RfiState;
  ixnState: IxnState;
  metricState: MetricState;
  router: RouterState | undefined;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    tgtState: tgtReducer,
    rfiState: rfiReducer,
    ixnState: ixnReducer,
    metricState: metricsReducer,
    router: connectRouter(history),
  });