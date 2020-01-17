import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import * as moment from 'moment';
import { RfiSorter } from '../../state/utils/RfiSorter';
import { Field, SortKeyModel } from '../../workflow/rfi-page/models/SortKeyModel';

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
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.ID, true))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.ID, false))).toEqual([
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, true))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
  });

  it('should sort by RFI customer ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.CUSTOMER, true))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.CUSTOMER, false))).toEqual([
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.ID, true))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
  });

  it('should sort by Country ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.COUNTRY, true))).toEqual([
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.COUNTRY, false))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.ID, false))).toEqual([
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
  });

  it('should sort by priority ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.PRIORITY, true))).toEqual([
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.PRIORITY, false))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.ID, false))).toEqual([
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
  });

  it('should sort by Ltiov ascending and descending', () => {
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, true))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, false))).toEqual([
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
    ]);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.ID, true))).toEqual([
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
    ]);
  });

  it('should not sort closed', () => {
    rfiList = [
      new RfiModel('19-001', '', RfiStatus.CLOSED, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 3),
      new RfiModel('19-004', '', RfiStatus.CLOSED, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.CLOSED, 'HQ ACC', undefined, 'MEX', 'hi', 1)
    ];
    let rfiListOriginal: RfiModel[] = rfiList.slice(0);

    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.LTIOV, false))).toEqual(rfiListOriginal);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.ID, true))).toEqual(rfiListOriginal);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.CUSTOMER, false))).toEqual(rfiListOriginal);
    expect(RfiSorter.sort(rfiList, new SortKeyModel(Field.PRIORITY, true))).toEqual(rfiListOriginal);
  });
});
