import '../../setupEnzyme';
import { shallow } from 'enzyme';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import { TgtDashboardHeader } from '../../workflow/tgt-page/header/TgtDashboardHeader';
import * as React from 'react';

describe('TgtDashboardHeader', () => {
  const moment = require('moment');
  let exitSpy: jest.Mock = jest.fn();
  let rfiTest: RfiModel = new RfiModel(1, "DGS-SPC-2035-02335", "www.spacejam.com", RfiStatus.OPEN, "space forse",
    moment('2019-11-20').utc(), "USLT", "Good morning starshine, the earth says hello", 42);

  let subject = shallow(
    <TgtDashboardHeader
      exitTgtPage={exitSpy}
      rfi={rfiTest}
    />);

  it('should display rfi rfiNum header', () => {
    expect(subject.find('.tgt-dash--header').text()).toContain('RFI: 35-335');
  });

  it('should contain a clickable back button', () => {
    expect(subject.find('.tgt-dash--header--back-button').text()).toContain('Go Back');
    subject.find('.tgt-dash--header--back-button').simulate('click');
    expect(exitSpy).toHaveBeenCalled();
  });

});
