import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { RfiTableHeader } from './RfiTableHeader';
import { StyledHeaderCell } from './HeaderCell';

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
      />
    );
  });

  it('should container a header for each field', () => {
    expect(subject.find(StyledHeaderCell).length).toBe(5);
  });
});
