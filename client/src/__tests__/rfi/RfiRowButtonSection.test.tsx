import { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { RfiRowButtonSection } from '../../workflow/rfi-page/row/RfiRowButtonSection';
import '../../setupEnzyme';

describe('RfiRowButtonSection', () => {
  let subject: ShallowWrapper;
  let postGetsClickSpy: jest.Mock;

  beforeEach(() => {
    postGetsClickSpy = jest.fn().mockResolvedValue("This prevents a warning by giving .catch() a value");
    window.open = jest.fn();
    subject = shallow(
      <RfiRowButtonSection
        status={RfiStatus.OPEN}
        url={""}
        postGetsClick={postGetsClickSpy}
      />
    )
  });

  it('should display the GETS button', () => {
    expect(subject.find('.cell--view-in-gets').text()).toContain('View in GETS');
  });

  it('should call the given postGetsClick function on click', () => {
    subject.find('.section--button').simulate('click');
    expect(postGetsClickSpy).toHaveBeenCalled();
  });


});
