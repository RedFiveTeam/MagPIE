import RFIModel, { RFIStatus } from './RFIModel';
import moment from 'moment';
import { RFISorter } from './RFISorter';
import { Field, SortKey } from './SortKey';

describe('RFISorter', () => {
  let rfiList: RFIModel[];

  beforeEach(() => {
    rfiList = [
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi')
    ];
  });

  it('should sort by RFI ID ascending and descending', () => {
    expect(RFISorter.sortById(rfiList, new SortKey(Field.ID, false))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
    ]);
    expect(RFISorter.sortById(rfiList, new SortKey(Field.ID, true))).toEqual([
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
    ]);
    expect(RFISorter.sortById(rfiList, new SortKey(Field.LTIOV, false))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
    ]);
  });

  it('should sort by RFI customer ascending and descending', () => {
    expect(RFISorter.sortByCustomer(rfiList, new SortKey(Field.CUSTOMER, false))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
    ]);
    expect(RFISorter.sortByCustomer(rfiList, new SortKey(Field.CUSTOMER, true))).toEqual([
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
    ]);
    expect(RFISorter.sortByCustomer(rfiList, new SortKey(Field.ID, true))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
    ]);
  });

  it('should sort by Country ascending and descending', () => {
    expect(RFISorter.sortByCountry(rfiList, new SortKey(Field.COUNTRY, false))).toEqual([
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
    ]);
    expect(RFISorter.sortByCountry(rfiList, new SortKey(Field.COUNTRY, true))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
    ]);
    expect(RFISorter.sortByCountry(rfiList, new SortKey(Field.ID, false))).toEqual([
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
    ]);
  });

  it('should sort by Ltiov ascending and descending', () => {
    expect(RFISorter.sortByLtiov(rfiList, new SortKey(Field.LTIOV, false))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
    ]);
    expect(RFISorter.sortByLtiov(rfiList, new SortKey(Field.LTIOV, true))).toEqual([
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
    ]);
    expect(RFISorter.sortByLtiov(rfiList, new SortKey(Field.ID, true))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi'),
    ]);
  });
});
