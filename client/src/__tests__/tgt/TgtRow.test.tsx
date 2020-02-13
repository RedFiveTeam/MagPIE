import '../../setupEnzyme';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { TgtRow } from '../../dashboard/tgt/tgtTable/row/TgtRow';
import { TargetModel } from '../../store/tgt/TargetModel';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { TargetPostModel } from '../../store/tgt/TargetPostModel';
import { Status } from '../../dashboard/tgt/TgtDashboard';

describe("Target Row", () => {
  let subject: ReactWrapper;
  const moment = require('moment');
  let target: TargetModel = new TargetModel(1, 1, 3, "SDT12-123", "12QWE1231231231", "These are the notes", "This is a description");
  let rfiTest = new RfiModel(1, "DGS-SPC-2035-02335", "www.spacejam.com", RfiStatus.OPEN, "space forse",
    moment('2019-11-20').utc(), "USLT", "Good morning starshine, the earth says hello", 42);
  let exploitDate = new ExploitDateModel(1, 1, moment('2019-11-20').utc());
  let deleteSpy: jest.Mock;
  let navToIxnPageSpy: jest.Mock;
  let setAddEditTargetSpy: jest.Mock;

  beforeEach(() => {
    deleteSpy = jest.fn();
    navToIxnPageSpy = jest.fn();
    setAddEditTargetSpy = jest.fn();

    subject = mount(
      <TgtRow
        target={target}
        key={1}
        className={'class'}
        submitPostTarget={(target: TargetPostModel, rfi: RfiModel) => {
        }}
        exploitDate={exploitDate}
        rfi={rfiTest}
        navigateToIxnPage={navToIxnPageSpy}
        deleteTgt={deleteSpy}
        editable={false}
        setAddEditTarget={setAddEditTargetSpy}
      />
    );
  });

  it('should display the data it is given', () => {
    expect(subject.find('.notes').at(0).text()).toContain('These are the notes');
    expect(subject.find('.description').at(0).text()).toContain('This is a description');
  });

  it('should call a delete target action when delete button is clicked except in add mode', () => {
    subject.find('.delete-tgt').simulate('click');

    subject = mount(
      <TgtRow
        target={null}
        key={1}
        className={'class'}
        submitPostTarget={(target: TargetPostModel, rfi: RfiModel) => {
        }}
        exploitDate={exploitDate}
        rfi={rfiTest}
        navigateToIxnPage={navToIxnPageSpy}
        deleteTgt={deleteSpy}
        editable={true}
        setAddEditTarget={setAddEditTargetSpy}
      />
    );

    subject.find('.delete-tgt').simulate('click');

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(setAddEditTargetSpy).toHaveBeenCalledWith(Status.VIEW);

  });

  it('should call a navigate to interaction page test when the exploitation log button is clicked except in add mode',
    () => {
    subject.find('.exploitation').simulate('click');
    expect(navToIxnPageSpy).toBeCalledWith(target, '11/20/2019');

    subject = mount(
      <TgtRow
        target={null}
        key={1}
        className={'class'}
        submitPostTarget={(target: TargetPostModel, rfi: RfiModel) => {
        }}
        exploitDate={exploitDate}
        rfi={rfiTest}
        navigateToIxnPage={navToIxnPageSpy}
        deleteTgt={deleteSpy}
        editable={true}
        setAddEditTarget={setAddEditTargetSpy}
      />
    );

    subject.find('.exploitation').simulate('click');

    expect(navToIxnPageSpy).toHaveBeenCalledTimes(1);
  });

  it('should make target row editable after double clicking them', () => {
    subject.find('.edit-tgt-form').at(0).simulate('dblclick');
    expect(setAddEditTargetSpy).toHaveBeenCalledWith(Status.EDIT, target.id);
  });

});
