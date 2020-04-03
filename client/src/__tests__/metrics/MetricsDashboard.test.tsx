import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsDashboard } from '../../dashboard/metric/MetricsDashboard';
import MagpieFullLogo from '../../resources/icons/MagpieFullLogo';

describe('MetricsContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <MetricsDashboard/>,
    );
  });

  it('should display the sidebar', () => {
    expect(subject.find('.metrics-sidebar').exists()).toBeTruthy();
    expect(subject.find(MagpieFullLogo).exists()).toBeTruthy();
  });
});
