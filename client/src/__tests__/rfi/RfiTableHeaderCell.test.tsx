import '../../setupEnzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import { RfiTableHeaderCell } from '../../workflow/rfi-page/header/RfiTableHeaderCell';
import * as React from 'react';
import { Field, SortKeyModel } from '../../workflow/rfi-page/models/SortKeyModel';
import ActiveUpperSortButtonVector from '../../resources/icons/ActiveUpperSortButton';
import LowerSortButtonVector from '../../resources/icons/LowerSortButton';
import UpperSortButtonVector from '../../resources/icons/UpperSortButton';
import ActiveLowerSortButtonVector from '../../resources/icons/ActiveLowerSortButton';

describe('HeaderCell', () => {
  let subject: ShallowWrapper;
  let sortSpy: jest.Mock;

  beforeEach(() => {
    sortSpy = jest.fn();
    subject = shallow(
      <RfiTableHeaderCell
        text={'title'}
        sort={sortSpy}
        sortKey={new SortKeyModel(Field.PRIORITY, true)}
        field={Field.PRIORITY}
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

  it('should display appropriate sort icons when order is different', () => {
    expect(subject.find(ActiveUpperSortButtonVector).exists()).toBeTruthy();
    expect(subject.find(UpperSortButtonVector).exists()).toBeFalsy();
    expect(subject.find(ActiveLowerSortButtonVector).exists()).toBeFalsy();
    expect(subject.find(LowerSortButtonVector).exists()).toBeTruthy();
    subject = shallow(
      <RfiTableHeaderCell
        text={'title'}
        sort={sortSpy}
        sortKey={new SortKeyModel(Field.PRIORITY, false)}
        field={Field.PRIORITY}
      />
    );
    expect(subject.find(ActiveUpperSortButtonVector).exists()).toBeFalsy();
    expect(subject.find(UpperSortButtonVector).exists()).toBeTruthy();
    expect(subject.find(ActiveLowerSortButtonVector).exists()).toBeTruthy();
    expect(subject.find(LowerSortButtonVector).exists()).toBeFalsy();
  });
});
