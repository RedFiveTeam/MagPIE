import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import TitleInput from './TitleInput';

describe('TitleInput', () => {
  let subject: ShallowWrapper;
  let updateText = () => {
  };
  beforeEach(() => {
    subject = shallow(
      <TitleInput
        title={'Hello Redux!'}
        updateTitle={updateText}
      />);
  });

  it('should display a title', () => {
    expect(subject.find('.title').text()).toContain('Hello Redux!');
  });
});
