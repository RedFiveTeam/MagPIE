import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import TgtPageButtonVector from '../../resources/icons/TgtPageButtonVector';
import { RfiDescriptionContainer } from '../../dashboard/rfi/RfiDescriptionContainer';
import ExternalLinkVector from '../../resources/icons/ExternalLinkVector';

describe('RFI description container', () => {
  let subject: ShallowWrapper;
  const moment = require('moment');
  let rfi = new RfiModel(1, 'id', 'url', RfiStatus.OPEN, 'customer', moment(), 'country', 'hi', 'Just a fiction', -1, 12, 345);
  let postGetsClickSpy: jest.Mock;
  let loadTgtPageSpy: jest.Mock;
  window.open = jest.fn();

  beforeEach(() => {
    postGetsClickSpy = jest.fn();
    loadTgtPageSpy = jest.fn();

    subject = shallow(
      <RfiDescriptionContainer
        rfi={rfi}
        loadTgtPage={loadTgtPageSpy}
        postGetsClick={postGetsClickSpy}
      />,
    );
  });

  it('should display RFI description and justification', () => {
    expect(subject.find('.header').at(0).text()).toContain('RFI Description');
    expect(subject.find('.text-body').at(0).text()).toContain('hi');
    expect(subject.find('.header').at(1).text()).toContain('Justification');
    expect(subject.find('.text-body').at(1).text()).toContain('Just a fiction');
  });

  it('should have a button that navigates to the TGT page', () => {
    expect(subject.find('.navigate-to-tgt-button').exists()).toBeTruthy();
    expect(subject.find(TgtPageButtonVector).exists()).toBeTruthy();
    subject.find('.navigate-to-tgt-button').simulate('click');
    expect(loadTgtPageSpy).toHaveBeenCalledWith(rfi);
  });

  it('navigate to tgt button should be disabled on closed or pending rfis', () => {
    let newRfi = {...rfi, status: RfiStatus.PENDING};
    subject = shallow(
      <RfiDescriptionContainer
        rfi={newRfi}
        postGetsClick={postGetsClickSpy}
        loadTgtPage={loadTgtPageSpy}
      />,
    );
    subject.find('.navigate-to-tgt-button').simulate('click');

    newRfi = {...rfi, status: RfiStatus.CLOSED};
    subject = shallow(
      <RfiDescriptionContainer
        rfi={newRfi}
        postGetsClick={postGetsClickSpy}
        loadTgtPage={loadTgtPageSpy}
      />,
    );
    subject.find('.navigate-to-tgt-button').simulate('click');

    expect(loadTgtPageSpy).not.toHaveBeenCalled();
  });

  it('should display the GETS button', () => {
    expect(subject.find('.gets-button').text()).toContain('GETS');
    expect(subject.find(ExternalLinkVector).exists()).toBeTruthy();
  });

  it('should call the given postGetsClick function on click', () => {
    subject.find('.gets-button').simulate('click');
    expect(postGetsClickSpy).toHaveBeenCalled();
  });
});
