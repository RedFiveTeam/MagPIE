import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { RfiTableHeader } from './RfiTableHeader';
import { StyledHeaderCell } from './RfiTableHeaderCell';
import { StyledButtonSection } from './RfiTableHeaderButtonSection';

describe('RfiTableHeader', () => {
  let subject: ReactWrapper;

  beforeEach(() => {
    subject = mount(
      <RfiTableHeader
        sortByCountry={()=>{}}
        sortById={()=>{}}
        sortByCustomer={()=>{}}
        sortByLtiov={()=>{}}
        sortByPriority={()=>{}}
        fetchRfis={()=>{}}
        refreshClick={()=>{}}
      />
    );
  });

  it('should render a header for each field', () => {
    expect(subject.find(StyledHeaderCell).length).toBe(5);
  });

  it('should render a container for buttons', () => {
    expect(subject.find(StyledButtonSection).length).toBe(1);
  });
});
