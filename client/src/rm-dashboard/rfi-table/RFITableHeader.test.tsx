import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { RFITableHeader } from './RFITableHeader';
import { StyledHeaderCell } from './HeaderCell';

describe('Dashboard tests', () => {
  let subject: ReactWrapper;

  beforeEach(() => {
    subject = mount(
      <RFITableHeader
        sortByCountry={()=>{}}
        sortById={()=>{}}
        sortByCustomer={()=>{}}
        sortByLtiov={()=>{}}
      />
    );
  });

  it('should container a header for each field', () => {
    expect(subject.find(StyledHeaderCell).length).toBe(4);
  });
});
