import { TargetModel } from '../../workflow/tgt-page/models/TargetModel';
import { ActionTypes } from '../../state/actions/ActionTypes';
import { exitIxnPage, navigateToIxnPage } from '../../state/actions/ixn/IxnActions';

describe('IXN Actions', () => {
  let target = new TargetModel("SDT20-00123", 1, "TGT20-123", "00ABC1234567890", "", "");

  it('should return a proper navigate to ixn page object', () => {
    let action: any = navigateToIxnPage(target);
    expect(action.type).toEqual(ActionTypes.NAVIGATE_TO_IXN_PAGE);
    expect(action.target).toEqual(target);
  });

  it('should return a proper exit ixn page object', () => {
    let action: any = exitIxnPage();
    expect(action.type).toEqual(ActionTypes.EXIT_IXN_PAGE);
  });

});
