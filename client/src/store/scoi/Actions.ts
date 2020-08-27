import { ScoiActionTypes } from './Types';
import { ScoiModel } from './ScoiModel';

const loadScoiPageSuccess = (scois: ScoiModel[]) => {
  return {
    type: ScoiActionTypes.NAVIGATE_TO_SCOI_PAGE,
    scois: scois,
  };
};

export const loadScoiPage = () => {
  return (dispatch: any) =>
    fetch('/api/scoi/all', {method: 'get'})
      .then(response => response.json())
      .then(resJson => dispatch(loadScoiPageSuccess(resJson)))
      .catch(error => console.log('Error loading Scoi page: ' + error));
};

export const exitScoiPage = () => {
  return {
    type: ScoiActionTypes.EXIT_SCOI_PAGE,
  };
};
