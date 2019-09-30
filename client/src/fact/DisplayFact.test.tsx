import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { DisplayFact } from './DisplayFact';

describe('DisplayFact', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <DisplayFact
        fact={'You are awesome!'}
      />);
  });

  it('should display a fact', () => {
    expect(subject.find('.fact').text()).toContain('You are awesome!');
  });
});
