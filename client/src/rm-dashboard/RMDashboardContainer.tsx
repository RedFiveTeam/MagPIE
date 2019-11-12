import React from 'react';
import { connect } from 'react-redux';
import { fetchRFIs } from './RFIActions';
import { StyledRFITable } from './RFITable';
import styled from 'styled-components';
import classNames from 'classnames';
import RFIModel from './RFIModel';
import { postSiteVisit } from '../users/UserActions';

interface Props {
  rfis: RFIModel[];
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
        <StyledRFITable
          rfis={this.props.rfis}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  rfis: state.rfis
});

const mapDispatchToProps = {
  fetchRFIs: fetchRFIs,
  postSiteVisit: postSiteVisit,
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(RMDashboardContainer))`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
