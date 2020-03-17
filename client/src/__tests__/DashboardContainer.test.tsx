import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { StyledTgtDashboard } from '../dashboard/tgt/TgtDashboard';
import { StyledRfiDashboard } from '../dashboard/rfi/RfiDashboard';
import '../setupEnzyme';
import { StyledIxnDashboard } from '../dashboard/ixn/IxnDashboard';
import { DashboardContainer } from '../dashboard/DashboardContainer';
import { StyledLoadingScreen } from '../dashboard/components/loading/LoadingScreen';
import { StyledLoginDashboard } from '../dashboard/login/LoginDashboard';

describe('WorkflowContainer', () => {
  let subject: ShallowWrapper;


  it('should display a login page when not logged in', () => {
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
        user={undefined}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeTruthy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
  });

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
        user={'billy.bob.joe'}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeTruthy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeFalsy();
  });

  it('should display the rfi page upon logging in', () => {
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
        user={'billy.bob.joe'}
      />);
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
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
        user={'billy.bob.joe'}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
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
        user={'billy.bob.joe'}
      />);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledLoginDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledRfiDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledTgtDashboard).exists()).toBeFalsy();
    expect(subject.find(StyledIxnDashboard).exists()).toBeTruthy();
  });
});
