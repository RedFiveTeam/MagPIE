import '../../setupEnzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import { RfiRow } from '../../workflow/rfi-page/row/RfiRow';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import * as React from 'react';
import { StyledRfiRowInformationSection } from '../../workflow/rfi-page/row/RfiRowInformationSection';
import { StyledRfiRowButtonSection } from '../../workflow/rfi-page/row/RfiRowButtonSection';

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
