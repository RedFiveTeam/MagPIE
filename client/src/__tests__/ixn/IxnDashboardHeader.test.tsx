import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { IxnDashboardHeader } from '../../dashboard/ixn/IxnDashboardHeader';
import { TargetModel, TargetStatus } from '../../store/tgt/TargetModel';

describe("Interactions Header", () => {
  let subject: ShallowWrapper;
  let target = new TargetModel(1, 1, 1, 'SDT20-123', '00ABC1234567890', 'These are some EEI Notes to be displayed.', '',
                               TargetStatus.NOT_STARTED, '', '');
  let exitSpy: jest.Mock;
  let showRollupSpy: jest.Mock;

  console.log = jest.fn();

  beforeEach(() => {
   exitSpy = jest.fn();
   showRollupSpy = jest.fn();
    subject = shallow(
      <IxnDashboardHeader
        target={target}
        exitIxnPage={exitSpy}
        dateString={"08/14/2020"}
        disableButtons={false}
        disableEeiButton={false}
        disableRollupButton={false}
        showRollup={showRollupSpy}
        displayEeiNotes={false}
        toggleDisplayEeiNotes={jest.fn()}
        disableAddSegment={false}
        setAddSegment={jest.fn()}
        displaySegmentHelperText={false}
      />
    );
  });

  it('should display the MGRS', () => {
    expect(subject.find('.ixn-dash--header--mgrs').text()).toContain("MGRS: 00ABC1234567890");
  });

  it('should display the date in MM/DD/YYYY format', () => {
    expect(subject.find('.ixn-dash--header--date').text()).toContain("08/14/2020");
  });

  it('should display the export rollups button and execute the callback on click when not disabled', () => {
    subject.find('.rollup-button').simulate('click');
    subject = shallow(
      <IxnDashboardHeader
        target={target}
        exitIxnPage={exitSpy}
        dateString={"08/14/2020"}
        disableButtons={true}
        disableEeiButton={false}
        disableRollupButton={true}
        showRollup={showRollupSpy}
        displayEeiNotes={false}
        toggleDisplayEeiNotes={jest.fn()}
        disableAddSegment={false}
        setAddSegment={jest.fn()}
        displaySegmentHelperText={false}
      />
    );
    subject.find('.rollup-button').simulate('click');
    expect(showRollupSpy).toHaveBeenCalledTimes(1);
  });
});
