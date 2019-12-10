import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { RMDashboardContainer } from './RMDashboardContainer';
import { StyledLoadingScreen } from './LoadingScreen';

describe('RMDashboardContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
        <RMDashboardContainer
        fetchRFIs={()=>{}}
        postSiteVisit={()=>{}}
        loading={false}
        />
    );
  });

  it('should display loading screen while app is loading', () => {
    expect(subject.find(StyledLoadingScreen).exists).toBeTruthy();
  });

  it('should display the rm dashboard upon loading of app', () => {
    subject = shallow(
      <RMDashboardContainer fetchRFIs={()=>{}} postSiteVisit={()=>{}} loading={true}/>
    );
    setTimeout(() => {
      expect(subject.find('.rm-dashboard').exists()).toBeTruthy();
    }, 1000);

  });

});
