import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import { StyledHeaderCell } from '../../dashboard/rfi/rfiDashboardTableHeader/RfiTableHeaderCell';
import { StyledButtonSection } from '../../dashboard/rfi/rfiDashboardTableHeader/RfiTableHeaderButtonSection';
import { RfiTableHeader } from '../../dashboard/rfi/rfiDashboardTableHeader/RfiTableHeader';
import { StyledUnsortableTableHeaderCell } from '../../dashboard/rfi/rfiDashboardTableHeader/UnsortableTableHeaderCell';


describe('RfiTableHeader', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RfiTableHeader
        fetchLocalUpdate={() => {}}
        postRefreshClick={() => {}}
        sortKey={new SortKeyModel(Field.PRIORITY, false)}
        sortRfis={() => {}}
      />
    );
  });

  it('should render a header for each field', () => {
    expect(subject.find(StyledHeaderCell).length).toBe(5);
    expect(subject.find(StyledUnsortableTableHeaderCell).length).toBe(3);
  });

  it('should render a container for buttons', () => {
    expect(subject.find(StyledButtonSection).length).toBe(1);
  });
});
