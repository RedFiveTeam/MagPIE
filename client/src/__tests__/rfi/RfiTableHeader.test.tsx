import '../../setupEnzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { RfiTableHeader } from '../../workflow/rfi-page/header/RfiTableHeader';
import { StyledHeaderCell } from '../../workflow/rfi-page/header/RfiTableHeaderCell';
import { StyledButtonSection } from '../../workflow/rfi-page/header/RfiTableHeaderButtonSection';
import { StyledUnsortableHeaderCell } from '../../workflow/rfi-page/header/RfiTableUnsortableHeaderCell';
import { Field, SortKeyModel } from '../../workflow/rfi-page/models/SortKeyModel';

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
    expect(subject.find(StyledUnsortableHeaderCell).length).toBe(2);
  });

  it('should render a container for buttons', () => {
    expect(subject.find(StyledButtonSection).length).toBe(1);
  });
});
