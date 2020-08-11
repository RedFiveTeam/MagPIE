import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import TgtPageButtonVector from '../../resources/icons/TgtPageButtonVector';
import { RfiDescriptionContainer } from '../../dashboard/rfi/RfiDescriptionContainer';
import ExternalLinkVector from '../../resources/icons/ExternalLinkVector';
import { UploadFileButtonVector } from '../../resources/icons/UploadFileButton';
import { SnackbarProvider } from 'notistack';

describe('RFI description container', () => {
  let subject: ReactWrapper;
  const moment = require('moment');
  let rfi = new RfiModel(1, 'id', 'url', undefined, RfiStatus.OPEN, 'LTJG', 'John', 'Kennedy', 'POTUS',
                         'john@whitehouse.gov', '(202) 456-1111', '', '', '555-1212', moment(), 'country', 'hi',
                         'Just a fiction', -1, 12, 345, undefined, false, false);
  let postGetsClickSpy: jest.Mock;
  let loadTgtPageSpy: jest.Mock;

  window.open = jest.fn();

  beforeEach(() => {
    postGetsClickSpy = jest.fn();
    loadTgtPageSpy = jest.fn();

    subject = mount(
      <SnackbarProvider>
        <RfiDescriptionContainer
          rfi={rfi}
          loadTgtPage={loadTgtPageSpy}
          postGetsClick={postGetsClickSpy}
        />
      </SnackbarProvider>,
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

    let newRfi = {...rfi, status: RfiStatus.CLOSED};
    subject = mount(
      <SnackbarProvider>
        <RfiDescriptionContainer
          rfi={newRfi}
          postGetsClick={postGetsClickSpy}
          loadTgtPage={loadTgtPageSpy}
        />
      </SnackbarProvider>,
    );
    subject.find('.navigate-to-tgt-button').simulate('click');

    expect(loadTgtPageSpy).toHaveBeenCalledWith(rfi);
    expect(loadTgtPageSpy).toHaveBeenCalledWith(newRfi);
    expect(loadTgtPageSpy).toHaveBeenCalledTimes(2);
  });

  it('navigate to tgt button should be disabled on pending rfis', () => {
    let newRfi = {...rfi, status: RfiStatus.PENDING};
    subject = mount(
      <SnackbarProvider>
        <RfiDescriptionContainer
          rfi={newRfi}
          postGetsClick={postGetsClickSpy}
          loadTgtPage={loadTgtPageSpy}
        />
      </SnackbarProvider>,
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

  it('should display the Upload File button, disabled by default', () => {
    expect(subject.find(UploadFileButtonVector).exists()).toBeTruthy();
    expect(subject.find('.upload-button').text()).toContain('Upload Product');

    // This is functionality to test the 'areAllTracksComplete' enabling/disabling the upload button
    // rfi = {...rfi, areAllTracksComplete: true}
    //
    // subject = mount(
    // <SnackbarProvider>
    //   <RfiDescriptionContainer
    //     rfi={rfi}
    //     loadTgtPage={loadTgtPageSpy}
    //     postGetsClick={postGetsClickSpy}
    //   />
    //   </SnackbarProvider>,
    // );
    //
    // expect(subject.find(UploadFileButtonVector).exists()).toBeTruthy();
    // expect(subject.find('.upload-button').text()).toContain('Upload Product');
  });

  it('should should display customer information', () => {
    expect(subject.find('.header').at(2).text()).toContain('Customer Information');
    expect(subject.find('.text-body').at(2).text()).toContain('LTJG Kennedy, John');
    expect(subject.find('.text-body').at(2).text()).toContain('COMM: (202) 456-1111 / TSVoIP: 555-1212');
    expect(subject.find('.text-body').at(2).text()).toContain('john@whitehouse.gov');
  });

  it('should display completion dates appropriately', () => {
    expect(subject.text()).not.toContain('Completion Date');

    rfi.completionDate = moment('11/12/2020', 'MM/DD/YYYY');

    subject = mount(
      <SnackbarProvider>
        <RfiDescriptionContainer
          rfi={rfi}
          loadTgtPage={loadTgtPageSpy}
          postGetsClick={postGetsClickSpy}
        />
      </SnackbarProvider>,
    );

    expect(subject.find('.header').at(0).text()).toContain('Projected Completion Date');
    expect(subject.find('.text-body').at(0).text()).toContain('12 November 2020');

    rfi.status = RfiStatus.CLOSED;

    subject = mount(
      <SnackbarProvider>
        <RfiDescriptionContainer
          rfi={rfi}
          loadTgtPage={loadTgtPageSpy}
          postGetsClick={postGetsClickSpy}
        />
      </SnackbarProvider>,
    );

    expect(subject.find('.header').at(0).text()).not.toContain('Projected Completion Date');
    expect(subject.find('.header').at(0).text()).toContain('Completion Date');
    expect(subject.find('.text-body').at(0).text()).toContain('12 November 2020');

  });
});
