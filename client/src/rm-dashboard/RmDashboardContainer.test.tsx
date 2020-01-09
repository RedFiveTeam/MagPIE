import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { RmDashboardContainer } from './RmDashboardContainer';
import { StyledLoadingScreen } from './LoadingScreen';

describe('RMDashboardContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<RmDashboardContainer fetchRfis={()=>{}} postSiteVisit={()=>{}} loading={false}/>);
  });

  it('should display loading screen while app is loading', () => {
    expect(subject.find(StyledLoadingScreen).exists).toBeTruthy();
  });

  it('should display the rm dashboard upon loading of app', () => {
    subject = shallow(<RmDashboardContainer fetchRfis={()=>{}} postSiteVisit={()=>{}} loading={true}/>);
    setTimeout(() => {
      expect(subject.find('.rm-dashboard').exists()).toBeTruthy();
    }, 1000);

  });

});
