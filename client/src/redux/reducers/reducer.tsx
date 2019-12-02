import { ActionTypes } from '../actions/ActionTypes';
import RFIModel, { RFIStatus } from '../../rm-dashboard/RFIModel';
import { RFISorter } from '../../rm-dashboard/RFISorter';
import { Field, SortKey } from '../../rm-dashboard/SortKey';

const initState = {
  rfis: [] as RFIModel[],
  sortKey: new SortKey(Field.LTIOV, false),
  pendingRfis: [] as RFIModel[],
  openRfis: [] as RFIModel[],
  closedRfis: [] as RFIModel[]
};

function flipSortKey(sortKey: SortKey, field: Field) {
  return new SortKey(
    field,
    sortKey.field === field ? !sortKey.defaultOrder : true
  );
}

function filterRfisByStatus(rfis: RFIModel[], status: RFIStatus) {
  return rfis.filter((rfi) => rfi.status === status);
}

function filterRfis(sortedRfis: RFIModel[]) {
  return {
    pendingRfis: filterRfisByStatus(sortedRfis, RFIStatus.PENDING),
    openRfis: filterRfisByStatus(sortedRfis, RFIStatus.OPEN),
    closedRfis: filterRfisByStatus(sortedRfis, RFIStatus.CLOSED),
  }
}

const reducer = (state = initState, action: any) => {
  let sortedRfis: RFIModel[];

  switch (action.type) {
    case ActionTypes.FETCH_RFI_SUCCESS:
      sortedRfis = RFISorter.sortByLtiov(action.body, state.sortKey);
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        sortKey: new SortKey(Field.LTIOV, true)
      };
    case ActionTypes.FETCH_SITE_VISITS_SUCCESS:
      return {...state, siteVisits: action.body};
    case ActionTypes.FETCH_GETS_CLICKS_SUCCESS:
      return {...state, GETSClicks: action.body};
    case ActionTypes.SORT_RFIS_BY_ID:
      sortedRfis = RFISorter.sortById(state.rfis, state.sortKey);
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        sortKey: flipSortKey(state.sortKey, Field.ID)
      };
    case ActionTypes.SORT_RFIS_BY_CUSTOMER:
      sortedRfis = RFISorter.sortByCustomer(state.rfis, state.sortKey);
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: RFISorter.sortByCustomer(state.rfis, state.sortKey),
        sortKey: flipSortKey(state.sortKey, Field.CUSTOMER)
      };
    case ActionTypes.SORT_RFIS_BY_COUNTRY:
      sortedRfis = RFISorter.sortByCountry(state.rfis, state.sortKey);
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: RFISorter.sortByCountry(state.rfis, state.sortKey),
        sortKey: flipSortKey(state.sortKey, Field.COUNTRY)
      };
    case ActionTypes.SORT_RFIS_BY_LTIOV:
      sortedRfis = RFISorter.sortByLtiov(state.rfis, state.sortKey);
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: RFISorter.sortByLtiov(state.rfis, state.sortKey),
        sortKey: flipSortKey(state.sortKey, Field.LTIOV)
      };
    default:
      return state;
  }
};

export default reducer;
