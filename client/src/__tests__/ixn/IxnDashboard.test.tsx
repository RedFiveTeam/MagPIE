import '../../setupEnzyme';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TargetModel } from '../../workflow/tgt-page/models/TargetModel';
import { IxnDashboard } from '../../workflow/ixn-page/IxnDashboard';
import { StyledIxnDashboardHeader } from '../../workflow/ixn-page/IxnDashboardHeader';

describe("Interactions Dashboard", () => {
  let subject: ShallowWrapper;
  let target = new TargetModel(1, 1, 1, "SDT20-123", "00ABC1234567890", "These are some EEI Notes to be displayed.", "");

  beforeEach(() => {
    subject = shallow(
      <IxnDashboard
        target={target}
      />
    );
  });

  it('should display the header', () => {
    expect(subject.find(StyledIxnDashboardHeader).exists()).toBeTruthy();
  });

});
