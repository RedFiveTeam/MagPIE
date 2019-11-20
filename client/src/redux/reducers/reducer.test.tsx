import { ActionTypes } from '../actions/ActionTypes';
import RFIModel from '../../rm-dashboard/RFIModel';
import reducer from './reducer';

describe('reducer reducer', () => {

  let rfiList: RFIModel[];

  beforeEach(() => {
    rfiList = [
      new RFIModel('19-001', '', 'OPEN', 1, '1 FW', 2, 'USA'),
      new RFIModel('19-002', '', 'OPEN', 2, '633 ABW', 3, 'CAN'),
      new RFIModel('19-003', '', 'OPEN', 3, 'HQ ACC', 0, 'MEX')
    ];
  });

  it('should handle FETCH_SUCCESS', () => {

    let mockAction = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      body: [
        new RFIModel('19-001', '', 'OPEN', 1, '1 FW', 2, 'USA'),
        new RFIModel('19-002', '', 'OPEN', 2, '633 ABW', 3, 'CAN'),
        new RFIModel('19-003', '', 'OPEN', 3, 'HQ ACC', 0, 'MEX')
      ]
    };

    expect(
      reducer({rfis: [], sortKey: 'ltiov', orderAscending: true}, mockAction)
    ).toEqual({
      rfis: rfiList,
      sortKey: 'ltiov',
      orderAscending: true
    });
  });

});
