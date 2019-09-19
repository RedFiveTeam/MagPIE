import reducer from './reducer';
import { ActionTypes } from '../actions/ActionTypes';

describe('reducer reducer', () => {
  it('should return initial state', () => {
    expect(
      reducer(undefined, {}).fact
    ).toBe('');
  });

  it('should handle FETCH_PENDING', () => {
    let mockAction = {
      type: ActionTypes.FETCH_PENDING,
      pending: true
    };
    expect(
      reducer(undefined, mockAction).pending
    ).toBe(true);
  });

  it('should handle FETCH_SUCCESS', () => {
    let mockAction = {
      type: ActionTypes.FETCH_FACT_SUCCESS,
      data: 'You are awesome!'
    };
    expect(
      reducer(undefined, mockAction).fact
    ).toEqual('You are awesome!');
  });

/*  it('should handle FETCH_ERROR', () => {
    let mockAction = {
      type: ActionTypes.FETCH_FACT_ERROR,
      error: 'Could not retrieve a fact!'
    };
    expect(
      reducer(undefined, mockAction).error
    ).toEqual('Could not retrieve a fact!');
  });*/
});
