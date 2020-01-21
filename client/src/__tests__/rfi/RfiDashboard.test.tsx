import '../../setupEnzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { StyledRfiTableHeader } from '../../workflow/rfi-page/header/RfiTableHeader';
import { RfiDashboard } from '../../workflow/rfi-page/RfiDashboard';
import { Droppable } from 'react-beautiful-dnd';
import { Field, SortKeyModel } from '../../workflow/rfi-page/models/SortKeyModel';

describe('RFITable', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RfiDashboard
        pendingRfis={[]}
        openRfis={[]}
        closedRfis={[]}
        reorderRfis={()=> {}}
        sortKey={new SortKeyModel(Field.RFINUM, true)}
      />
    );
  });

  it('should display a header', () => {
    expect(subject.find(StyledRfiTableHeader).exists()).toBeTruthy();
  });

  it('should contain three droppable regions for RFIs', () => {
    expect(subject.find(Droppable).length).toBe(3);
  });
});
