import '../../setupEnzyme';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TargetModel } from '../../workflow/tgt-page/models/TargetModel';
import { IxnDashboard } from '../../workflow/ixn-page/IxnDashboard';

describe("Interactions Dashbaord", () => {
  let subject: ShallowWrapper;
  let target = new TargetModel("SDT20-00123", 1, "TGT20-123", "00ABC1234567890", "", "");

  beforeEach(() => {

    subject = shallow(
      <IxnDashboard
        target={target}
        exitIxnPage={() => {}}
      />
    );
  });

  it('should display the TGT number', () => {
    expect(subject.text()).toContain("TGT20-123");
  });

  it('should display a back button', () => {
    expect(subject.find('.ixn-dash--header--back-button').exists()).toBeTruthy();
  });

});
