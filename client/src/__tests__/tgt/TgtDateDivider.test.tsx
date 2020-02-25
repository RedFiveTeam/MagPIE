import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import '../../setupEnzyme';
import { TgtDateDivider } from '../../dashboard/tgt/table/TgtDateDivider';
import { Modal } from '@material-ui/core';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';

//material ui content may be internally tested
describe('TgtDateDivider', () => {
  let subject: ReactWrapper;
  let updateRfiDateSpy: jest.Mock;
  let exploitDate: ExploitDateModel;
  let setAddDateSpy: jest.Mock;
  let deleteExploitDateSpy: jest.Mock;
  const moment = require('moment');

  beforeEach(() => {
    updateRfiDateSpy = jest.fn();
    let exploitDateMoment = moment(new Date);
    exploitDate = new ExploitDateModel(1, 1, exploitDateMoment);
    setAddDateSpy = jest.fn();
    deleteExploitDateSpy = jest.fn();
    subject = mount(
      <TgtDateDivider
        rfiId={1}
        updateRfiDate={updateRfiDateSpy}
        setAddDate={setAddDateSpy}
        exploitDate={exploitDate}
        exploitDateDisplay={exploitDate.exploitDate.toString()}
        deleteExploitDate={deleteExploitDateSpy}
        hasTgts={false}
        uKey={1}
      />
    );
  });

  it('should display a dividing line', () => {
    expect(subject.find(".separator-line").exists()).toBeTruthy();
  });

  it('should display a date input with the exploitation date if it exists', () => {
    expect(subject.find(".exploitDate-input").exists()).toBeTruthy();
    expect(subject.find(".MuiInputBase-input").props().value)
      .toContain(exploitDate.exploitDate.format('MM/DD/YYYY'));
  });

  it('should show a delete button that is clickable', () => {
    subject.find(".delete-date").at(0).simulate('click');
    expect(deleteExploitDateSpy).toHaveBeenCalled();
  });

  it('should display a modal when trying to delete a date with tgts', () => {
    subject = mount(
      <TgtDateDivider
        rfiId={1}
        updateRfiDate={updateRfiDateSpy}
        setAddDate={setAddDateSpy}
        exploitDate={exploitDate}
        exploitDateDisplay={exploitDate.exploitDate.toString()}
        deleteExploitDate={deleteExploitDateSpy}
        hasTgts={true}
        uKey={1}
      />
    );

    subject.find(".delete-date").at(0).simulate('click');
    expect(subject.find(Modal).get(1).props.open).toBeTruthy();
    expect(subject.find(".delete-modal").at(0).text()).toContain("This will delete all TGTs and interactions associated with it.");

    subject.find(".modal-no").at(0).simulate('click');
    expect(subject.find(".delete-modal").at(0).text()).not.toContain("This will delete all TGTs and interactions associated with it.");

    subject.find(".delete-date").at(0).simulate('click');
    subject.find(".modal-yes").at(0).simulate('click');
    expect(deleteExploitDateSpy).toHaveBeenCalled();
    expect(subject.find(Modal).get(1).props.open).toBeFalsy();
  });

  it('should not display a modal when trying to delete a date with no tgts', () => {
    subject = mount(
      <TgtDateDivider
        rfiId={1}
        updateRfiDate={updateRfiDateSpy}
        setAddDate={setAddDateSpy}
        exploitDate={exploitDate}
        exploitDateDisplay={exploitDate.exploitDate.toString()}
        deleteExploitDate={deleteExploitDateSpy}
        hasTgts={false}
        uKey={1}
      />
    );

    subject.find(".delete-date").at(0).simulate('click');
    expect(subject.find(Modal).get(1).props.open).toBeFalsy();
    expect(deleteExploitDateSpy).toHaveBeenCalled();
  });
});

