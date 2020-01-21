import { CoiDashboard } from '../../workflow/coi-page/CoiDashboard';
import '../../setupEnzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import * as React from 'react';
import Flatpickr from 'react-flatpickr';

describe('CoiDashboardContainer', () => {
  let subject: ShallowWrapper;
  const moment = require('moment');
  let rfiTest: RfiModel;
  let exitSpy: jest.Mock;
  let updateSpy: jest.Mock;

  beforeEach(() => {
    exitSpy = jest.fn();
    updateSpy = jest.fn();
    rfiTest= new RfiModel("DGS-SPC-2035-02335", "www.spacejam.com", RfiStatus.OPEN, "space forse",
      moment('2019-11-20').utc(), "USLT", "Good morning starshine, the earth says hello", 42, null, null);
    subject = shallow(
      <CoiDashboard
        rfi={rfiTest}
        exitCoiPage={exitSpy}
        updateRfiDate={updateSpy}
      />
    );
  });

  it('should display rfi rfiNum header', () => {
    expect(subject.find('.coi-dash--header').text()).toContain('RFI: 35-335');
  });

  it('should contain a clickable back button', () => {
    expect(subject.find('.coi-dash--header--back-button').text()).toContain('Go Back');
    subject.find('.coi-dash--header--back-button').simulate('click');
    expect(exitSpy).toHaveBeenCalled();
  });

  it('should display the rfi description', () => {
    expect(subject.find('.coi-dash--rfi-description-container').text()).toContain('Good morning starshine, the earth says hello');
  });

  it('should convert add date button to add new target button', () => {
    expect(subject.find('.coi-dash--add-new-tgt').exists()).toBeFalsy();
    expect(subject.find('.coi-dash-add-date-button').exists()).toBeTruthy();
    rfiTest.exploitStart = moment('2019-11-20').utc();
    rfiTest.exploitEnd = moment('2019-11-20').utc();

    subject = shallow(
      <CoiDashboard
        rfi={rfiTest}
        exitCoiPage={exitSpy}
        updateRfiDate={updateSpy}
      />
    );
    expect(subject.find('.coi-dash-add-date-button').exists()).toBeFalsy();
    expect(subject.find('.coi-dash--add-new-tgt').exists()).toBeTruthy();
  });

  it('should display the date or placeholder properly', () => {
    expect(subject.find('.coi-dash-daterange-display-inactive').text()).toContain('DDMMMYY');
    expect(subject.find(Flatpickr).exists()).toBeTruthy();

    rfiTest.exploitStart = moment('2019-11-20').utc();
    rfiTest.exploitEnd = moment('2019-11-20').utc();

    subject = shallow(
      <CoiDashboard
        rfi={rfiTest}
        exitCoiPage={exitSpy}
        updateRfiDate={updateSpy}
      />
    );

    expect(subject.find('.coi-dash-daterange-display-active').text()).toContain('20NOV19');
    expect(subject.find('.coi-dash-daterange-display-active').text().includes(' - ')).toBeFalsy();
    expect(subject.find(Flatpickr).exists()).toBeFalsy();

    rfiTest.exploitStart = moment('2019-11-20').utc();
    rfiTest.exploitEnd = moment('2019-11-23').utc();

    subject = shallow(
      <CoiDashboard
        rfi={rfiTest}
        exitCoiPage={exitSpy}
        updateRfiDate={updateSpy}
      />
    );

    expect(subject.find('.coi-dash-daterange-display-active').text()).toContain('20NOV19 - 23NOV19');
    expect(subject.find(Flatpickr).exists()).toBeFalsy();


  });
});
