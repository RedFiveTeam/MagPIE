import { shallow, ShallowWrapper } from 'enzyme';
import { RfiRow } from './RfiRow';
import RfiModel, { RfiStatus } from '../RfiModel';
import moment from 'moment';
import React from 'react';
import { StyledRfiRowInformationSection } from './RfiRowInformationSection';
import { StyledRfiRowButtonSection } from './RfiRowButtonSection';

describe('RFIRow', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RfiRow rfi={new RfiModel('id', 'url', RfiStatus.PENDING, 'customer', moment(), 'country', 'hi', -1)}/>
    )
  });

  it('should display RFI information', () => {
    expect(subject.find(StyledRfiRowInformationSection).exists()).toBeTruthy();
    expect(subject.find(StyledRfiRowButtonSection).exists()).toBeTruthy();
  });
});
