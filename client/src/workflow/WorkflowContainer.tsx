import * as React from 'react';
import { connect } from 'react-redux';
import { fetchLocalUpdate, fetchRfis, postSiteVisit } from '../state/actions';
import { StyledRfiDashboard } from './rfi-page/RfiDashboard';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledLoadingScreen } from './loading-page/LoadingScreen';
import { StyledTgtDashboard } from './tgt-page/TgtDashboard';

interface Props {
  fetchRfis: () => void;
  postSiteVisit: () => Promise<any>;
  fetchLocalUpdate: () => void;
  loading: boolean;
  viewTgtPage: boolean;
  className?: string;
}

const displayScreen = (loading: boolean, viewTgtPage: boolean, className: string | undefined): any => {
  if (loading)
    return <StyledLoadingScreen />;

  if (viewTgtPage) {
    return <StyledTgtDashboard />;
  }

  return (
    <div className={classNames('rm-dashboard', className)}>
      <StyledRfiDashboard/>
    </div>
  );
};

export class WorkflowContainer extends React.Component<Props, any> {
  componentDidMount(): void {
    setInterval(() => {
      this.refreshData();
    }, 5000);

    this.props.postSiteVisit()
      .catch((reason => {console.log("Failed to post sort click metric: " + reason)}));
    this.props.fetchRfis();
  }

  private refreshData() {
    if (!this.props.loading && !this.props.viewTgtPage)
      this.props.fetchLocalUpdate();
  }

  render() {
    return displayScreen(this.props.loading, this.props.viewTgtPage, this.props.className);
  }

}

const mapStateToProps = (state: any) => ({
  loading: state.rfiReducer.loading,
  viewTgtPage: state.tgtReducer.viewTgtPage
});

const mapDispatchToProps = {
  fetchRfis: fetchRfis,
  postSiteVisit: postSiteVisit,
  fetchLocalUpdate: fetchLocalUpdate
};

export const StyledWorkflowContainer = styled(
  connect(mapStateToProps, mapDispatchToProps)(WorkflowContainer))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: inherit;
`;

