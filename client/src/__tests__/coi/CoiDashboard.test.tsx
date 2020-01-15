import { CoiDashboard } from '../../workflow/coi-page/CoiDashboard';
import { shallow, ShallowWrapper } from 'enzyme';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import * as React from 'react';

// @ts-ignore
import moment from 'moment';

describe('CoiDashboardContainer', () => {
  let subject: ShallowWrapper;
  let rfiTest = new RfiModel("DGS-SPC-2335", "www.spacejam.com", RfiStatus.OPEN, "space forse", moment('2019-11-20').utc(), "USLT", "Good morning starshine, the earth says hello", 42);
  let exitSpy: jest.Mock;

  beforeEach(() => {
    exitSpy = jest.fn();
    subject = shallow(
      <CoiDashboard
        rfi={rfiTest}
        exitCoiPage={exitSpy}
      />
    );
  });

  it('should display rfi id header', () => {
    expect(subject.find('.coi-dash--header').text()).toContain('DGS-SPC-2335');
  });

  it('should contain a clickable back button', () => {
    expect(subject.find('.coi-dash--header--back-button').text()).toContain('Go Back');
    subject.find('.coi-dash--header--back-button').simulate('click');
    expect(exitSpy).toHaveBeenCalled();
  });

  it('should display the rfi description', () => {
    expect(subject.find('.coi-dash--rfi-description-container').text()).toContain('Good morning starshine, the earth says hello');
  });
});
