import { ActionTypes } from '../actions/ActionTypes';
import RFIModel, { RFIStatus } from '../../rm-dashboard/RFIModel';
import reducer from './reducer';
import moment from 'moment';
import { Field, SortKey } from '../../rm-dashboard/SortKey';

describe('reducer', () => {
  let singleStatusRfiList: RFIModel[];
  let multiStatusRfiList: RFIModel[];
  let sortedById: RFIModel[];
  let reverseById: RFIModel[];
  let sortedByCustomer: RFIModel[];
  let reverseByCustomer: RFIModel[];
  let sortedByCountry: RFIModel[];
  let reverseByCountry: RFIModel[];
  let sortedByLtiov: RFIModel[];
  let reverseByLtiov: RFIModel[];

  let pendingRfi1: RFIModel;
  let pendingRfi2: RFIModel;
  let openRfi1: RFIModel;
  let openRfi2: RFIModel;
  let closedRfi1: RFIModel;

  beforeEach(() => {
    pendingRfi1 = new RFIModel('19-003', '', RFIStatus.PENDING, 'HQ ACC', undefined, 'MEX');
    pendingRfi2 = new RFIModel('19-004', '', RFIStatus.PENDING, '633 ABW', moment('2019-12-02').utc(), 'ALB');
    openRfi1 = new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA');
    openRfi2 = new RFIModel('19-002', '', RFIStatus.OPEN, '2 FW', moment('2019-12-03').utc(), 'JAP');
    closedRfi1 = new RFIModel('19-005', '', RFIStatus.CLOSED, '733 ABW', moment('2019-12-04').utc(), 'CAN');

    sortedById = [openRfi1, openRfi2, pendingRfi1, pendingRfi2, closedRfi1];
    reverseById = [closedRfi1, pendingRfi2, pendingRfi1, openRfi2, openRfi1];
    sortedByCustomer = [openRfi1, openRfi2, pendingRfi2, closedRfi1, pendingRfi1];
    reverseByCustomer =  [pendingRfi1, closedRfi1, pendingRfi2, openRfi2, openRfi1];
    sortedByCountry = [pendingRfi2, closedRfi1, openRfi2, pendingRfi1, openRfi1];
    reverseByCountry = [openRfi1, pendingRfi1, openRfi2, closedRfi1, pendingRfi2];
    sortedByLtiov = [openRfi1, pendingRfi2, openRfi2, closedRfi1, pendingRfi1];
    reverseByLtiov =[pendingRfi1, closedRfi1, openRfi2, pendingRfi2, openRfi1];

    singleStatusRfiList = [
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX')
    ];
    multiStatusRfiList = [openRfi2, openRfi1, pendingRfi2, closedRfi1, pendingRfi1,];
  });

  it('should handle FETCH_SUCCESS', () => {
    let mockAction = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      body: singleStatusRfiList
    };

    let sortedRfis = [
      new RFIModel('19-001', '', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA'),
      new RFIModel('19-004', '', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN'),
      new RFIModel('19-003', '', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX'),
    ];
    expect(
      reducer(undefined, mockAction)
    ).toEqual({
      rfis: sortedRfis,
      sortKey: new SortKey(Field.LTIOV, true),
      pendingRfis: [],
      openRfis: sortedRfis,
      closedRfis: []
    });
  });

  it('should sort by id and flip the sort key', () => {
    let setupRfis = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      body: multiStatusRfiList
    };
    let state = reducer(undefined, setupRfis);
    let sortAction = {type: ActionTypes.SORT_RFIS_BY_ID};

    state = reducer(state, sortAction);

    expect(state.rfis).toEqual(sortedById);
    expect(state.pendingRfis).toEqual([pendingRfi1, pendingRfi2]);
    expect(state.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKey(Field.ID, true));

    state = reducer(state, sortAction);
    expect(state.rfis).toEqual(reverseById);
    expect(state.sortKey).toEqual(new SortKey(Field.ID, false));
  });

  it('should sort by customer and flip the sort key', () => {
    let setupRfis = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      body: multiStatusRfiList
    };
    let state = reducer(undefined, setupRfis);
    let sortAction = {type: ActionTypes.SORT_RFIS_BY_CUSTOMER};

    state = reducer(state, sortAction);

    expect(state.rfis).toEqual(sortedByCustomer);
    expect(state.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKey(Field.CUSTOMER, true));

    state = reducer(state, sortAction);
    expect(state.rfis).toEqual(reverseByCustomer);
    expect(state.sortKey).toEqual(new SortKey(Field.CUSTOMER, false));
  });

  it('should sort by country and flip the sort key', () => {
    let setupRfis = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      body: multiStatusRfiList
    };
    let state = reducer(undefined, setupRfis);
    let sortAction = {type: ActionTypes.SORT_RFIS_BY_COUNTRY};

    state = reducer(state, sortAction);

    expect(state.rfis).toEqual(sortedByCountry);
    expect(state.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.openRfis).toEqual([openRfi2, openRfi1]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKey(Field.COUNTRY, true));

    state = reducer(state, sortAction);
    expect(state.rfis).toEqual(reverseByCountry);
    expect(state.sortKey).toEqual(new SortKey(Field.COUNTRY, false));
  });

  it('should sort by ltiov and flip the sort key', () => {
    let setupRfis = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      body: multiStatusRfiList
    };
    let state = reducer(undefined, setupRfis);
    expect(state.rfis).toEqual(sortedByLtiov);
    expect(state.pendingRfis).toEqual([pendingRfi2, pendingRfi1]);
    expect(state.openRfis).toEqual([openRfi1, openRfi2]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKey(Field.LTIOV, true));

    let sortAction = {type: ActionTypes.SORT_RFIS_BY_LTIOV};

    state = reducer(state, sortAction);

    expect(state.rfis).toEqual(reverseByLtiov);
    expect(state.pendingRfis).toEqual([pendingRfi1, pendingRfi2]);
    expect(state.openRfis).toEqual([openRfi2, openRfi1]);
    expect(state.closedRfis).toEqual([closedRfi1]);
    expect(state.sortKey).toEqual(new SortKey(Field.LTIOV, false));
  });

  it('should filter pending RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      body: multiStatusRfiList
    };

    let pendingRfis = reducer(undefined, fetchRfisAction).pendingRfis;

    expect(pendingRfis.length).toBe(2);
    expect(pendingRfis).toContain(pendingRfi1);
    expect(pendingRfis).toContain(pendingRfi2);
  });

  it('should filter open RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      body: multiStatusRfiList
    };

    let openRfis = reducer(undefined, fetchRfisAction).openRfis;

    expect(openRfis.length).toBe(2);
    expect(openRfis).toContain(openRfi1);
    expect(openRfis).toContain(openRfi2);
  });

  it('should filter closed RFIs from total RFI list', () => {
    let fetchRfisAction = {
      type: ActionTypes.FETCH_RFI_SUCCESS,
      body: multiStatusRfiList
    };

    let closedRfis = reducer(undefined, fetchRfisAction).closedRfis;

    expect(closedRfis.length).toBe(1);
    expect(closedRfis).toContain(closedRfi1);
  });
});
