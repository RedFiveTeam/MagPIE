
import { IxnActionTypes } from '../../store/ixn';
import { TargetModel } from '../../store/tgt/TargetModel';
import { exitIxnPage, loadIxnPage } from '../../store/ixn';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';


describe('IXN Actions', () => {
  const moment = require('moment');
  let target = new TargetModel(1, 1, 1, "TGT20-123", "00ABC1234567890", "", "");
  let segments = [
    new SegmentModel(1, 1, 1, 1, moment(123), moment(456)),
    new SegmentModel(2, 1, 1, 1, moment(567), moment(678))
  ];

  it('should return a proper navigate to ixn page object', () => {
    let action: any = loadIxnPage(target, '11/14/2020', segments);
    expect(action).toEqual({
      type: IxnActionTypes.NAVIGATE_TO_IXN_PAGE,
      target: target,
      dateString: '11/14/2020',
      segments: segments
    });

    action = loadIxnPage(null, null, segments);
    expect(action).toEqual({
      type: IxnActionTypes.RELOAD_IXN_PAGE,
      segments: segments
    });

  });

  it('should return a proper exit ixn page object', () => {
    let action: any = exitIxnPage();
    expect(action.type).toEqual(IxnActionTypes.EXIT_IXN_PAGE);
  });

});
