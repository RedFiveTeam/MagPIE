import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import { ActionTypes } from '../../state/actions/ActionTypes';
import { exitCoiPage, navigateToCoiPage, updateRfiDate } from '../../state/actions/coi/CoiActions';
// @ts-ignore
import moment from 'moment'

describe("COI actions tests", ()=>{
  let rfi: RfiModel = new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2);
  console.log = jest.fn();

  it('should return a proper NAVIGATE_TO_COI_PAGE action object', () => {
    let action: any = navigateToCoiPage(rfi);
    expect(action.type).toEqual(ActionTypes.NAVIGATE_TO_COI_PAGE);
    expect(action.viewCoiPage).toEqual(true);
    expect(action.rfi).toEqual(rfi);
  });

  it('should return a proper EXIT_COI_PAGE action object', () => {
    let action: any = exitCoiPage();
    expect(action.type).toEqual(ActionTypes.EXIT_COI_PAGE);
    expect(action.viewCoiPage).toEqual(false);
  });

  it('should return a proper UPDATE_RFI_DATE action object', () => {
    let date1: Date = new Date(moment('2019-12-01').unix() * 1000);
    let date2: Date = new Date(moment('2019-12-02').unix() * 1000);
    let action: any = updateRfiDate(date1, date2, rfi);

    expect(action.type).toEqual(ActionTypes.UPDATE_RFI_DATE);
    expect(action.rfi.exploitStart.isSame(moment.utc('2019-12-01'))).toBeTruthy();
    expect(action.rfi.exploitEnd.isSame(moment.utc('2019-12-02'))).toBeTruthy();
  });

});
