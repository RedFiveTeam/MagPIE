import { TgtDashboard } from '../../workflow/tgt-page/TgtDashboard';
import '../../setupEnzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import * as React from 'react';
import { ExploitDateModel } from '../../workflow/tgt-page/models/ExploitDateModel';
import { StyledTgtTable } from '../../workflow/tgt-page/tgtTable/TgtTable';

describe('TgtDashboardContainer', () => {
  let subject: ShallowWrapper;
  const moment = require('moment');
  let rfiTest: RfiModel;
  let exitSpy: jest.Mock;
  let updateSpy: jest.Mock;
  let setPlaceholderSpy: jest.Mock;

  beforeEach(() => {
    exitSpy = jest.fn();
    updateSpy = jest.fn();
    setPlaceholderSpy = jest.fn();
    rfiTest = new RfiModel(1, "DGS-SPC-2035-02335", "www.spacejam.com", RfiStatus.OPEN, "space forse",
      moment('2019-11-20').utc(), "USLT", "Good morning starshine, the earth says hello", 42);
    subject = shallow(
      <TgtDashboard
        rfi={rfiTest}
        exitTgtPage={exitSpy}
        updateRfiDate={updateSpy}
        exploitDates={[]}
        setDatePlaceholder={setPlaceholderSpy}
        showDatePlaceholder={false}
        targets={[]}
      />
    );
  });

  it('should display the rfi description', () => {
    expect(subject.find('.tgt-dash--rfi-description-container').text()).toContain('Good morning starshine, the earth says hello');
  });

  it('should display the rfi description', () => {
    expect(subject.find('.tgt-dash--rfi-description-container').text()).toContain('Good morning starshine, the earth says hello');
  });

  it('should display an add date button', () => {
    expect(subject.find('.add-date-button').exists()).toBeTruthy();
  });

  it('should display the date dividers or not properly', () => {
    expect(subject.find('.region-divider').exists()).toBeFalsy();
    expect(subject.find(StyledTgtTable).children().length).toBe(0);

    let dates: ExploitDateModel[] = [
      new ExploitDateModel(2, 1, moment('2019-11-20').utc()),
      new ExploitDateModel(3, 1, moment('2019-11-21').utc()),
    ];
    subject = shallow(
      <TgtDashboard
        rfi={rfiTest}
        exitTgtPage={exitSpy}
        updateRfiDate={updateSpy}
        exploitDates={dates}
        setDatePlaceholder={setPlaceholderSpy}
        showDatePlaceholder={false}
        targets={[]}
      />
    );

    expect(subject.find(StyledTgtTable).children().length).toBe(2);

  });

  it('should display a date placeholder when the add date button is clicked', () => {
    expect(subject.find('.date-divider--placeholder').exists()).toBeFalsy();
    subject.find('.add-date-button').simulate('click');
    expect(subject.find('.date-divider--placeholder').exists()).toBeTruthy();
  });

  // TODO: simultaneous rows editable test?
  // it('should not allow multiple rows to be edited simultaneously', () => {
  //   let dates = [
  //     new ExploitDateModel(1, 1, moment('2019-11-21').utc()),
  //     new ExploitDateModel(2, 1, moment('2019-11-22').utc())
  //   ];
  //
  //   let targets = [
  //     new TargetModel(1, 1, 1, 'SDT12-123', '12XCV1234567890', '', ''),
  //     new TargetModel(2, 1, 2, 'SDT12-124', '12XCV1234567891', '', '')
  //   ];
  //
  //   let wrapper = mount(
  //     <TgtDashboard
  //       rfi={rfiTest}
  //       exitTgtPage={exitSpy}
  //       updateRfiDate={updateSpy}
  //       exploitDates={dates}
  //       setDatePlaceholder={setPlaceholderSpy}
  //       showDatePlaceholder={false}
  //       targets={targets}
  //     />
  //   );
  //
  //   expect(wrapper.find(StyledTgtDateSection).at(0)).toBeFalsy();
  // });


});
