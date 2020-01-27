import { combineReducers } from 'redux'
import rfiReducer from './rfiReducer';
import metricsReducer from './metricsReducer';
import tgtReducer from './tgtReducer';

const reducer = combineReducers({
  rfiReducer,
  metricsReducer,
  tgtReducer
});

export default reducer;
