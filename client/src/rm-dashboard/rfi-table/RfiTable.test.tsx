import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { StyledRfiTableHeader } from './RfiTableHeader';
import { RfiTable } from './RfiTable';
import { Droppable } from 'react-beautiful-dnd';
import { Field, SortKeyModel } from '../SortKeyModel';

describe('RFITable', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RfiTable
        pendingRfis={[]}
        openRfis={[]}
        closedRfis={[]}
        reorderRfis={()=> {}}
        sortKey={new SortKeyModel(Field.ID, true)}
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
