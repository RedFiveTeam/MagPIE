import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsDashboard } from '../../dashboard/metric/MetricsDashboard';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';

describe('MetricsContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <MetricsDashboard/>,
    );
  });

  it('should display the header and header buttons', () => {
    expect(subject.find('.metrics-header').exists()).toBeTruthy();
    expect(subject.find('.smallbord-container').exists()).toBeTruthy();
    expect(subject.find(StyledBackButtonVector).exists()).toBeTruthy();
  });

  it('should display the metrics container', () => {
    expect(subject.find('.metrics-container').exists()).toBeTruthy();
  });
});
