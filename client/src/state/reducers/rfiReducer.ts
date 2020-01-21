import { Field, SortKeyModel } from '../../workflow/rfi-page/models/SortKeyModel';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import { ActionTypes } from '../actions/ActionTypes';
import { RfiSorter } from '../utils/RfiSorter';
import SortClickRequestModel from '../../metrics/models/SortClickRequestModel';
import { postSortClick } from '../actions';

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
      sortedRfis = RfiSorter.sort(action.rfis, initState.sortKey);
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        loading: false
      };
    case ActionTypes.FETCH_RFI_UPDATE:
      sortedRfis = RfiSorter.sort(action.rfis, state.sortKey);
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        loading: false
      };
    case ActionTypes.REPRIORITIZE_RFIS:
      let newRfis: RfiModel[] = [].concat(action.reprioritizedList);
      newRfis = newRfis.concat(state.pendingRfis);
      newRfis = newRfis.concat(state.closedRfis);
      return {
        ...state,
        rfis: newRfis,
        openRfis: action.reprioritizedList,
      };
    case ActionTypes.SORT_RFIS:
      newSortKey = flipSortKey(state.sortKey, action.field);
      sortedRfis = RfiSorter.sort(state.rfis, newSortKey);
      postSortClick(new SortClickRequestModel(newSortKey.field, newSortKey.defaultOrder))
        .catch((reason => {console.log("Failed to post sort click metric: " + reason)}));
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        sortKey: newSortKey
      };
    default:
      return {...state};
  }
};

export default rfiReducer;
