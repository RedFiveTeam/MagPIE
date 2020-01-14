import { combineReducers } from 'redux'
import rfiReducer from './rfiReducer';
import metricsReducer from './metricsReducer';

const reducer = combineReducers({
  rfiReducer,
  metricsReducer
});

export default reducer;