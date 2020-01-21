import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import { reorderRfis } from '../../state/actions';
// @ts-ignore
import fetch from 'jest-fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Field, SortKeyModel } from '../../workflow/rfi-page/models/SortKeyModel';
import { RfiSorter } from '../../state/utils/RfiSorter';
import * as moment from 'moment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('RfiActions', () => {
  it('should re-prioritize RFIs based on a drag and drop priority change', () => {
    let rfi1 = new RfiModel('19-001', '', RfiStatus.OPEN, '1 FW', moment.utc('2019-12-01'), 'USA', 'hi', 1);
    let rfi2 = new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2);
    let rfi3 = new RfiModel('19-003', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 3);
    let rfi4 = new RfiModel('19-007', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 4);
    let rfi5 = new RfiModel('19-009', '', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', 5);

    let rfiList = [rfi1, rfi2, rfi3, rfi4, rfi5];

    let reprioritizedList;

    const store = mockStore({openRfis: rfiList});

    //Mock response from backend as successful reprioritization
    // @ts-ignore
    fetch.mockResponse(JSON.stringify({PromiseValue: true}));

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
