import * as React from 'react';
import { connect } from 'react-redux';
import { StyledRfiDashboard } from './rfi/RfiDashboard';
import styled from 'styled-components';
import classNames from 'classnames';
import { ApplicationState } from '../store';
import { StyledTgtDashboard } from './tgt/TgtDashboard';
import { StyledIxnDashboard } from './ixn/IxnDashboard';
import RfiModel from '../store/rfi/RfiModel';
import { StyledLoadingScreen } from './components/loading/LoadingScreen';
import { fetchLocalUpdate, fetchRfis } from '../store/rfi/Thunks';
import { postSiteVisit } from '../store/metrics';
import { loadTgtPage } from '../store/tgt/Thunks';

interface Props {
  fetchRfis: () => void;
  postSiteVisit: () => Promise<any>;
  fetchLocalUpdate: () => void;
  loadTgtPage: (rfi: RfiModel, firstLoad: boolean) => void;
  rfi: RfiModel | undefined;
  loading: boolean;
  viewTgtPage: boolean;
  viewIxnPage: boolean;
  className?: string;
}

export class DashboardContainer extends React.Component<Props, any> {
  componentDidMount(): void {
    setInterval(() => {
      this.refreshRfis();
    }, 5000);

    setInterval(() => {
      this.refreshTgts();
    }, 5000);

    this.props.postSiteVisit()
      .catch((reason => {
        console.log("Failed to post sort click metric: " + reason)
      }));
    this.props.fetchRfis();
  }

  private refreshRfis() {
    if (!this.props.loading && !this.props.viewTgtPage)
      this.props.fetchLocalUpdate();
  }

  private refreshTgts() {
    if (this.props.viewTgtPage && !this.props.viewIxnPage && this.props.rfi)
      this.props.loadTgtPage(this.props.rfi, false);
  }

  render() {
    if (this.props.loading)
      return <StyledLoadingScreen/>;

    if (this.props.viewIxnPage) {
      return <StyledIxnDashboard/>
    }

    if (this.props.viewTgtPage) {
      return <StyledTgtDashboard/>;
    }

    return (
      <div className={classNames('rm-dashboard', this.props.className)}>
        <StyledRfiDashboard/>
      </div>
    );
    // return displayScreen(this.props.loading, this.props.viewTgtPage, this.props.viewIxnPage, this.props.className);
  }

}

const mapStateToProps = ({rfis, tgts, ixns}: ApplicationState) => ({
  loading: rfis.loading,
  viewTgtPage: tgts.viewTgtPage,
  viewIxnPage: ixns.viewIxnPage,
  rfi: tgts.rfi
});

const mapDispatchToProps = {
  fetchRfis: fetchRfis,
  postSiteVisit: postSiteVisit,
  fetchLocalUpdate: fetchLocalUpdate,
  loadTgtPage: loadTgtPage
};

export const StyledWorkflowContainer = styled(
  connect(mapStateToProps, mapDispatchToProps)(DashboardContainer))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: inherit;
`;

