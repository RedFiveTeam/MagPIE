import { Field, SortKeyModel } from '../../workflow/rfi-page/models/SortKeyModel';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import { ActionTypes } from '../actions/ActionTypes';
import { RfiSorter } from '../utils/RfiSorter';
import SortClickRequestModel from '../../metrics/models/SortClickRequestModel';
import { postSortClick } from '../actions/metrics/LogMetricsActions';

const initState = {
  rfis: [] as RfiModel[],
  sortKey: new SortKeyModel(Field.PRIORITY, true),
  pendingRfis: [] as RfiModel[],
  openRfis: [] as RfiModel[],
  closedRfis: [] as RfiModel[],
  loading: true
};

function flipSortKey(sortKey: SortKeyModel, field: Field) {
  return new SortKeyModel(
    field,
    sortKey.field === field ? !sortKey.defaultOrder : true
  );
}

function filterRfisByStatus(rfis: RfiModel[], status: RfiStatus) {
  return rfis.filter((rfi: RfiModel) => rfi.status === status);
}

function filterRfis(sortedRfis: RfiModel[]) {
  return {
    pendingRfis: filterRfisByStatus(sortedRfis, RfiStatus.PENDING),
    openRfis: filterRfisByStatus(sortedRfis, RfiStatus.OPEN),
    closedRfis: filterRfisByStatus(sortedRfis, RfiStatus.CLOSED),
  }
}

const rfiReducer = (state = initState, action: any) => {
  let sortedRfis: RfiModel[];
  let newSortKey: SortKeyModel;

  switch (action.type) {
    case ActionTypes.FETCH_RFI_PENDING:
      return {...state, loading: true};
    case ActionTypes.FETCH_RFI_SUCCESS:
      sortedRfis = RfiSorter.sortByPriority(action.body, new SortKeyModel(Field.PRIORITY, false));
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        sortKey: new SortKeyModel(Field.PRIORITY, true),
        loading: false
      };
    case ActionTypes.REPRIORITIZE_RFIS:
      let newRfis: RfiModel[] = [].concat(action.reprioritizedList);
      console.log(action.reprioritizedList);
      newRfis = newRfis.concat(state.pendingRfis);
      newRfis = newRfis.concat(state.closedRfis);
      return {
        ...state,
        rfis: newRfis,
        openRfis: action.reprioritizedList,
      };
    case ActionTypes.SORT_RFIS_BY_PRIORITY:
      sortedRfis = RfiSorter.sortByPriority(state.rfis, state.sortKey);
      newSortKey = flipSortKey(state.sortKey, Field.PRIORITY);
      postSortClick(new SortClickRequestModel(newSortKey.field, newSortKey.defaultOrder));
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        sortKey: newSortKey
      };
    case ActionTypes.SORT_RFIS_BY_ID:
      sortedRfis = RfiSorter.sortById(state.rfis, state.sortKey);
      newSortKey = flipSortKey(state.sortKey, Field.ID);
      postSortClick(new SortClickRequestModel(newSortKey.field, newSortKey.defaultOrder));
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        sortKey: newSortKey
      };
    case ActionTypes.SORT_RFIS_BY_CUSTOMER:
      sortedRfis = RfiSorter.sortByCustomer(state.rfis, state.sortKey);
      newSortKey = flipSortKey(state.sortKey, Field.CUSTOMER);
      postSortClick(new SortClickRequestModel(newSortKey.field, newSortKey.defaultOrder));
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: RfiSorter.sortByCustomer(state.rfis, state.sortKey),
        sortKey: newSortKey
      };
    case ActionTypes.SORT_RFIS_BY_COUNTRY:
      sortedRfis = RfiSorter.sortByCountry(state.rfis, state.sortKey);
      newSortKey = flipSortKey(state.sortKey, Field.COUNTRY);
      postSortClick(new SortClickRequestModel(newSortKey.field, newSortKey.defaultOrder));
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: RfiSorter.sortByCountry(state.rfis, state.sortKey),
        sortKey: newSortKey
      };
    case ActionTypes.SORT_RFIS_BY_LTIOV:
      sortedRfis = RfiSorter.sortByLtiov(state.rfis, state.sortKey);
      newSortKey = flipSortKey(state.sortKey, Field.LTIOV);
      postSortClick(new SortClickRequestModel(newSortKey.field, newSortKey.defaultOrder));
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: RfiSorter.sortByLtiov(state.rfis, state.sortKey),
        sortKey: newSortKey
      };
    default:
      return {...state};
  }
};

export default rfiReducer;
