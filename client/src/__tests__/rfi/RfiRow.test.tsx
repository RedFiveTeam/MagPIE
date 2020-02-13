import '../../setupEnzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { StyledRfiRowInformationSection } from '../../dashboard/rfi/region/row/RfiRowInformationSection';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { RfiRow } from '../../dashboard/rfi/region/row/RfiRow';
import { StyledRfiRowButtonSection } from '../../dashboard/rfi/region/row/RfiRowButtonSection';

describe('RFIRow', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    const moment = require('moment');
    subject = shallow(
      <RfiRow
        rfi={new RfiModel(1, 'id', 'url', RfiStatus.PENDING, 'customer', moment(), 'country', 'hi', -1)}
        scrollRegionRef={()=>{}}
      />
    )
  });

  it('should display RFI information', () => {
    expect(subject.find(StyledRfiRowInformationSection).exists()).toBeTruthy();
    expect(subject.find(StyledRfiRowButtonSection).exists()).toBeTruthy();
  });

});
