import React from 'react';
import { connect } from 'react-redux';
import { fetchRfis } from './RfiActions';
import { StyledRfiTable } from './rfi-table/RfiTable';
import styled from 'styled-components';
import classNames from 'classnames';
import { postSiteVisit } from '../users/UserActions';
import { StyledLoadingScreen } from './LoadingScreen';

interface Props {
  fetchRfis: () => void;
  postSiteVisit: () => void;
  loading: boolean;
  className?: string;
}

const displayScreen = (loading: boolean, className: string | undefined): any => {
  if (loading)
    return <StyledLoadingScreen/>;

  return (
    <div className={classNames('rm-dashboard', className)}>
      <StyledRfiTable/>
    </div>
  );
};

export class RmDashboardContainer extends React.Component<Props, any> {
  componentDidMount(): void {
    this.props.postSiteVisit();
    this.props.fetchRfis();
  }

  render() {
    return displayScreen(this.props.loading, this.props.className);
  }
}

const mapStateToProps = (state: any) => ({
  loading: state.rfiReducer.loading
});

const mapDispatchToProps = {
  fetchRfis: fetchRfis,
  postSiteVisit: postSiteVisit,
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(RmDashboardContainer))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: inherit;
`;
