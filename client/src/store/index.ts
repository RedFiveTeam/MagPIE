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
import { ScoiState } from './scoi/Types';
import { scoiReducer } from './scoi/Reducer';

export interface ApplicationState {
  tgtState: TgtState;
  rfiState: RfiState;
  ixnState: IxnState;
  metricState: MetricState;
  scoiState: ScoiState;
  router: RouterState | undefined;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    tgtState: tgtReducer,
    rfiState: rfiReducer,
    ixnState: ixnReducer,
    metricState: metricsReducer,
    scoiState: scoiReducer,
    router: connectRouter(history),
  });
