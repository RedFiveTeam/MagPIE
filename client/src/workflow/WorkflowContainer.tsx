import React from 'react';
import { connect } from 'react-redux';
import { fetchRfis } from '../state/actions';
import { StyledRfiDashboard } from './rfi-page/RfiDashboard';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledLoadingScreen } from './loading-page/LoadingScreen';
import { StyledCoiDashboard } from './coi-page/CoiDashboard';
import { postSiteVisit } from '../state/actions';

interface Props {
  fetchRfis: () => void;
  postSiteVisit: () => void;
  loading: boolean;
  viewCoiPage: boolean;
  className?: string;
}

const displayScreen = (loading: boolean, viewCoiPage: boolean, className: string | undefined): any => {
  if (loading)
    return <StyledLoadingScreen/>;
  if (viewCoiPage) {
    return <StyledCoiDashboard/>;
  }
  return (
    <div className={classNames('rm-dashboard', className)}>
      <StyledRfiDashboard/>
    </div>
  );
};

export class WorkflowContainer extends React.Component<Props, any> {
  componentDidMount(): void {
    this.props.postSiteVisit();
    this.props.fetchRfis();
  }

  render() {
    return displayScreen(this.props.loading, this.props.viewCoiPage, this.props.className);
  }
}

const mapStateToProps = (state: any) => ({
  loading: state.rfiReducer.loading,
  viewCoiPage: state.coiReducer.viewCoiPage
});

const mapDispatchToProps = {
  fetchRfis: fetchRfis,
  postSiteVisit: postSiteVisit,
};

export const StyledWorkflowContainer = styled(
  connect(mapStateToProps, mapDispatchToProps)(WorkflowContainer))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: inherit;
`;

