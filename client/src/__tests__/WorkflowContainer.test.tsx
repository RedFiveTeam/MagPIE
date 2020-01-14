import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { StyledLoadingScreen } from '../workflow/loading-page/LoadingScreen';
import { StyledCoiDashboard } from '../workflow/coi-page/CoiDashboard';
import { WorkflowContainer } from '../workflow/WorkflowContainer';
import { StyledRfiDashboard } from '../workflow/rfi-page/RfiDashboard';

describe('RMDashboardContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
    // @ts-ignore
      <WorkflowContainer
        fetchRfis={()=>{}}
        postSiteVisit={()=>{}}
        loading={false}
        viewCoiPage={false}
      />);
  });

  it('should display loading screen while app is loading', () => {
    subject = shallow(
    // @ts-ignore
      <WorkflowContainer
        fetchRfis={()=>{}}
        postSiteVisit={()=>{}}
        loading={true}
        viewCoiPage={false}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeTruthy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledCoiDashboard).exists()).toBeFalsy();
    subject = shallow(
    // @ts-ignore
      <WorkflowContainer
        fetchRfis={()=>{}}
        postSiteVisit={()=>{}}
        loading={true}
        viewCoiPage={true}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeTruthy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledCoiDashboard).exists()).toBeFalsy();
  });

  it('should display the rfi page upon loading of app', () => {
    subject = shallow(
      // @ts-ignore
      <WorkflowContainer
        fetchRfis={()=>{}}
        postSiteVisit={()=>{}}
        loading={false}
        viewCoiPage={false}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeTruthy();
    expect(subject.find(StyledCoiDashboard).exists()).toBeFalsy();
  });

  it('should display the coi page when user navigates through rfi', () => {
    subject = shallow(
      // @ts-ignore
      <WorkflowContainer
        fetchRfis={()=>{}}
        postSiteVisit={()=>{}}
        loading={false}
        viewCoiPage={true}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledCoiDashboard).exists()).toBeTruthy();
  });


});
