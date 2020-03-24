import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import '../../setupEnzyme';
import { TgtDateDivider } from '../../dashboard/tgt/table/TgtDateDivider';
import { Modal } from '@material-ui/core';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import { SnackbarProvider } from 'notistack';

//material ui content may be internally tested
describe('TgtDateDivider', () => {
  let subject: ReactWrapper;
  let exploitDate: ExploitDateModel;
  let setAddDateSpy: jest.Mock;
  let deleteExploitDateSpy: jest.Mock;
  const moment = require('moment');

  beforeEach(() => {
    let exploitDateMoment = moment(new Date);
    exploitDate = new ExploitDateModel(1, 1, exploitDateMoment);
    setAddDateSpy = jest.fn();
    deleteExploitDateSpy = jest.fn();
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <TgtDateDivider
          rfiId={1}
          setAddDate={setAddDateSpy}
          exploitDate={exploitDate}
          exploitDateDisplay={exploitDate.exploitDate.toString()}
          deleteExploitDate={deleteExploitDateSpy}
          hasTgts={false}
          uKey={1}
          postExploitDate={jest.fn()}
        />
      </SnackbarProvider>,
    );
  });

  it('should display a dividing line', () => {
    expect(subject.find('.exploit-date-divider--bar').exists()).toBeTruthy();
  });

  it('should display a date input with the exploitation date if it exists', () => {
    expect(subject.find('.newExploitDate-input').exists()).toBeTruthy();
    expect(subject.find('.MuiInputBase-input').props().value)
      .toContain(exploitDate.exploitDate.format('MM/DD/YYYY'));
  });

  it('should show a delete button that is clickable', () => {
    subject.find('.delete-date').at(0).simulate('click');
    expect(deleteExploitDateSpy).toHaveBeenCalled();
  });

  it('should display a modal when trying to delete a date with tgts', () => {
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <TgtDateDivider
          rfiId={1}
          setAddDate={setAddDateSpy}
          exploitDate={exploitDate}
          exploitDateDisplay={exploitDate.exploitDate.toString()}
          deleteExploitDate={deleteExploitDateSpy}
          hasTgts={true}
          uKey={1}
          postExploitDate={jest.fn()}
        />
      </SnackbarProvider>,
    );

    subject.find('.delete-date').at(0).simulate('click');
    expect(subject.find(Modal).get(1).props.open).toBeTruthy();
    expect(subject.find('.delete-modal').at(0).text()).toContain('All associated data will be erased.');

    subject.find('.modal-no').at(0).simulate('click');
    expect(subject.find('.delete-modal').at(0).text()).not.toContain('All associated data will be erased.');

    subject.find('.delete-date').at(0).simulate('click');
    subject.find('.modal-yes').at(0).simulate('click');
    expect(deleteExploitDateSpy).toHaveBeenCalled();
    expect(subject.find(Modal).get(1).props.open).toBeFalsy();
  });

  it('should not display a modal when trying to delete a date with no tgts', () => {
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <TgtDateDivider
          rfiId={1}
          setAddDate={setAddDateSpy}
          exploitDate={exploitDate}
          exploitDateDisplay={exploitDate.exploitDate.toString()}
          deleteExploitDate={deleteExploitDateSpy}
          hasTgts={false}
          uKey={1}
          postExploitDate={jest.fn()}
        />
      </SnackbarProvider>,
    );

    subject.find('.delete-date').at(0).simulate('click');
    expect(subject.find(Modal).get(1).props.open).toBeFalsy();
    expect(deleteExploitDateSpy).toHaveBeenCalled();
  });
});
