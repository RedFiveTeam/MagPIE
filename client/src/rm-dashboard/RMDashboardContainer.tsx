import React from 'react';
import { connect } from 'react-redux';
import { fetchRFIs } from './RFIActions';
import { StyledRFITable } from './rfi-table/RFITable';
import styled from 'styled-components';
import classNames from 'classnames';
import { postSiteVisit } from '../users/UserActions';

interface Props {
  fetchRFIs: () => void;
  postSiteVisit: () => void;
  className?: string;
}

export class RMDashboardContainer extends React.Component<Props> {
  componentDidMount(): void {
    this.props.postSiteVisit();
    this.props.fetchRFIs();
  }

  render() {
    return (
      <div className={classNames('rm-dashboard', this.props.className)}>
        <StyledRFITable/>
      </div>
    )
  }
}

const mapStateToProps = () => ({
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
