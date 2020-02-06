import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { StyledLoadingScreen } from '../workflow/loading-page/LoadingScreen';
import { StyledTgtDashboard } from '../workflow/tgt-page/TgtDashboard';
import { WorkflowContainer } from '../workflow/WorkflowContainer';
import { StyledRfiDashboard } from '../workflow/rfi-page/RfiDashboard';
import '../setupEnzyme';
import { StyledIxnDashboard } from '../workflow/ixn-page/IxnDashboard';

describe('WorkflowContainer', () => {
  let subject: ShallowWrapper;

  it('should display loading screen while app is loading', () => {
    subject = shallow(
      <WorkflowContainer
        fetchRfis={()=>{}}
        fetchLocalUpdate={()=>{}}
        navigateToTgtPage={()=>{}}
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
      <WorkflowContainer
        fetchRfis={()=>{}}
        fetchLocalUpdate={()=>{}}
        navigateToTgtPage={()=>{}}
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
      <WorkflowContainer
        fetchRfis={()=>{}}
        fetchLocalUpdate={()=>{}}
        navigateToTgtPage={()=>{}}
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
      <WorkflowContainer
        fetchRfis={()=>{}}
        fetchLocalUpdate={()=>{}}
        navigateToTgtPage={()=>{}}
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
      <WorkflowContainer
        fetchRfis={()=>{}}
        fetchLocalUpdate={()=>{}}
        navigateToTgtPage={()=>{}}
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
