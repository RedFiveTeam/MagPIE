import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { RFITableHeader } from './RFITableHeader';

describe('Dashboard tests', () => {
  let subject: ReactWrapper;
  let callbackSpy: jest.Mock;

  beforeEach(() => {

    callbackSpy = jest.fn();
    subject = mount(
      <RFITableHeader
        sortKey={"ltiov"}
        callback={callbackSpy}
        orderAscending={true}
      />
    );

  });

  it('should call sort with proper key', () => {
    subject.find('.sort--ltiov').simulate('click');
    expect(callbackSpy).toHaveBeenCalledWith('ltiov');
    subject.find('.sort--country').simulate('click');
    expect(callbackSpy).toHaveBeenCalledWith('country');
  });

});
