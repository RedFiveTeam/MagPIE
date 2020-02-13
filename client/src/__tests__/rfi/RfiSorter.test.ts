import * as moment from 'moment';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { RfiSorter } from '../../store/rfi/RfiSorter';


describe('RFISorter', () => {
  let rfiList: RfiModel[];

  beforeEach(() => {
    rfiList = [
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1)
    ];
  });

  it('should sort by RFI RFINUM ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, true))).toEqual([
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, false))).toEqual([
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, true))).toEqual([
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
  });

  it('should sort by RFI customer ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.CUSTOMER, true))).toEqual([
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.CUSTOMER, false))).toEqual([
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, true))).toEqual([
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
  });

  it('should sort by Country ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.COUNTRY, true))).toEqual([
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.COUNTRY, false))).toEqual([
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, false))).toEqual([
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
  });

  it('should sort by priority ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.PRIORITY, true))).toEqual([
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.PRIORITY, false))).toEqual([
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, false))).toEqual([
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
  });

  it('should sort by Ltiov ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, true))).toEqual([
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, false))).toEqual([
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, true))).toEqual([
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
  });

  it('should not sort closed', () => {
    rfiList = [
      new RfiModel(1, '19-001', '', RfiStatus.CLOSED, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel(2, '19-004', '', RfiStatus.CLOSED, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.CLOSED, 'HQ ACC', undefined, 'MEX', 'hi', 1)
    ];
    let rfiListOriginal: RfiModel[] = rfiList.slice(0);

    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, false))).toEqual(rfiListOriginal);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.RFINUM, true))).toEqual(rfiListOriginal);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.CUSTOMER, false))).toEqual(rfiListOriginal);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.PRIORITY, true))).toEqual(rfiListOriginal);
  });
});
