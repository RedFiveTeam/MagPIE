import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import { StyledHeaderCell } from '../../dashboard/rfi/rfiDashboardTableHeader/RfiTableHeaderCell';
import { RfiTableHeader } from '../../dashboard/rfi/rfiDashboardTableHeader/RfiTableHeader';
import { StyledUnsortableTableHeaderCell } from '../../dashboard/rfi/rfiDashboardTableHeader/UnsortableTableHeaderCell';


describe('RfiTableHeader', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RfiTableHeader
        sortKey={new SortKeyModel(Field.PRIORITY, false)}
        sortRfis={jest.fn()}
      />
    );
  });

  it('should render a header for each field', () => {
    expect(subject.find(StyledHeaderCell).length).toBe(5);
    expect(subject.find(StyledUnsortableTableHeaderCell).length).toBe(2);
  });
});
