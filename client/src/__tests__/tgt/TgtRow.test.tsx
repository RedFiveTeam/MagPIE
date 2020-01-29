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
  let target: TargetModel = new TargetModel(
    "SDT20-00123",
    3,
    "SDT12-123",
    "12QWE1231231231",
    "These are the notes",
    "This is a description"
  );
  let rfiTest = new RfiModel(1, "DGS-SPC-2035-02335", "www.spacejam.com", RfiStatus.OPEN, "space forse",
    moment('2019-11-20').utc(), "USLT", "Good morning starshine, the earth says hello", 42);
  let exploitDate = new ExploitDateModel(1, moment('2019-11-20').utc(), 1);

  beforeEach(() => {
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


});