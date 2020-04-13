import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { RfiRow } from '../../dashboard/rfi/region/RfiRow';

describe('RFIRow', () => {
  let subject: ShallowWrapper;
  const moment = require('moment');
  let rfi = new RfiModel(1, '2020-00123', 'google.com', RfiStatus.OPEN, '1 FW', moment('2019-11-20').utc(), 'CAN', 'hi',
                         1, 12, 345);
  let selectSpy: jest.Mock;

  beforeEach(() => {
    selectSpy = jest.fn();
    subject = shallow(
      <RfiRow
        scrollRegionRef={React.createRef()}
        rfi={rfi}
        prioritizing={false}
        selected={false}
        selectRfi={selectSpy}
      />,
    );
  });

  it('should format an RFINUM to shorthand format', () => {
    expect(subject.find('.cell--rfi-num').text()).toBe('20-123');
  });

  it('should contain the RFI customer', () => {
    expect(subject.find('.cell--customer').text()).toBe('1 FW');
  });

  it('should contain the RFI LTIOV or dash', () => {
    expect(subject.find('.cell--ltiov').text()).toBe('20 NOV 19');

    let newRfi = {...rfi, ltiov: undefined};
    subject = shallow(
      <RfiRow
        scrollRegionRef={React.createRef()}
        rfi={newRfi}
        prioritizing={false}
        selected={false}
        selectRfi={selectSpy}
      />,
    );
    expect(subject.find('.cell--ltiov').text()).toBe('-');
  });

  it('should contain the RFI country code', () => {
    expect(subject.find('.cell--country').text()).toBe('CAN');
  });

  it('should display a hamburger only when prioritizing', () => {
    expect(subject.find('.cell--pri').at(0).hasClass('not-prioritizing')).toBeTruthy();
    subject = shallow(
      <RfiRow
        rfi={rfi}
        scrollRegionRef={{}}
        prioritizing={true}
        selected={false}
        selectRfi={selectSpy}
      />,
    );
    expect(subject.find('.cell--pri').at(0).hasClass('not-prioritizing')).toBeFalsy();
  });

  it('should display the number of tgts and ixns on open rows', () => {
    expect(subject.find('.cell--count').at(0).text()).toBe('12');
    expect(subject.find('.cell--count').at(1).text()).toBe('345');

    let newRfi = {...rfi, status: RfiStatus.PENDING};
    subject = shallow(
      <RfiRow
        rfi={newRfi}
        scrollRegionRef={() => {
        }}
        prioritizing
        selected={false}
        selectRfi={selectSpy}
      />,
    );

    expect(subject.find('.cell--count').at(0).text()).toBe('-');
    expect(subject.find('.cell--count').at(1).text()).toBe('-');
  });

  it('should call the given select RFI function on click', () => {
    subject.find('.rfi-row').simulate('click');
    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy).toHaveBeenCalledWith(rfi.id);
  });
});
