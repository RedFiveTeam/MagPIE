import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as moment from 'moment';
import { reorderRfis } from '../../store/rfi/Thunks';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { RfiSorter } from '../../store/rfi/RfiSorter';

const fetch = require('jest-fetch-mock');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('RfiActions', () => {
  it('should re-prioritize RFIs based on a drag and drop priority change', () => {
    //Ignore .catch() logs
    console.log = jest.fn();

    let rfi1 = new RfiModel(1, '19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 1, 0, 0);
    let rfi2 = new RfiModel(2, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2, 0, 0);
    let rfi3 = new RfiModel(3, '19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3, 0, 0);
    let rfi4 = new RfiModel(4, '19-007', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 4, 0, 0);
    let rfi5 = new RfiModel(5, '19-009', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 5, 0, 0);

    let rfiList = [rfi1, rfi2, rfi3, rfi4, rfi5];

    let reprioritizedList;

    const store = mockStore({openRfis: rfiList});

    //Mock response from backend as successful reprioritization
    // @ts-ignore
    fetch.mockResponse(JSON.stringify({PromiseValue: true})).resolves;

    // @ts-ignore
    store.dispatch(reorderRfis(rfiList, '19-004', 2));
    // @ts-ignore
    reprioritizedList = RfiSorter.sort(store.getState().openRfis, new SortKeyModel(Field.PRIORITY, true));
    expect(reprioritizedList).toEqual([rfi1, rfi3, rfi2, rfi4, rfi5]);

    // @ts-ignore
    store.dispatch(reorderRfis(reprioritizedList, '19-007', 2));

    // @ts-ignore
    reprioritizedList = RfiSorter.sort(store.getState().openRfis, new SortKeyModel(Field.PRIORITY, true));
    expect(reprioritizedList).toEqual([rfi1, rfi3, rfi4, rfi2, rfi5]);

    // @ts-ignore
    store.dispatch(reorderRfis(reprioritizedList, '19-009', 2));
    // @ts-ignore
    reprioritizedList = RfiSorter.sort(store.getState().openRfis, new SortKeyModel(Field.PRIORITY, true));
    expect(reprioritizedList).toEqual([rfi1, rfi3, rfi5, rfi4, rfi2]);

    // @ts-ignore
    store.dispatch(reorderRfis(reprioritizedList, '19-001', 2));
    // @ts-ignore
    reprioritizedList = RfiSorter.sort(store.getState().openRfis, new SortKeyModel(Field.PRIORITY, true));
    expect(reprioritizedList).toEqual([rfi3, rfi5, rfi1, rfi4, rfi2]);



  });
});
