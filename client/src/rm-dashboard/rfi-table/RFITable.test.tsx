import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { StyledRFITableHeader } from './RFITableHeader';
import { RFITable } from './RFITable';
import { Field, SortKey } from '../SortKey';
import { Droppable } from 'react-beautiful-dnd';

describe('RFITable', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RFITable
        pendingRfis={[]}
        openRfis={[]}
        closedRfis={[]}
        reorderRfis={()=> {}}
        sortKey={new SortKey(Field.PRIORITY, true)}
      />
    );
  });

  it('should display a header', () => {
    expect(subject.find(StyledRFITableHeader).exists()).toBeTruthy();
  });

  it('should contain three droppable regions for RFIs', () => {
    expect(subject.find(Droppable).length).toBe(3);
  });
});
