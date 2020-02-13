import * as React from 'react';
import '../../setupEnzyme';
import { mount, ReactWrapper } from 'enzyme';
import { TgtTableHeader } from '../../dashboard/tgt/tgtTable/header/TgtTableHeader';

describe('TgtTableHeader', () => {
  it('should display all the proper headers', () => {
    let subject: ReactWrapper;
    subject = mount(
      <TgtTableHeader />
    );

    expect(subject.find('.header--name').text()).toContain('TGT Name');
    expect(subject.find('.header--mgrs').text()).toContain('MGRS');
    expect(subject.find('.header--notes').text()).toContain('EEI Notes');
    expect(subject.find('.header--description').text()).toContain('TGT Description');
    // expect(subject.find('.header--status').text()).toContain('Status');
    expect(subject.find('.header--delete').text()).toContain('Delete');
    expect(subject.find('.header--exploitation').text()).toContain('Exploitation');

  });

});
