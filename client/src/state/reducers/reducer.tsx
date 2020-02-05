import { combineReducers } from 'redux'
import rfiReducer from './rfiReducer';
import metricsReducer from './metricsReducer';
import tgtReducer from './tgtReducer';
import ixnReducer from './ixnReducer';

const reducer = combineReducers({
  rfiReducer,
  metricsReducer,
  tgtReducer,
  ixnReducer
});

export default reducer;
