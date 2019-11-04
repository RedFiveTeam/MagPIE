import reducer from './reducer';
import { ActionTypes } from '../actions/ActionTypes';
import RFIModel from '../../rm-dashboard/RFIModel';

describe('reducer reducer', () => {
  it('should handle FETCH_SUCCESS', () => {
    let rfiList: RFIModel[] = [
      new RFIModel('1', '1'),
      new RFIModel('2', '2')
    ];

    let mockAction = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      body: [
        {
          rfiId: '1',
          getsUrl: '1'
        },
        {
          rfiId: '2',
          getsUrl: '2'
        }
      ]
    };

    expect(
      reducer([], mockAction)
    ).toEqual({
      rfis: rfiList
    });
  });
});
