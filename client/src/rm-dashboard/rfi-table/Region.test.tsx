import { RFIRow } from './RFIRow';
import RFIModel, { RFIStatus } from '../RFIModel';
import moment from 'moment';
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Region } from './Region';
import { StyledRFIRegionDivider } from './RFIRegionDivider';

describe('Region', () => {
  let rows: any[];
  let subject: ShallowWrapper;

  beforeEach(() => {
    rows = [
      <RFIRow rfi={new RFIModel('19-001', 'url', RFIStatus.OPEN, '1 FW', moment('2019-12-01').utc(), 'USA')} key={'1'}/>,
      <RFIRow rfi={new RFIModel('19-004', 'url', RFIStatus.OPEN, '633 ABW', moment('2019-12-02').utc(), 'CAN')} key={'2'}/>,
      <RFIRow rfi={new RFIModel('19-003', 'url', RFIStatus.OPEN, 'HQ ACC', undefined, 'MEX')} key={'3'}/>,
    ];

    subject = shallow(
      <Region
        title={'title'}
        emptyMessage={'empty'}
      >
        {rows}
      </Region>
    );
  });

  it('should display a divider', () => {
    expect(subject.find(StyledRFIRegionDivider).exists()).toBeTruthy();
  });

  it('should present all given rows', () => {
    expect(subject.find(RFIRow).length).toBe(3);
  });

  it('should display a message when there are no rows', () => {
    let emptyMessage = 'Congratulations! Your team opened all the new RFIs in GETS.';
    expect(subject.text()).not.toContain(emptyMessage);

    subject = shallow(
      <Region
        title={'title'}
        emptyMessage={emptyMessage}
      />
    );
    expect(subject.text()).toContain(emptyMessage);
  });
});
