import RFIModel, { RFIStatus } from './RFIModel';
import moment from 'moment';
import { RFISorter } from './RFISorter';
import { Field, SortKey } from './SortKey';

describe('RFISorter', () => {
  let rfiList: RFIModel[];

  beforeEach(() => {
    rfiList = [
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX')
    ];
  });

  it('should sort by RFI ID ascending and descending', () => {
    expect(RFISorter.sortById(rfiList, new SortKey(Field.ID, false))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
    ]);
    expect(RFISorter.sortById(rfiList, new SortKey(Field.ID, true))).toEqual([
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
    ]);
    expect(RFISorter.sortById(rfiList, new SortKey(Field.LTIOV, false))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
    ]);
  });

  it('should sort by RFI customer ascending and descending', () => {
    expect(RFISorter.sortByCustomer(rfiList, new SortKey(Field.CUSTOMER, false))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
    ]);
    expect(RFISorter.sortByCustomer(rfiList, new SortKey(Field.CUSTOMER, true))).toEqual([
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
    ]);
    expect(RFISorter.sortByCustomer(rfiList, new SortKey(Field.ID, true))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
    ]);
  });

  it('should sort by Country ascending and descending', () => {
    expect(RFISorter.sortByCountry(rfiList, new SortKey(Field.COUNTRY, false))).toEqual([
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
    ]);
    expect(RFISorter.sortByCountry(rfiList, new SortKey(Field.COUNTRY, true))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
    ]);
    expect(RFISorter.sortByCountry(rfiList, new SortKey(Field.ID, false))).toEqual([
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
    ]);
  });

  it('should sort by Ltiov ascending and descending', () => {
    expect(RFISorter.sortByLtiov(rfiList, new SortKey(Field.LTIOV, false))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
    ]);
    expect(RFISorter.sortByLtiov(rfiList, new SortKey(Field.LTIOV, true))).toEqual([
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
    ]);
    expect(RFISorter.sortByLtiov(rfiList, new SortKey(Field.ID, true))).toEqual([
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
    ]);
  });
});
