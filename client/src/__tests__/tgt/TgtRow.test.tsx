import '../../setupEnzyme';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { TgtRow } from '../../workflow/tgt-page/row/TgtRow';
import { TargetModel } from '../../workflow/tgt-page/models/TargetModel';
import { TargetPostModel } from '../../workflow/tgt-page/models/TargetPostModel';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import { ExploitDateModel } from '../../workflow/tgt-page/models/ExploitDateModel';

describe("Target Row", () => {
  let subject: ReactWrapper;
  const moment = require('moment');
  let target: TargetModel = new TargetModel(1, 1, 3, "SDT12-123", "12QWE1231231231", "These are the notes", "This is a description");
  let rfiTest = new RfiModel(1, "DGS-SPC-2035-02335", "www.spacejam.com", RfiStatus.OPEN, "space forse",
    moment('2019-11-20').utc(), "USLT", "Good morning starshine, the earth says hello", 42);
  let exploitDate = new ExploitDateModel(1, 1, moment('2019-11-20').utc());
  let deleteSpy: jest.Mock;
  let navToIxnPageSpy: jest.Mock;

  beforeEach(() => {
    deleteSpy = jest.fn();
    navToIxnPageSpy = jest.fn();

    subject = mount(
      <TgtRow
        target={target}
        key={1}
        className={'class'}
        submitNewTarget={(target: TargetPostModel, rfi: RfiModel) => {
        }}
        exploitDate={exploitDate}
        setAddTgt={(dateId: number) => {
        }}
        rfi={rfiTest}
        navigateToIxnPage={navToIxnPageSpy}
        deleteTgt={deleteSpy}
      />
    );
  });

  it('should display the data it is given', () => {
    //Jest can find the multiline text but not the single line
    // expect(subject.find('.tgt-form-box').at(0).text()).toContain('SDT12-123');
    // expect(subject.find('.mgrs').at(0).text()).toContain('12QWE1231231231');
    expect(subject.find('.notes').at(0).text()).toContain('These are the notes');
    expect(subject.find('.description').at(0).text()).toContain('This is a description');
  });

  it('should call a delete target action when delete button is clicked except in add mode', () => {
    subject.find('.delete').simulate('click');

    subject = mount(
      <TgtRow
        target={null}
        key={1}
        className={'class'}
        submitNewTarget={(target: TargetPostModel, rfi: RfiModel) => {
        }}
        exploitDate={exploitDate}
        setAddTgt={(dateId: number) => {
        }}
        rfi={rfiTest}
        navigateToIxnPage={navToIxnPageSpy}
        deleteTgt={deleteSpy}
      />
    );

    subject.find('.delete').simulate('click');

    expect(deleteSpy).toHaveBeenCalledTimes(1);

  });

  it('should call a navigate to interaction page test when the exploitation log button is clicked except in add mode', () => {
    subject.find('.exploitation').simulate('click');

    subject = mount(
      <TgtRow
        target={null}
        key={1}
        className={'class'}
        submitNewTarget={(target: TargetPostModel, rfi: RfiModel) => {
        }}
        exploitDate={exploitDate}
        setAddTgt={(dateId: number) => {
        }}
        rfi={rfiTest}
        navigateToIxnPage={navToIxnPageSpy}
        deleteTgt={deleteSpy}
      />
    );

    subject.find('.exploitation').simulate('click');

    expect(navToIxnPageSpy).toHaveBeenCalledTimes(1);

  });


});
