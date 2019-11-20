import { ActionTypes } from '../redux/actions/ActionTypes';
import RFIModel from './RFIModel';
import { postSortClick } from '../users/UserActions';
import SortClickRequestModel from '../metrics/Model/SortClickRequestModel';
import { store } from '../index';
import { RFIDeserializer } from './RFIDeserializer';

const fetchRFISuccess = (body: any) => {
  body = sortRFIs(new RFIDeserializer().deserialize(body), 'ltiov', true);

  return {
    type: ActionTypes.FETCH_RFI_SUCCESS,
    body
  }
};

export const setSort = (key: any, order: any) => {
  return {
    type: ActionTypes.SET_SORT,
    key, order
  }
};

export const newSortedRFIs = (body: RFIModel[]) => {
  return {
    type: ActionTypes.SORT_RFIS_SUCCESS,
    body
  }
};

export const fetchRFIs = () => {
  return (dispatch: any) => {
    return fetch('/api/rfis')
      .then(response => response.json())
      .then(body => dispatch(fetchRFISuccess(body)));
  }
};

export const newSort = (newSortKey: string) => {
  const items = store.getState();
  let newSortedRFIList: RFIModel[];

  let orderAscending: boolean;

  orderAscending = !(items.sortKey === newSortKey && items.orderAscending);

  newSortedRFIList = sortRFIs(items.rfis, newSortKey, orderAscending);
  postSortClick(new SortClickRequestModel(newSortKey, orderAscending));

  return (dispatch: any) => {
    dispatch(newSortedRFIs(Array.from(newSortedRFIList)));
    dispatch(setSort(newSortKey, orderAscending));
  }

};

export function sortRFIs(rfis: RFIModel[], newSortKey: string, orderAscending: boolean): RFIModel[] {

  switch (newSortKey) {
    case 'id':
      if (!orderAscending)
        return sortDescendingId();
      else
        return sortAscendingId();
    case 'country':
      if (!orderAscending)
        return sortDescendingCountry();
      else
        return sortAscendingCountry();
    case 'ltiov':
      if (!orderAscending)
        return sortDescendingLtiov();
      else
        return sortAscendingLtiov();
    case 'lastUpdate':
      if (!orderAscending)
        return sortDescendingLastUpdate();
      else
        return sortAscendingLastUpdate();
    case 'unit':
      if (!orderAscending)
        return sortDescendingUnit();
      else
        return sortAscendingUnit();
    default:
      return rfis;
  }

  function sortAscendingId() {
    return rfis.sort(function (a, b) {
      return a.id < b.id ? -1 : 1
    });
  }

  function sortDescendingId() {
    return rfis.sort(function (a, b) {
      return a.id > b.id ? -1 : 1
    });
  }

  function sortDescendingCountry() {
    return rfis.sort(function (a, b) {
      return a.country > b.country ? -1 : 1
    });
  }

  function sortAscendingCountry() {
    return rfis.sort(function (a, b) {
      return a.country < b.country ? -1 : 1
    });
  }

  function sortDescendingLtiov() {
    return rfis.sort(function (a, b) {
      if (a.ltiov === 0)
        return -1;
      if (b.ltiov === 0)
        return 1;
      return a.ltiov > b.ltiov ? -1 : 1
    });
  }

  function sortAscendingLtiov() {
    return rfis.sort(function (a, b) {
      if (a.ltiov === 0)
        return 1;
      if (b.ltiov === 0)
        return -1;
      return a.ltiov < b.ltiov ? -1 : 1
    });
  }

  function sortDescendingLastUpdate() {
    return rfis.sort(function (a, b) {
      return a.lastUpdate > b.lastUpdate ? -1 : 1
    });
  }

  function sortAscendingLastUpdate() {
    return rfis.sort(function (a, b) {
      return a.lastUpdate < b.lastUpdate ? -1 : 1
    });
  }

  function sortDescendingUnit() {
    return rfis.sort(function (a, b) {
      return a.unit > b.unit ? -1 : 1
    })
  }

  function sortAscendingUnit() {
    return rfis.sort(function (a, b) {
      return a.unit < b.unit ? -1 : 1
    })
  }

}

