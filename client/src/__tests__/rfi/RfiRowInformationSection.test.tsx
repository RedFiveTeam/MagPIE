import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import '../../setupEnzyme';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { RfiRowInformationSection } from '../../dashboard/rfi/region/row/RfiRowInformationSection';
import { StyledIconShowMore } from '../../resources/icons/ShowMoreVector';

describe('RFIRowInformationSection', () => {
  let subject: ShallowWrapper;
  const moment = require('moment');
  let rfi = new RfiModel(1, '2020-00123', 'google.com', RfiStatus.OPEN, '1 FW', moment('2019-11-20').utc(), 'CAN', 'hi', 1, 12, 345);

  beforeEach(() => {
    subject = shallow(
      <RfiRowInformationSection
        scrollRegionRef={React.createRef()}
        rfi={rfi}
        prioritizing={false}
      />
    )
  });

  it('should format an RFINUM to shorthand format', () => {
    expect(subject.find('.cell--rfiNum').text()).toBe('20-123');
  });

  it('should contain the RFI customer', () => {
    expect(subject.find('.cell--customer').text()).toBe('1 FW');
  });

  it('should contain the RFI LTIOV or dash', () => {
    expect(subject.find('.cell--ltiov').text()).toBe('20 NOV 19');

    let newRfi = {...rfi, ltiov: undefined};
    subject = shallow(
      <RfiRowInformationSection
        scrollRegionRef={React.createRef()}
        rfi={newRfi}
        prioritizing={false}
      />
    );
    expect(subject.find('.cell--ltiov').text()).toBe('-');
  });

  it('should contain the RFI country code', () => {
    expect(subject.find('.cell--country').text()).toBe('CAN');
  });

  it('should contain the RFI request text', () => {
    expect(subject.find('.cell--description').text()).toBe('hi');
  });

  it('should have a see more button', () => {
    let newRfi = {...rfi, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
      'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
      'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim rfiNum ' +
      'est laborum.'};

    subject = shallow(
      <RfiRowInformationSection
        scrollRegionRef={React.createRef()}
        rfi={newRfi}
        prioritizing={false}
      />
    );
    expect(subject.find(StyledIconShowMore).exists()).toBeTruthy();
  });

  it('should display a hamburger only when prioritizing', () => {
    expect(subject.find('.cell--pri').at(0).hasClass('not-prioritizing')).toBeTruthy();
    subject = shallow(
      <RfiRowInformationSection
        rfi={rfi}
        scrollRegionRef={{}}
        prioritizing={true}
      />
    );
    expect(subject.find('.cell--pri').at(0).hasClass('not-prioritizing')).toBeFalsy();
  });

  it('should display the number of tgts and ixns on open rows', () => {
    expect(subject.find('.cell--tgtCount').text()).toBe('12');
    expect(subject.find('.cell--ixnCount').text()).toBe('345');

    let newRfi = {...rfi, status: RfiStatus.PENDING};
    subject = shallow(
      <RfiRowInformationSection
        rfi={newRfi}
        scrollRegionRef={() => {
        }}
        prioritizing
      />,
    );

    expect(subject.find('.cell--tgtCount').text()).toBe('-');
    expect(subject.find('.cell--ixnCount').text()).toBe('-');
  });
});
