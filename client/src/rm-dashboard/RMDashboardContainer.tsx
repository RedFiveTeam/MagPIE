import React from 'react';
import { connect } from 'react-redux';
import { fetchRFIs, newSort } from './RFIActions';
import { StyledRFITable } from './rfi-table/RFITable';
import styled from 'styled-components';
import classNames from 'classnames';
import RFIModel from './RFIModel';
import { postSiteVisit } from '../users/UserActions';

interface Props {
  rfis: RFIModel[];
  sortKey: string;
  orderAscending: boolean;
  fetchRFIs: () => void;
  postSiteVisit: () => void;
  newSort: (newKey: string) => void;
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
        <StyledRFITable
          rfis={this.props.rfis}
          callback={this.props.newSort}
          sortKey={this.props.sortKey}
          orderAscending={this.props.orderAscending}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  rfis: state.rfis,
  sortKey: state.sortKey,
  orderAscending: state.orderAscending
});

const mapDispatchToProps = {
  fetchRFIs: fetchRFIs,
  postSiteVisit: postSiteVisit,
  newSort: newSort,
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(RMDashboardContainer))`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
