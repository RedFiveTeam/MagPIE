import { Field, SortKeyModel } from '../sort/SortKeyModel';
import RfiModel, { RfiStatus } from './RfiModel';
import { RfiActionTypes } from './Types';
import { RfiSorter } from './RfiSorter';
import SortClickRequestModel from '../metrics/SortClickRequestModel';

import { RfiState } from './Types';
import { Reducer } from 'redux';
import { postSortClick } from '../metrics';

const initState: RfiState = {
  rfis: [] as RfiModel[],
  sortKey: new SortKeyModel(Field.PRIORITY, true),
  pendingRfis: [] as RfiModel[],
  openRfis: [] as RfiModel[],
  closedRfis: [] as RfiModel[],
  loading: true,
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

const reducer: Reducer<RfiState> = (state = initState, action: any) => {
  let sortedRfis: RfiModel[];
  let newSortKey: SortKeyModel;

  switch (action.type) {
    case RfiActionTypes.FETCH_RFI_PENDING:
      return {...state, loading: true};
    case RfiActionTypes.FETCH_RFI_SUCCESS:
      sortedRfis = RfiSorter.sort(action.rfis, initState.sortKey);
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        loading: false
      };
    case RfiActionTypes.FETCH_RFI_UPDATE:
      sortedRfis = RfiSorter.sort(action.rfis, state.sortKey);
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        loading: false
      };
    case RfiActionTypes.REPRIORITIZE_RFIS:
      let newRfis: RfiModel[] = [].concat(action.reprioritizedList);
      newRfis = newRfis.concat(state.pendingRfis);
      newRfis = newRfis.concat(state.closedRfis);
      return {
        ...state,
        rfis: newRfis,
        openRfis: action.reprioritizedList,
      };
    case RfiActionTypes.SORT_RFIS:
      newSortKey = flipSortKey(state.sortKey, action.field);
      sortedRfis = RfiSorter.sort(state.rfis, newSortKey);
      postSortClick(new SortClickRequestModel(newSortKey.field, newSortKey.defaultOrder));
      return {
        ...state,
        ...filterRfis(sortedRfis),
        rfis: sortedRfis,
        sortKey: newSortKey,
      };
    default:
      return {...state};
  }
};

export {reducer as rfiReducer};
export { initState as rfiInitState };