import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import { ActionTypes } from '../../state/actions/ActionTypes';
import { exitCoiPage, navigateToCoiPage } from '../../state/actions';
// @ts-ignore
import moment from 'moment'

describe("COI actions tests", ()=>{
  it('should return a proper NAVIGATE_TO_COI_PAGE action object', () => {
    let rfi: RfiModel = new RfiModel('19-004', '', RfiStatus.OPEN, '633 ABW', moment.utc('2019-12-02'), 'CAN', 'hi', 2)
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


});
