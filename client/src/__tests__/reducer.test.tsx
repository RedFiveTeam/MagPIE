import 'isomorphic-fetch';
import { Field, SortKeyModel } from '../store/sort/SortKeyModel';
import { TargetModel } from '../store/tgt/TargetModel';
import { ExploitDateModel } from '../store/tgt/ExploitDateModel';
import RfiModel, { RfiStatus } from '../store/rfi/RfiModel';
import { RfiActionTypes, rfiReducer } from '../store/rfi';
import { TgtActionTypes, tgtReducer } from '../store/tgt';
import { ixnReducer } from '../store/ixn/Reducer';
import { IxnActionTypes } from '../store/ixn';
import { SegmentModel } from '../store/tgtSegment/SegmentModel';
import IxnModel from '../store/ixn/IxnModel';

const moment = require('moment');


describe('reducer', () => {
  let singleStatusRfiList: RfiModel[];
  let multiStatusRfiList: RfiModel[];
  let sortedById: RfiModel[];
  let reverseById: RfiModel[];
  let sortedByCustomer: RfiModel[];
  let reverseByCustomer: RfiModel[];
  let sortedByCountry: RfiModel[];
  let reverseByCountry: RfiModel[];
  let sortedByLtiov: RfiModel[];
  let reverseByLtiov: RfiModel[];

  let pendingRfi1: RfiModel;
  let pendingRfi2: RfiModel;
  let openRfi1: RfiModel;
  let openRfi2: RfiModel;
  let closedRfi1: RfiModel;

  //Ignore .catch() logs
  console.log = jest.fn();

  beforeEach(() => {
    pendingRfi1 = new RfiModel(1, '19-003', '', RfiStatus.PENDING, 'HQ ACC', undefined, 'MEX', 'hi', -1);
    pendingRfi2 = new RfiModel(2, '19-004', '', RfiStatus.PENDING, '633 ABW', moment.utc('2019-12-02'), 'ALB', 'hi', -1);
    openRfi1 = new RfiModel(3, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', -1);
    openRfi2 = new RfiModel(4, '19-002', '', RfiStatus.OPEN, '2 FW', moment.utc('2019-12-03'), 'JAP', 'hi', -1);
    closedRfi1 = new RfiModel(5, '19-005', '', RfiStatus.CLOSED, '733 ABW', moment.utc('2019-12-04'), 'CAN', 'hi', -1);

    sortedById = [openRfi1, openRfi2, pendingRfi1, pendingRfi2, closedRfi1];
    reverseById = [pendingRfi2, pendingRfi1, openRfi2, openRfi1, closedRfi1];
    sortedByCustomer = [openRfi1, openRfi2, pendingRfi2, pendingRfi1, closedRfi1];
    reverseByCustomer = [pendingRfi1, pendingRfi2, openRfi2, openRfi1, closedRfi1];
    sortedByCountry = [pendingRfi2, openRfi2, pendingRfi1, openRfi1, closedRfi1];
    reverseByCountry = [openRfi1, pendingRfi1, openRfi2, pendingRfi2, closedRfi1];
    sortedByLtiov = [openRfi1, pendingRfi2, openRfi2, pendingRfi1, closedRfi1];
    reverseByLtiov = [pendingRfi1, openRfi2, pendingRfi2, openRfi1, closedRfi1];

    singleStatusRfiList = [
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3)
    ];
    multiStatusRfiList = [openRfi2, openRfi1, pendingRfi2, closedRfi1, pendingRfi1,];
  });

  afterEach(() => {
    const check = () => {
      setTimeout(check, 2000); // check again in a second
    };
    check();

  });

  it('should handle FETCH_PENDING', () => {
    let mockAction = {
      type: RfiActionTypes.FETCH_RFI_PENDING
    };

    expect(
      rfiReducer(undefined, mockAction)
    ).toEqual({
      rfis: [],
      sortKey: new SortKeyModel(Field.PRIORITY, true),
      pendingRfis: [],
      openRfis: [],
      closedRfis: [],
      loading: true
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    let mockAction = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: singleStatusRfiList,
    };

    let sortedRfis = [
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1),
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3),
    ];

    expect(
      rfiReducer(undefined, mockAction)
    ).toEqual({
      rfis: sortedRfis,
      sortKey: new SortKeyModel(Field.PRIORITY, true),
      pendingRfis: [],
      openRfis: sortedRfis,
      closedRfis: [],
      loading: false
    });
  });

  it('should handle NAVIGATE_TO_TGT_PAGE', () => {
    let rfi: RfiModel = new RfiModel(1, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1);
    let mockAction = {
      type: TgtActionTypes.NAVIGATE_TO_TGT_PAGE,
      rfi: rfi,
      exploitDates: [],
      targets: []
    };

    expect(
      tgtReducer(undefined, mockAction)
    ).toEqual({
      viewTgtPage: true,
      showDatePlaceholder: false,
      rfi: rfi,
      exploitDates: [],
      targets: []
    });
  });

  it('should sort by rfiNum and flip the sort key', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };
    let state = rfiReducer(undefined, setupRfis);
    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.RFINUM};

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(sortedById);
    expect(state.pendingRfis).toEqual([pendingRfi1, pendingRfi2]);
    expect(state.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.RFINUM, true));

    state = rfiReducer(state, sortAction);
    expect(state.rfis).toEqual(reverseById);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.RFINUM, false));
  });

  it('should sort by customer and flip the sort key', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };
    let state = rfiReducer(undefined, setupRfis);
    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.CUSTOMER};

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(sortedByCustomer);
    expect(state.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.CUSTOMER, true));

    state = rfiReducer(state, sortAction);
    expect(state.rfis).toEqual(reverseByCustomer);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.CUSTOMER, false));
  });

  it('should sort by country and flip the sort key', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };
    let state = rfiReducer(undefined, setupRfis);
    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.COUNTRY};

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(sortedByCountry);
    expect(state.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.openRfis).toEqual([openRfi2, openRfi1]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.COUNTRY, true));

    state = rfiReducer(state, sortAction);
    expect(state.rfis).toEqual(reverseByCountry);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.COUNTRY, false));
  });

  it('should sort by ltiov and flip the sort key', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };

    let state = rfiReducer(undefined, setupRfis);
    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.LTIOV};

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(sortedByLtiov);
    expect(state.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.LTIOV, true));

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(reverseByLtiov);
    expect(state.pendingRfis).toEqual([pendingRfi1, pendingRfi2]);
    expect(state.openRfis).toEqual([openRfi2, openRfi1]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.LTIOV, false));
  });

  it('should sort by priority and flip the sort key', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: singleStatusRfiList
    };

    let sortedRfis = [
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1),
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3),
    ];

    let reverseRfis = [
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3),
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1),
    ];

    let state = rfiReducer(undefined, setupRfis);
    expect(state.rfis).toEqual(sortedRfis);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.PRIORITY, true));

    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.PRIORITY};

    state = rfiReducer(state, sortAction);

    expect(state.rfis).toEqual(reverseRfis);
    expect(state.sortKey).toEqual(new SortKeyModel(Field.PRIORITY, false));

  });

  it('should filter pending RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };

    let pendingRfis = rfiReducer(undefined, fetchRfisAction).pendingRfis;

    expect(pendingRfis.length).toBe(2);
    expect(pendingRfis).toContain(pendingRfi1);
    expect(pendingRfis).toContain(pendingRfi2);
  });

  it('should filter open RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };

    let openRfis = rfiReducer(undefined, fetchRfisAction).openRfis;

    expect(openRfis.length).toBe(2);
    expect(openRfis).toContain(openRfi1);
    expect(openRfis).toContain(openRfi2);
  });

  it('should filter closed RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };

    let closedRfis = rfiReducer(undefined, fetchRfisAction).closedRfis;

    expect(closedRfis.length).toBe(1);
    expect(closedRfis).toContain(closedRfi1);
  });

  it('should handle FETCH_UPDATE', () => {
    let setupRfis = {
      type: RfiActionTypes.FETCH_RFI_SUCCESS,
      rfis: singleStatusRfiList
    };
    let state = rfiReducer(undefined, setupRfis);

    //Priority update
    let newSingleStatusRfis = [
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 3),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1)
    ];

    //Sort bt LTIOV; should stay sorted after update
    let sortAction = {type: RfiActionTypes.SORT_RFIS, field: Field.LTIOV};
    state = rfiReducer(state, sortAction);

    let refreshRfis = {
      type: RfiActionTypes.FETCH_RFI_UPDATE,
      rfis: newSingleStatusRfis,
    };

    let sortedRfis = [
      new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 3),
      new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ];

    expect(
      rfiReducer(state, refreshRfis)
    ).toEqual({
      rfis: sortedRfis,
      sortKey: new SortKeyModel(Field.LTIOV, true),
      pendingRfis: [],
      openRfis: sortedRfis,
      closedRfis: [],
      loading: false
    });
  });

  it('should handle loadIxnPage', () => {
    let target = new TargetModel(1, 1, 1, 'TGT20-123', '00ABC1234567890', '', '');
    let segments = [
      new SegmentModel(1, 1, 1, 1, moment(123), moment(456)),
      new SegmentModel(2, 1, 1, 1, moment(567), moment(678))
    ];
    let ixns = [
      new IxnModel(1, 1, 1, 1, 1, "Billy Bob", moment(124), "People have done a thing", "123-234"),
      new IxnModel(1, 1, 1, 1, 2, "Billy Bob", moment(568), "People have done another thing", "123-456"),
    ];

    let navToIxnPage = {
      type: IxnActionTypes.NAVIGATE_TO_IXN_PAGE,
      target: target,
      segments: segments,
      dateString: '11/14/2020',
      ixns: ixns
    };

    let state = ixnReducer(undefined, navToIxnPage);

    expect(state)
      .toEqual({
        viewIxnPage: true,
        target: target,
        segments: segments,
        dateString: '11/14/2020',
        ixns: ixns,
      });

    let newSegments = [
      new SegmentModel(1, 1, 1, 1, moment(123), moment(456)),
      new SegmentModel(2, 1, 1, 1, moment(678), moment(789))
    ];

    let newIxns = [
      new IxnModel(1, 1, 1, 1, 1, "Billy Bob", moment(124), "People have done a thing", "123-234"),
      new IxnModel(1, 1, 1, 1, 2, "Billy Bob", moment(568), "People have done another thing", "123-456"),
      new IxnModel(1, 1, 1, 1, 2, "Billy Bob", moment(569), "People have done a different thing", "123-456"),
    ];

    let reloadIxnPage = {
      type: IxnActionTypes.RELOAD_IXN_PAGE,
      segments: newSegments,
      ixns: newIxns
    };

    state = ixnReducer(state, reloadIxnPage);

    expect(state)
      .toEqual({
        viewIxnPage: true,
        target: target,
        segments: newSegments,
        dateString: '11/14/2020',
        ixns: newIxns,
      });
  });

  it('should handle EXIT_IXN_PAGE', () => {
    let target = new TargetModel(1, 1, 1, 'TGT20-123', '00ABC1234567890', '', '');
    let navToIxnPage = {
      type: IxnActionTypes.NAVIGATE_TO_IXN_PAGE,
      target: target,
      dateString: '11/11/2011',
      segments: [],
      ixns: []
    };

    let state = ixnReducer(undefined, navToIxnPage);
    let exitIxnPage = {
      type: IxnActionTypes.EXIT_IXN_PAGE,
    };

    state = ixnReducer(state, exitIxnPage);

    expect(state)
      .toEqual({
        viewIxnPage: false,
        target: target,
        dateString: '11/11/2011',
        segments: [],
        ixns: [],
      });
  });

  it('should handle UPDATE_TGT_SUCCESS', () => {
    let rfi: RfiModel = new RfiModel(1, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1);
    let exploitDate : ExploitDateModel = new ExploitDateModel(1, 1, moment.utc('2019-11-02'));
    let target = new TargetModel(1, 1, 1, 'TGT20-123', '00ABC1234567890', '', '');
    let navToTgtPage = {
      type: TgtActionTypes.NAVIGATE_TO_TGT_PAGE,
      viewTgtPage: true,
      rfi: rfi,
      exploitDates: [exploitDate],
      targets: [target]
    };
    let state = tgtReducer(undefined, navToTgtPage);

    let deleteTgt = {
      type: TgtActionTypes.UPDATE_TGT_SUCCESS,
      targets: []
    };

    state = tgtReducer(state, deleteTgt);

    expect(state).toEqual(
      {
        viewTgtPage: true,
        showDatePlaceholder: false,
        rfi: rfi,
        exploitDates: [exploitDate],
        targets: []
      }
    )
  });

  //TODO
  // it('should post sort click metric', () => {
  //
  //   jest.mock('');
  //   let postSortClickSpy: jest.Mock = jest.fn();
  //
  //
  //   let setupRfis = {
  //     type: ActionTypes.FETCH_RFI_SUCCESS,
  //     rfi: multiStatusRfiList
  //   };
  //   let state = reducer(undefined, setupRfis);
  //
  //   let sortAction = {type: ActionTypes.SORT_RFIS_BY_LTIOV};
  //
  //   state = reducer(state, sortAction);
  //
  //   expect(postSortClickSpy).toHaveBeenCalled();
  //   expect(postSortClickSpy).toHaveBeenCalledWith(Field.LTIOV, false);
  //
  // });
});
