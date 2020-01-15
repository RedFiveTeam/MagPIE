import { ActionTypes } from '../state/actions/ActionTypes';
import RfiModel, { RfiStatus } from '../workflow/rfi-page/models/RfiModel';
import reducer from '../state/reducers/reducer';
import * as moment from 'moment';
import { Field, SortKeyModel } from '../workflow/rfi-page/models/SortKeyModel';

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

  beforeEach(() => {
    pendingRfi1 = new RfiModel('19-003', '', RfiStatus.PENDING, 'HQ ACC', undefined, 'MEX', 'hi', -1);
    pendingRfi2 = new RfiModel('19-004', '', RfiStatus.PENDING, '633 ABW', moment.utc('2019-12-02'), 'ALB', 'hi', -1);
    openRfi1 = new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', -1);
    openRfi2 = new RfiModel('19-002', '', RfiStatus.OPEN, '2 FW', moment.utc('2019-12-03'), 'JAP', 'hi', -1);
    closedRfi1 = new RfiModel('19-005', '', RfiStatus.CLOSED, '733 ABW', moment.utc('2019-12-04'), 'CAN', 'hi', -1);

    sortedById = [openRfi1, openRfi2, pendingRfi1, pendingRfi2, closedRfi1];
    reverseById = [closedRfi1, pendingRfi2, pendingRfi1, openRfi2, openRfi1];
    sortedByCustomer = [openRfi1, openRfi2, pendingRfi2, closedRfi1, pendingRfi1];
    reverseByCustomer =  [pendingRfi1, closedRfi1, pendingRfi2, openRfi2, openRfi1];
    sortedByCountry = [pendingRfi2, closedRfi1, openRfi2, pendingRfi1, openRfi1];
    reverseByCountry = [openRfi1, pendingRfi1, openRfi2, closedRfi1, pendingRfi2];
    sortedByLtiov = [openRfi1, pendingRfi2, openRfi2, closedRfi1, pendingRfi1];
    reverseByLtiov =[pendingRfi1, closedRfi1, openRfi2, pendingRfi2, openRfi1];

    singleStatusRfiList = [
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3)
    ];
    multiStatusRfiList = [openRfi2, openRfi1, pendingRfi2, closedRfi1, pendingRfi1,];
  });

  it('should handle FETCH_PENDING', () => {
    let mockAction = {
      type: ActionTypes.FETCH_RFI_PENDING
    };

    expect(
      reducer(undefined, mockAction).rfiReducer
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
      type: ActionTypes.FETCH_RFI_SUCCESS,
      rfis: singleStatusRfiList,
    };

    let sortedRfis = [
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3),
    ];

    expect(
      reducer(undefined, mockAction).rfiReducer
    ).toEqual({
      rfis: sortedRfis,
      sortKey: new SortKeyModel(Field.PRIORITY, true),
      pendingRfis: [],
      openRfis: sortedRfis,
      closedRfis: [],
      loading: false
    });
  });

  it('should handle NAVIGATE_TO_COI_PAGE', () => {
    let rfi: RfiModel = new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1);
    let mockAction = {
      type: ActionTypes.NAVIGATE_TO_COI_PAGE,
      viewCoiPage: true,
      rfi: rfi
    };

    expect(
      reducer(undefined, mockAction).coiReducer
    ).toEqual({
      viewCoiPage: true,
      rfi: rfi
    });
  });

  it('should sort by id and flip the sort key', () => {
    let setupRfis = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };
    let state = reducer(undefined, setupRfis);
    let sortAction = {type: ActionTypes.SORT_RFIS, field: Field.ID};

    state = reducer(state, sortAction);

    expect(state.rfiReducer.rfis).toEqual(sortedById);
    expect(state.rfiReducer.pendingRfis).toEqual([pendingRfi1, pendingRfi2]);
    expect(state.rfiReducer.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.rfiReducer.closedRfis).toEqual([closedRfi1]);
    expect(state.rfiReducer.sortKey).toEqual(new SortKeyModel(Field.ID, true));

    state = reducer(state, sortAction);
    expect(state.rfiReducer.rfis).toEqual(reverseById);
    expect(state.rfiReducer.sortKey).toEqual(new SortKeyModel(Field.ID, false));
  });

  it('should sort by customer and flip the sort key', () => {
    let setupRfis = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };
    let state = reducer(undefined, setupRfis);
    let sortAction = {type: ActionTypes.SORT_RFIS, field: Field.CUSTOMER};

    state = reducer(state, sortAction);

    expect(state.rfiReducer.rfis).toEqual(sortedByCustomer);
    expect(state.rfiReducer.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.rfiReducer.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.rfiReducer.closedRfis).toEqual([closedRfi1]);
    expect(state.rfiReducer.sortKey).toEqual(new SortKeyModel(Field.CUSTOMER, true));

    state = reducer(state, sortAction);
    expect(state.rfiReducer.rfis).toEqual(reverseByCustomer);
    expect(state.rfiReducer.sortKey).toEqual(new SortKeyModel(Field.CUSTOMER, false));
  });

  it('should sort by country and flip the sort key', () => {
    let setupRfis = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };
    let state = reducer(undefined, setupRfis);
    let sortAction = {type: ActionTypes.SORT_RFIS, field: Field.COUNTRY};

    state = reducer(state, sortAction);

    expect(state.rfiReducer.rfis).toEqual(sortedByCountry);
    expect(state.rfiReducer.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.rfiReducer.openRfis).toEqual([openRfi2, openRfi1]);
    expect(state.rfiReducer.closedRfis).toEqual([closedRfi1]);
    expect(state.rfiReducer.sortKey).toEqual(new SortKeyModel(Field.COUNTRY, true));

    state = reducer(state, sortAction);
    expect(state.rfiReducer.rfis).toEqual(reverseByCountry);
    expect(state.rfiReducer.sortKey).toEqual(new SortKeyModel(Field.COUNTRY, false));
  });

  it('should sort by ltiov and flip the sort key', () => {
    let setupRfis = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };

    let state = reducer(undefined, setupRfis);
    let sortAction = {type: ActionTypes.SORT_RFIS, field: Field.LTIOV};

    state = reducer(state, sortAction);

    expect(state.rfiReducer.rfis).toEqual(sortedByLtiov);
    expect(state.rfiReducer.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.rfiReducer.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.rfiReducer.closedRfis).toEqual([closedRfi1]);
    expect(state.rfiReducer.sortKey).toEqual(new SortKeyModel(Field.LTIOV, true));

    state = reducer(state, sortAction);

    expect(state.rfiReducer.rfis).toEqual(reverseByLtiov);
    expect(state.rfiReducer.pendingRfis).toEqual([pendingRfi1, pendingRfi2]);
    expect(state.rfiReducer.openRfis).toEqual([openRfi2, openRfi1]);
    expect(state.rfiReducer.closedRfis).toEqual([closedRfi1]);
    expect(state.rfiReducer.sortKey).toEqual(new SortKeyModel(Field.LTIOV, false));
  });

  it('should sort by priority and flip the sort key', () => {
    let setupRfis = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      rfis: singleStatusRfiList
    };

    let sortedRfis = [
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3),
    ];

    let reverseRfis = [
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3),
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 1),
    ];

    let state = reducer(undefined, setupRfis);
    expect(state.rfiReducer.rfis).toEqual(sortedRfis);
    expect(state.rfiReducer.sortKey).toEqual(new SortKeyModel(Field.PRIORITY, true));

    let sortAction = {type: ActionTypes.SORT_RFIS, field: Field.PRIORITY};

    state = reducer(state, sortAction);

    expect(state.rfiReducer.rfis).toEqual(reverseRfis);
    expect(state.rfiReducer.sortKey).toEqual(new SortKeyModel(Field.PRIORITY, false));

  });

  it('should filter pending RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };

    let pendingRfis = reducer(undefined, fetchRfisAction).rfiReducer.pendingRfis;

    expect(pendingRfis.length).toBe(2);
    expect(pendingRfis).toContain(pendingRfi1);
    expect(pendingRfis).toContain(pendingRfi2);
  });

  it('should filter open RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };

    let openRfis = reducer(undefined, fetchRfisAction).rfiReducer.openRfis;

    expect(openRfis.length).toBe(2);
    expect(openRfis).toContain(openRfi1);
    expect(openRfis).toContain(openRfi2);
  });

  it('should filter closed RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      rfis: multiStatusRfiList
    };

    let closedRfis = reducer(undefined, fetchRfisAction).rfiReducer.closedRfis;

    expect(closedRfis.length).toBe(1);
    expect(closedRfis).toContain(closedRfi1);
  });

  it('should handle FETCH_UPDATE', () => {
    let setupRfis = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      rfis:singleStatusRfiList
    };
    let state = reducer(undefined, setupRfis);

    //Priority update
    let newSingleStatusRfis = [
        new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
        new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 3),
        new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1)
      ];

    //Sort bt LTIOV; should stay sorted after update
    let sortAction = {type: ActionTypes.SORT_RFIS, field: Field.LTIOV};
    state = reducer(state, sortAction);

    let refreshRfis = {
      type: ActionTypes.FETCH_RFI_UPDATE,
      rfis: newSingleStatusRfis,
    };

    let sortedRfis = [
      new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 2),
      new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 3),
      new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 1),
    ];

    expect(
      reducer(state, refreshRfis).rfiReducer
    ).toEqual({
      rfis: sortedRfis,
      sortKey: new SortKeyModel(Field.LTIOV, true),
      pendingRfis: [],
      openRfis: sortedRfis,
      closedRfis: [],
      loading: false
    });

  });

  //TODO
  // it('should post sort click metrics', () => {
  //
  //   jest.mock('');
  //   let postSortClickSpy: jest.Mock = jest.fn();
  //
  //
  //   let setupRfis = {
  //     type: ActionTypes.FETCH_RFI_SUCCESS,
  //     rfis: multiStatusRfiList
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
