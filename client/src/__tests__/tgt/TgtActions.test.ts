import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import { ActionTypes } from '../../state/actions/ActionTypes';
import { exitTgtPage, fetchDatesAndTargetsSuccess, updateTgtSuccess } from '../../state/actions';
import { TargetModel } from '../../workflow/tgt-page/models/TargetModel';

describe("Tgt actions tests", ()=>{
  const moment = require('moment');
  let rfi: RfiModel = new RfiModel(1, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2);
  console.log = jest.fn();

  it('should return a proper NAVIGATE_TO_TGT_PAGE or RELOAD_TGT_PAGE action object', () => {
    let action: any = fetchDatesAndTargetsSuccess(rfi, [], [], true);
    expect(action).toEqual({
      type: ActionTypes.NAVIGATE_TO_TGT_PAGE,
      rfi: rfi,
      exploitDates: [],
      targets: []
    });

    action = fetchDatesAndTargetsSuccess(rfi, [], [], false);
    expect(action).toEqual({
      type: ActionTypes.RELOAD_TGT_PAGE,
      exploitDates: [],
      targets: []
    });
  });

  it('should return a proper EXIT_TGT_PAGE action object', () => {
    let action: any = exitTgtPage();
    expect(action.type).toEqual(ActionTypes.EXIT_TGT_PAGE);
    expect(action.viewTgtPage).toEqual(false);
  });

  it('should return a proper UPDATE_TGT_SUCCESS action object', () => {
    let tgt = new TargetModel(1, 1, 1, "SDT12-123", "12QWE1231231231", "", "");
    let action: any = updateTgtSuccess([tgt]);
    expect(action).toEqual({
      type: ActionTypes.UPDATE_TGT_SUCCESS,
      targets: [tgt]
    });
  });


  //TODO: figure out testing dispatched functions

  // it('should return a proper exploit date on exploit date update', () => {
  //   fetch.mockResponse(JSON.stringify({exploitDate: "2020-11-18T00:00:00.000+0000", rfiId: 5})).resolves;
  //
  //   let date: Date = new Date(moment('2019-12-01').unix() * 1000);
  //   let returnedDate: any = loadTgtPage(rfi);
  //   console.log(returnedDate);
  //   returnedDate().then(response => console.log('response is ' + response));
  //
  //   let state;
  //   returnedDate().then(response => state = reducer(undefined, response));
  //   console.log(state);
  //
  //   const store = mockStore(tgtReducer);
  //   store.dispatch(returnedDate);
  //
  //
  //   expect(store.getState().tgtReducer.dates[0].isSame(moment.utc('2020-11-18'), 'second')).toBeTruthy()
  // });

});
