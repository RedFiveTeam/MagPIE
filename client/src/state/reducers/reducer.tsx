import { combineReducers } from 'redux'
import rfiReducer from './rfiReducer';
import metricsReducer from './metricsReducer';
import coiReducer from './coiReducer';

const reducer = combineReducers({
  rfiReducer,
  metricsReducer,
  coiReducer
});

export default reducer;
