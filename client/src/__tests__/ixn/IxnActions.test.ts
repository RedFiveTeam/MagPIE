import { TargetModel } from '../../workflow/tgt-page/models/TargetModel';
import { ActionTypes } from '../../state/actions/ActionTypes';
import { exitIxnPage, navigateToIxnPage } from '../../state/actions';

describe('IXN Actions', () => {
  let target = new TargetModel(1, 1, 1, "TGT20-123", "00ABC1234567890", "", "");

  it('should return a proper navigate to ixn page object', () => {
    let action: any = navigateToIxnPage(target, '11/14/2020');
    expect(action).toEqual({
      type: ActionTypes.NAVIGATE_TO_IXN_PAGE,
      target: target,
      dateString: '11/14/2020'
    });
  });

  it('should return a proper exit ixn page object', () => {
    let action: any = exitIxnPage();
    expect(action.type).toEqual(ActionTypes.EXIT_IXN_PAGE);
  });

});
