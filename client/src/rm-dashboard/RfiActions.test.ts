import RFIModel, { RFIStatus } from './RFIModel';
import moment from 'moment';
import { reorderRfis } from './RFIActions';

describe('RfiActions', () => {
  it('should re-prioritize RFIs based on a drag and drop priority change', () => {
    let rfi1 = new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 1);
    let rfi2 = new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2);
    let rfi3 = new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3);
    let rfi4 = new RFIModel('19-007', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 4);
    let rfi5 = new RFIModel('19-009', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 5);

    let rfiList = [rfi1, rfi2, rfi3, rfi4, rfi5];

    let reprioritizedList = reorderRfis(rfiList, '19-004', 2).reprioritizedList;

    expect(reprioritizedList).toEqual([rfi1, rfi3, rfi2, rfi4, rfi5]);

    reprioritizedList = reorderRfis(reprioritizedList, '19-007', 2).reprioritizedList;

    expect(reprioritizedList).toEqual([rfi1, rfi3, rfi4, rfi2, rfi5]);

    reprioritizedList = reorderRfis(reprioritizedList, '19-009', 2).reprioritizedList;

    expect(reprioritizedList).toEqual([rfi1, rfi3, rfi5, rfi4, rfi2]);

    reprioritizedList = reorderRfis(reprioritizedList, '19-001', 2).reprioritizedList;

    expect(reprioritizedList).toEqual([rfi3, rfi5, rfi1, rfi4, rfi2]);

  });
});