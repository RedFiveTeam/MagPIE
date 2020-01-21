import { RfiRow } from '../../workflow/rfi-page/row/RfiRow';
import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { RfiRegion } from '../../workflow/rfi-page/RfiRegion';
import { StyledRfiRegionDivider } from '../../workflow/rfi-page/RfiRegionDivider';
import '../../setupEnzyme';

describe('Region', () => {
  let rows: any[];
  let subject: ShallowWrapper;

  beforeEach(() => {
    const moment = require('moment');
    rows = [
      <RfiRow
        rfi={new RfiModel('19-001', 'url', RfiStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA', 'hi', -1)}
        key={'1'}
        scrollRegionRef={{}}
        index={0}
      />,
      <RfiRow
        rfi={new RfiModel('19-004', 'url', RfiStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN', 'hi', -1)}
        key={'2'}
        scrollRegionRef={{}}
        index={1}
      />,
      <RfiRow
        rfi={new RfiModel('19-003', 'url', RfiStatus.OPEN, 'HQ ACC', undefined, 'MEX', 'hi', -1)}
        key={'3'}
        scrollRegionRef={{}}
        index={2}
      />,
    ];
    subject = shallow(
        <RfiRegion
          title={'title'}
          emptyMessage={'empty'}
          provided={{innerRef:0}}
        >
          {rows}
        </RfiRegion>
    );
  });

  it('should display a divider', () => {
    expect(subject.find(StyledRfiRegionDivider).exists()).toBeTruthy();
  });

  it('should present all given rows', () => {
    expect(subject.find(RfiRow).length).toBe(3);
  });

  it('should display a message when there are no rows', () => {
    let emptyMessage = 'Congratulations! Your team opened all the new RFIs in GETS.';
    expect(subject.text()).not.toContain(emptyMessage);

    subject = shallow(
        <RfiRegion
          title={'title'}
          emptyMessage={emptyMessage}
          provided={{innerRef:0}}
        />

    );
    expect(subject.text()).toContain(emptyMessage);
  });
});
