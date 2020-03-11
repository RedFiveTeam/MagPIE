import '../../setupEnzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { StyledRfiRowInformationSection } from '../../dashboard/rfi/region/row/RfiRowInformationSection';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { RfiRow } from '../../dashboard/rfi/region/row/RfiRow';
import { StyledTgtPageButtonVector } from '../../resources/icons/TgtPageButtonVector';

describe('RFIRow', () => {
  let subject: ShallowWrapper;
  const moment = require('moment');
  let rfi = new RfiModel(1, 'id', 'url', RfiStatus.OPEN, 'customer', moment(), 'country', 'hi', -1, 12, 345);
  let postGetsClickSpy: jest.Mock;
  let loadTgtPageSpy: jest.Mock;
  window.open = jest.fn();

  beforeEach(() => {
    postGetsClickSpy = jest.fn();
    loadTgtPageSpy = jest.fn();

    subject = shallow(
      <RfiRow
        rfi={rfi}
        scrollRegionRef={() => {
        }}
        postGetsClick={postGetsClickSpy}
        loadTgtPage={loadTgtPageSpy}
      />,
    );
  });

  it('should display RFI information', () => {
    expect(subject.find(StyledRfiRowInformationSection).exists()).toBeTruthy();
  });

  it('should have a button that navigates to the TGT page', () => {
    expect(subject.find('.cell--navigate-to-tgt-button').exists()).toBeTruthy();
    expect(subject.find(StyledTgtPageButtonVector).exists()).toBeTruthy();
    subject.find('.cell--navigate-to-tgt-button').simulate('click');
    expect(loadTgtPageSpy).toHaveBeenCalledWith(rfi, true);
  });

  it('navigate to tgt button should be disabled on closed or pending rfis', () => {
    let newRfi = {...rfi, status: RfiStatus.PENDING};

    subject = shallow(
      <RfiRow
        rfi={newRfi}
        scrollRegionRef={() => {
        }}
        postGetsClick={postGetsClickSpy}
        loadTgtPage={loadTgtPageSpy}
      />,
    );

    subject.find('.cell--navigate-to-tgt-button').simulate('click');
    expect(loadTgtPageSpy).not.toHaveBeenCalled();

    newRfi = {...rfi, status: RfiStatus.CLOSED};

    subject = shallow(
      <RfiRow
        rfi={newRfi}
        scrollRegionRef={() => {
        }}
        postGetsClick={postGetsClickSpy}
        loadTgtPage={loadTgtPageSpy}
      />,
    );

    subject.find('.cell--navigate-to-tgt-button').simulate('click');
    expect(loadTgtPageSpy).not.toHaveBeenCalled();
  });

  it('should display the GETS button', () => {
    expect(subject.find('.section-button-right').text()).toContain('GETS');
  });

  it('should call the given postGetsClick function on click', () => {
    subject.find('.section--right').simulate('click');
    expect(postGetsClickSpy).toHaveBeenCalled();
  });
});
