import '../../setupEnzyme';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { TgtDateRegion } from '../../dashboard/tgt/table/TgtDateRegion';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import { TargetModel } from '../../store/tgt/TargetModel';
import { StyledTgtRow } from '../../dashboard/tgt/table/TgtRow';
import { Status } from '../../dashboard/tgt/TgtDashboard';
import { StyledTgtInputRow } from '../../dashboard/tgt/table/TgtInputRow';

describe("Target Date Region", () => {
  const moment = require('moment');
  let subject: ShallowWrapper;
  let rfi = new RfiModel(1, 'DGS-SPC-2035-02335', 'www.spacejam.com', RfiStatus.OPEN, 'space forse', moment('2019-11-20').utc(), 'USLT', 'Good morning starshine, the earth says hello', 42, 0, 0);
  let exploitDate = new ExploitDateModel(1, 1, moment(new Date));
  let targets: TargetModel[] =
    [
      new TargetModel(1, 1, 1, 'ASD12-123', '12QWE1231231231', '', ''),
      new TargetModel(1, 1, 1, 'ASD12-124', '12QWE1231231232', '', ''),
      new TargetModel(1, 1, 1, 'ASD12-125', '12QWE1231231233', '', ''),
    ];
  let addEditSpy: jest.Mock;

  beforeEach(() => {
    addEditSpy = jest.fn();
    subject = shallow(
      <TgtDateRegion
        rfi={rfi}
        exploitDate={exploitDate}
        targets={targets}
        exploitDateDisplay={'MM/DD/YYYY'}
        addDate={false}
        setAddDate={(addDate: boolean) => {
        }}
        editTarget={-1}
        addTgt={-1}
        setAddEditTarget={addEditSpy}
        index={1}
        addingOrEditing={false}
      />
    );
  });

  it('should render the targets that are given to it', () => {
    expect(subject.find(StyledTgtRow).length).toBe(3);
  });

  it('should render an add target row appropriately', () => {
    // let childrenCount = subject.children.length;
    subject = shallow(
      <TgtDateRegion
        rfi={rfi}
        exploitDate={exploitDate}
        targets={targets}
        exploitDateDisplay={'MM/DD/YYYY'}
        addDate={false}
        setAddDate={(addDate: boolean) => {
        }}
        editTarget={-1}
        addTgt={exploitDate.id} //adding target to this date region
        setAddEditTarget={addEditSpy}
        index={1}
        addingOrEditing={true}
      />
    );
    expect(subject.find(StyledTgtRow).length).toBe(3);
    expect(subject.find(StyledTgtInputRow).length).toBe(1);
  });

  it('should have an add target button that calls the add target function on click', () => {
    expect(subject.find('.add-tgt-button').exists()).toBeTruthy();
    expect(subject.find('.add-tgt-button-disabled').exists()).toBeFalsy();
    subject.find('.add-tgt-button').simulate('click');
    expect(addEditSpy).toHaveBeenCalledWith(Status.ADD, exploitDate.id);
  });

  it('should disable the add target button properly', () => {
    subject = shallow(
      <TgtDateRegion
        rfi={rfi}
        exploitDate={exploitDate}
        targets={targets}
        exploitDateDisplay={'MM/DD/YYYY'}
        addDate={false}
        setAddDate={(addDate: boolean) => {
        }}
        editTarget={-1}
        addTgt={exploitDate.id} //adding target to this date region
        setAddEditTarget={addEditSpy}
        index={1}
        addingOrEditing={true}
      />
    );
    expect(subject.find('.add-tgt-button').exists()).toBeFalsy();
    expect(subject.find('.add-tgt-button-disabled').exists()).toBeTruthy();
    subject.find('.add-tgt-button-disabled').simulate('.click');

    subject = shallow(
      <TgtDateRegion
        rfi={rfi}
        exploitDate={exploitDate}
        targets={targets}
        exploitDateDisplay={'MM/DD/YYYY'}
        addDate={false}
        setAddDate={(addDate: boolean) => {
        }}
        editTarget={5}
        addTgt={-1}
        setAddEditTarget={addEditSpy}
        index={1}
        addingOrEditing={true}
      />
    );
    expect(subject.find('.add-tgt-button').exists()).toBeFalsy();
    expect(subject.find('.add-tgt-button-disabled').exists()).toBeTruthy();
    subject.find('.add-tgt-button-disabled').simulate('.click');

    expect(addEditSpy).not.toHaveBeenCalled()
  });
});
