import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import { TargetModel, TargetStatus } from '../../store/tgt/TargetModel';
import {
  exitTgtPage,
  fetchDatesAndTargetsSuccess,
  setDatePlaceholder, TgtActionTypes, truncateAndConvertDateToUtc,
  updateExploitDateSuccess,
  updateTgtSuccess
} from '../../store/tgt';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';


describe("Tgt actions tests", ()=>{
  const moment = require('moment');
  let rfi: RfiModel = new RfiModel(1, '19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2, 0, 0);
  let exploitDate: ExploitDateModel = new ExploitDateModel(3, 1, moment("Apr 4 19 00:00:00", "MMM DD YY hh:mm:ss").utc());
  console.log = jest.fn();

  it('should return a proper NAVIGATE_TO_TGT_PAGE or RELOAD_TGT_PAGE action object', () => {
    let action: any = fetchDatesAndTargetsSuccess(rfi, [], [], true);
    expect(action).toEqual({
      type: TgtActionTypes.NAVIGATE_TO_TGT_PAGE,
      rfi: rfi,
      exploitDates: [],
      targets: []
    });

    action = fetchDatesAndTargetsSuccess(rfi, [], [], false);
    expect(action).toEqual({
      type: TgtActionTypes.RELOAD_TGT_PAGE,
      exploitDates: [],
      targets: []
    });
  });

  it('should return a proper EXIT_TGT_PAGE action object', () => {
    let action: any = exitTgtPage();
    expect(action.type).toEqual(TgtActionTypes.EXIT_TGT_PAGE);
    expect(action.viewTgtPage).toEqual(false);
  });

  it('should return a proper UPDATE_RFI_DATE object', () => {
    let action: any = updateExploitDateSuccess([exploitDate]);
    expect(action.type).toEqual(TgtActionTypes.UPDATE_EXPLOIT_DATE);
    expect(action.exploitDates).toEqual([exploitDate]);
  });

  it('should return a proper SHOW_DATE_PLACEHOLDER object', () => {
    let action: any = setDatePlaceholder(true);
    expect(action.type).toEqual(TgtActionTypes.SHOW_DATE_PLACEHOLDER);
    expect(action.showDatePlaceholder).toEqual(true);
  });

  it('should take a rando date and convert it to a truncated UTC date', () => {
    let date = new Date(moment("Apr 4 19 05:06:07", "MMM DD YY hh:mm:ss").unix() * 1000);
    expect(truncateAndConvertDateToUtc(date)).toEqual(new Date(moment("Apr 4 19 00:00:00", "MMM DD YY hh:mm:ss").utc()));
  });

  it('should return a proper UPDATE_TGT_SUCCESS action object', () => {
    let tgt = new TargetModel(1, 1, 1, 'SDT12-123', '12QWE1231231231', '', '', TargetStatus.NOT_STARTED, '', '');
    let action: any = updateTgtSuccess([tgt]);
    expect(action).toEqual({
      type: TgtActionTypes.UPDATE_TGT_SUCCESS,
      targets: [tgt]
    });
  });

  //TODO: figure out testing dispatched functions

  // it('should return a proper exploit date on exploit date update', () => {
  //   fetch.mockResponse(JSON.stringify({newExploitDate: "2020-11-18T00:00:00.000+0000", rfiId: 5})).resolves;
  //
  //   let date: Date = new Date(moment('2019-12-01').unix() * 1000);
  //   let returnedDate: any = navigateToTgtPage(rfi);
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
