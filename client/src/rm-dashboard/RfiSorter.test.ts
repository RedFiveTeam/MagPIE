import RfiModel, { RfiStatus } from './RfiModel';
import moment from 'moment';
import { RfiSorter } from './RfiSorter';
import { Field, SortKeyModel } from './SortKeyModel';

describe('RFISorter', () => {
  let rfiList: RfiModel[];

  beforeEach(() => {
    rfiList = [
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1)
    ];
  });

  it('should sort by RFI ID ascending and descending', () => {
    expect(RfiSorter.sortById(rfiList, new SortKeyModel(Field.ID, false))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
    expect(RfiSorter.sortById(rfiList, new SortKeyModel(Field.ID, true))).toEqual([
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sortById(rfiList, new SortKeyModel(Field.LTIOV, false))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
  });

  it('should sort by RFI customer ascending and descending', () => {
    expect(RfiSorter.sortByCustomer(rfiList, new SortKeyModel(Field.CUSTOMER, false))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
    expect(RfiSorter.sortByCustomer(rfiList, new SortKeyModel(Field.CUSTOMER, true))).toEqual([
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sortByCustomer(rfiList, new SortKeyModel(Field.ID, true))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
  });

  it('should sort by Country ascending and descending', () => {
    expect(RfiSorter.sortByCountry(rfiList, new SortKeyModel(Field.COUNTRY, false))).toEqual([
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sortByCountry(rfiList, new SortKeyModel(Field.COUNTRY, true))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
    expect(RfiSorter.sortByCountry(rfiList, new SortKeyModel(Field.ID, false))).toEqual([
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
  });

  it('should sort by priority ascending and descending', () => {
    expect(RfiSorter.sortByPriority(rfiList, new SortKeyModel(Field.PRIORITY, false))).toEqual([
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sortByPriority(rfiList, new SortKeyModel(Field.PRIORITY, true))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
    expect(RfiSorter.sortByPriority(rfiList, new SortKeyModel(Field.ID, false))).toEqual([
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
  });

  it('should sort by Ltiov ascending and descending', () => {
    expect(RfiSorter.sortByLtiov(rfiList, new SortKeyModel(Field.LTIOV, false))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
    expect(RfiSorter.sortByLtiov(rfiList, new SortKeyModel(Field.LTIOV, true))).toEqual([
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sortByLtiov(rfiList, new SortKeyModel(Field.ID, true))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
  });
});
