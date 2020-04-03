import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { RfiDashboard } from '../../dashboard/rfi/RfiDashboard';
import { Droppable } from 'react-beautiful-dnd';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import { StyledRfiTableHeader } from '../../dashboard/rfi/rfiDashboardTableHeader/RfiTableHeader';

describe('RFI dashboard', () => {
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
