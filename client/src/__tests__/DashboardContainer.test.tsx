import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { StyledTgtDashboard } from '../dashboard/tgt/TgtDashboard';
import { StyledRfiDashboard } from '../dashboard/rfi/RfiDashboard';
import '../setupEnzyme';
import { StyledIxnDashboard } from '../dashboard/ixn/IxnDashboard';
import { DashboardContainer } from '../dashboard/DashboardContainer';
import { StyledLoadingScreen } from '../dashboard/components/loading/LoadingScreen';

describe('WorkflowContainer', () => {
  let subject: ShallowWrapper;

  it('should display loading screen while app is loading', () => {
    subject = shallow(
      <DashboardContainer
        fetchRfis={()=>{}}
        fetchLocalUpdate={()=>{}}
        loadTgtPage={()=>{}}
        postSiteVisit={()=>{return new Promise((resolve, reject) => {})}}
        loading={true}
        viewTgtPage={false}
        viewIxnPage={false}
        rfi={undefined}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeTruthy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
    subject = shallow(
      <DashboardContainer
        fetchRfis={()=>{}}
        fetchLocalUpdate={()=>{}}
        loadTgtPage={()=>{}}
        postSiteVisit={()=>{return new Promise((resolve, reject) => {})}}
        loading={true}
        viewTgtPage={true}
        viewIxnPage={false}
        rfi={undefined}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeTruthy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
  });

  it('should display the rfi page upon loading of app', () => {
    subject = shallow(
      <DashboardContainer
        fetchRfis={()=>{}}
        fetchLocalUpdate={()=>{}}
        loadTgtPage={()=>{}}
        postSiteVisit={()=>{return new Promise((resolve, reject) => {})}}
        loading={false}
        viewTgtPage={false}
        viewIxnPage={false}
        rfi={undefined}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeTruthy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
  });

  it('should display the tgt page when user navigates through rfi', () => {
    subject = shallow(
      <DashboardContainer
        fetchRfis={()=>{}}
        fetchLocalUpdate={()=>{}}
        loadTgtPage={()=>{}}
        postSiteVisit={()=>{return new Promise((resolve, reject) => {})}}
        loading={false}
        viewTgtPage={true}
        viewIxnPage={false}
        rfi={undefined}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeTruthy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
  });

  it('should display the ixn page when user navigates through tgt', () => {
    subject = shallow(
      <DashboardContainer
        fetchRfis={()=>{}}
        fetchLocalUpdate={()=>{}}
        loadTgtPage={()=>{}}
        postSiteVisit={()=>{return new Promise((resolve, reject) => {})}}
        loading={false}
        viewTgtPage={true}
        viewIxnPage={true}
        rfi={undefined}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeTruthy();
  });


});
