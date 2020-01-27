import { TgtDashboard } from '../../workflow/tgt-page/TgtDashboard';
import '../../setupEnzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import * as React from 'react';
import { Moment } from 'moment'
import { StyledTgtTable } from '../../workflow/tgt-page/TgtTable';

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
    rfiTest= new RfiModel("DGS-SPC-2035-02335", "www.spacejam.com", RfiStatus.OPEN, "space forse",
      moment('2019-11-20').utc(), "USLT", "Good morning starshine, the earth says hello", 42);
    subject = shallow(
      <TgtDashboard
        rfi={rfiTest}
        exitTgtPage={exitSpy}
        updateRfiDate={updateSpy}
        dates={[]}
        setDatePlaceholder={setPlaceholderSpy}
        showDatePlaceholder={false}
      />
    );
  });

  it('should display rfi rfiNum header', () => {
    expect(subject.find('.tgt-dash--header').text()).toContain('RFI: 35-335');
  });

  it('should contain a clickable back button', () => {
    expect(subject.find('.tgt-dash--header--back-button').text()).toContain('Go Back');
    subject.find('.tgt-dash--header--back-button').simulate('click');
    expect(exitSpy).toHaveBeenCalled();
  });

  it('should display the rfi description', () => {
    expect(subject.find('.tgt-dash--rfi-description-container').text()).toContain('Good morning starshine, the earth says hello');
  });

  it('should display an add date button', () => {
      expect(subject.find('.tgt-dash-add-date-button').exists()).toBeTruthy();
  });

  it('should display the date dividers or not properly', () => {
    expect(subject.find('.region-divider').exists()).toBeFalsy();
    expect(subject.find(StyledTgtTable).children().length).toBe(0);

    let dates: Moment[] = [
      moment('2019-11-20').utc(),
      moment('2019-11-20').utc()
    ];
    subject = shallow(
      <TgtDashboard
        rfi={rfiTest}
        exitTgtPage={exitSpy}
        updateRfiDate={updateSpy}
        dates={dates}
        setDatePlaceholder={setPlaceholderSpy}
        showDatePlaceholder={false}
      />
    );

    expect(subject.find(StyledTgtTable).children().length).toBe(3);

  });
  //
  //   expect(subject.find('.tgt-dash-daterange-display-active').text()).toContain('20NOV19');
  //   expect(subject.find('.tgt-dash-daterange-display-active').text().includes(' - ')).toBeFalsy();
  //   expect(subject.find(Flatpickr).exists()).toBeFalsy();
  //   rfiTest.exploitStart = moment('2019-11-20').utc();
  //   rfiTest.exploitEnd = moment('2019-11-23').utc();
  //   subject = shallow(
  //     <TgtDashboard
  //       rfi={rfiTest}
  //       exitTgtPage={exitSpy}
  //       updateRfiDate={updateSpy}
  //     />
  //   );
  //   expect(subject.find('.tgt-dash-daterange-display-active').text()).toContain('20NOV19 - 23NOV19');
  //   expect(subject.find(Flatpickr).exists()).toBeFalsy();
  // });


});
