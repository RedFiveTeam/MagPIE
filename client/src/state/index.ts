import { TgtState } from './actions/tgt/TgtActionTypes';
import { tgtReducer } from './reducers/tgtReducer';
import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import { RfiState } from './actions/rfi/RfiActionTypes';
import { rfiReducer } from './reducers/rfiReducer';
import { MetricState } from './actions/metrics/MetricsActionTypes';
import { metricsReducer } from './reducers/metricsReducer';
import { ixnReducer } from './reducers/ixnReducer';
import { IxnState } from './actions/ixn/IxnActionTypes';

export interface ApplicationState {
  tgts: TgtState;
  rfis: RfiState;
  ixns: IxnState;
  metrics: MetricState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    tgts: tgtReducer,
    rfis: rfiReducer,
    ixns: ixnReducer,
    metrics: metricsReducer,
    router: connectRouter(history),
  });
