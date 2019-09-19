import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducer from '../reducers/reducer';


export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
