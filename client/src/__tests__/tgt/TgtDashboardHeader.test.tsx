import { shallow, ShallowWrapper } from 'enzyme';
import { TgtDashboardHeader } from '../../dashboard/tgt/TgtDashboardHeader';
import * as React from 'react';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';

describe('TgtDashboardHeader', () => {
  const moment = require('moment');
  let exitSpy: jest.Mock = jest.fn();
  let rfiTest: RfiModel = new RfiModel(1, 'DGS-SPC-2035-02335', 'www.spacejam.com', undefined, RfiStatus.OPEN, '', '',
                                       '', 'space forse', '', '', '', '', '', moment('2019-11-20').utc(), 'USLT',
                                       'Good morning starshine, the earth says hello', 'Just a fiction', 42, 0, 0);
  let addDateSpy: jest.Mock;
  let subject: ShallowWrapper;

  beforeEach(() => {
    addDateSpy = jest.fn();
    subject = shallow(
      <TgtDashboardHeader
        exitTgtPage={exitSpy}
        rfi={rfiTest}
        editing={false}
        addDate={addDateSpy}
        disabled={false}
        displayHelperText={false}
        displayCopyTargets={() => {
        }}
      />);
  });

  it('should contain a clickable back button', () => {
    subject.find('.tgt-dash--header--back-button').simulate('click');
    expect(exitSpy).toHaveBeenCalled();
  });

  it('should have a clickable add date button except when disabled', () => {
    subject.find('.add-date-button').simulate('click');
    subject = shallow(
      <TgtDashboardHeader
        exitTgtPage={exitSpy}
        rfi={rfiTest}
        editing={false}
        addDate={addDateSpy}
        disabled={true}
        displayHelperText={false}
        displayCopyTargets={() => {
        }}
      />);
    subject.find('.add-date-button').simulate('click');
    expect(addDateSpy).toHaveBeenCalledTimes(1);
  });

  it('should display helper text appropriately', () => {
    expect(subject.text()).not.toContain('Add additional coverage dates');
    subject = shallow(
      <TgtDashboardHeader
        exitTgtPage={exitSpy}
        rfi={rfiTest}
        editing={false}
        addDate={addDateSpy}
        disabled={false}
        displayHelperText={true}
        displayCopyTargets={() => {
        }}
      />);
    expect(subject.find('.header-helper-text').text()).toContain('Add additional coverage dates');
  });
});
