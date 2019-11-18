import { shallow, ShallowWrapper } from 'enzyme';
import { RFIRowInformationSection } from './RFIRowInformationSection';
import React from 'react';

describe('RFIRowInformationSection', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RFIRowInformationSection id={'2020-00123'} unit={'1 FW'}/>
    )
  });

  it('should format an ID to shorthand format', () => {
    expect(subject.find('.cell--id').text()).toBe('20-123');
  });

  it('should contain the RFI unit', () => {
    expect(subject.find('.cell--unit').text()).toBe('1 FW');
  });
});
