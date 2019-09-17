import reducer from './reducer';
import { ActionTypes } from '../actions/ActionTypes';

describe('reducer reducer', () => {
  it('should handle initial state', () => {
    expect(
      reducer(undefined, {}).title
    ).toBe('');
  });

  it('should handle update title', () => {
    let mockAction = {
      type: ActionTypes.UPDATE_TITLE,
      event: {target: {value: 'updatedTitle'}}
    };
    expect(
      reducer(undefined, mockAction).title
    ).toBe('updatedTitle');
  });
});