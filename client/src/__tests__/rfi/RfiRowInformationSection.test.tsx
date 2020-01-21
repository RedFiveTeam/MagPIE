import { shallow, ShallowWrapper } from 'enzyme';
import { RfiRowInformationSection } from '../../workflow/rfi-page/row/RfiRowInformationSection';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';

// @ts-ignore
import moment from 'moment';
import IconDnDBurger from '../../resources/icons/DnDBurgerVector';
import * as React from 'react';
import IconShowMore from '../../resources/icons/ShowMoreVector';

describe('RFIRowInformationSection', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    let rfi = new RfiModel('2020-00123', 'google.com', RfiStatus.OPEN, '1 FW', moment('2019-11-20').utc(), 'CAN', 'hi', -1);
    subject = shallow(
      <RfiRowInformationSection
        scrollRegionRef={React.createRef()}
        rfi={rfi}
        prioritizing={false}
        navigateToCoiPage={() => {}}
      />
    )
  });

  it('should format an ID to shorthand format', () => {
    expect(subject.find('.cell--id').text()).toBe('20-123');
  });

  it('should contain the RFI customer', () => {
    expect(subject.find('.cell--customer').text()).toBe('1 FW');
  });

  it('should contain the RFI LTIOV or dash', () => {
    expect(subject.find('.cell--ltiov').text()).toBe('20 NOV 19');
    let rfi = new RfiModel('2020-00123', 'google.com', RfiStatus.OPEN, '1 FW', undefined, 'CAN', 'hi', -1);
    subject = shallow(
      <RfiRowInformationSection
        scrollRegionRef={React.createRef()}
        rfi={rfi}
        prioritizing={false}
        navigateToCoiPage={() => {}}
      />
    );
    expect(subject.find('.cell--ltiov').text()).toBe('-');
  });

  it('should contain the RFI country code', () => {
    expect(subject.find('.cell--country').text()).toBe('CAN');
  });

  it('should have a button that navigates to the COI page', () => {
    expect(subject.find('.cell--addCoiButton').exists()).toBeTruthy();
  });

  it('should contain the RFI request text', () => {
    expect(subject.find('.cell--description').text()).toBe('hi');
  });

  it('should have a see more button', () => {
    let rfi = new RfiModel('2020-00123', 'google.com', RfiStatus.OPEN, '1 FW', undefined, 'CAN', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', -1);
    subject = shallow(
      <RfiRowInformationSection
        scrollRegionRef={React.createRef()}
        rfi={rfi}
        prioritizing={false}
        navigateToCoiPage={() => {}}
      />
    );
    expect(subject.find('.section--information').text().toLowerCase()).toContain('iconshowmore');
  });

  it('should display a hamburger only when prioritizing', () => {
    expect(subject.find(IconDnDBurger).exists()).toBeFalsy();
    let rfi = new RfiModel('2020-00123', 'google.com', RfiStatus.OPEN, '1 FW', undefined, 'CAN', 'hi', 1);
    subject = shallow(
      <RfiRowInformationSection
        rfi={rfi}
        scrollRegionRef={{}}
        prioritizing={true}
        navigateToCoiPage={() => {}}
      />
    );
    expect(subject.find(IconDnDBurger).exists()).toBeTruthy()
  });
});
