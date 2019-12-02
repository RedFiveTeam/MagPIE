import { shallow, ShallowWrapper } from 'enzyme';
import { HeaderCell } from './HeaderCell';
import React from 'react';

describe('HeaderCell', () => {
  let subject: ShallowWrapper;
  let sortSpy: jest.Mock;

  beforeEach(() => {
    sortSpy = jest.fn();
    subject = shallow(
      <HeaderCell
        text={'title'}
        sort={sortSpy}
      />
    );
  });

  it('should display given text', () => {
    expect(subject.text()).toContain('title');
  });

  it('should call the given sorting function on click', () => {
    subject.simulate('click');
    expect(sortSpy).toHaveBeenCalled();
  });
});
