import '../../setupEnzyme';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { IxnDashboardHeader } from '../../dashboard/ixn/IxnDashboardHeader';
import { TargetModel, TargetStatus } from '../../store/tgt/TargetModel';

describe("Interactions Header", () => {
  let subject: ShallowWrapper;
  let target = new TargetModel(1, 1, 1, 'SDT20-123', '00ABC1234567890', 'These are some EEI Notes to be displayed.', '', TargetStatus.NOT_STARTED, '');
  let exitSpy: jest.Mock;

  beforeEach(() => {
   exitSpy = jest.fn();
    subject = shallow(
      <IxnDashboardHeader
        target={target}
        exitIxnPage={exitSpy}
        dateString={"08/14/2020"}
        disableRollupButton={false}
        showRollup={jest.fn()}
      />
    );
  });

  it('should display the TGT number', () => {
    expect(subject.text()).toContain("TGT: SDT20-123");
  });

  it('should display the MGRS', () => {
    expect(subject.find('.ixn-dash--header--mgrs').text()).toContain("MGRS: 00ABC1234567890");
  });

  it('should display EEI Notes', () => {
    expect(subject.find('.ixn-dash--header--notes').text()).toContain("EEI Notes: These are some EEI Notes to be " +
      "displayed.");
  });

  it('should display the date in MM/DD/YYYY format', () => {
    expect(subject.find('.ixn-dash--header--date').text()).toContain("08/14/2020");
  });

});
