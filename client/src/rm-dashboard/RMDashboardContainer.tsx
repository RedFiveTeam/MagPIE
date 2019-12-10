import React from 'react';
import { connect } from 'react-redux';
import { fetchRFIs } from './RFIActions';
import { StyledRFITable } from './rfi-table/RFITable';
import styled from 'styled-components';
import classNames from 'classnames';
import { postSiteVisit } from '../users/UserActions';
import { StyledLoadingScreen } from './LoadingScreen';

interface Props {
  fetchRFIs: () => void;
  postSiteVisit: () => void;
  loading: boolean;
  className?: string;
}

const displayScreen = (loading: boolean, className: string | undefined): any => {
  if (loading)
    return <StyledLoadingScreen/>;

  return (
    <div className={classNames('rm-dashboard', className)}>
      <StyledRFITable/>
    </div>
  );
};

export class RMDashboardContainer extends React.Component<Props> {
  componentDidMount(): void {
    this.props.postSiteVisit();
    this.props.fetchRFIs();
  }

  render() {
    return displayScreen(this.props.loading, this.props.className);
  }
}

const mapStateToProps = (state: any) => ({
  loading: state.loading
});

const mapDispatchToProps = {
  fetchRFIs: fetchRFIs,
  postSiteVisit: postSiteVisit,
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(RMDashboardContainer))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: inherit;
`;
