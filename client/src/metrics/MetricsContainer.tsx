import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchGETSClicksMetrics, fetchSiteVisitMetrics } from './MetricsActions';

interface Props {
  fetchSiteVisitMetrics: () => void;
  fetchGETSClicksMetrics: () => void;
  siteVisits: number;
  GETSClicks: number;
  className?: string;
}

export class MetricsContainer extends React.Component<Props> {
  componentDidMount(): void {
    this.props.fetchSiteVisitMetrics();
    this.props.fetchGETSClicksMetrics();
  }

  render() {
    return (
      <div className={classNames('metrics-dashboard', this.props.className)}>
        <div className={classNames('dashboard-siteVisits', this.props.className)}>
          <span>Site Visits: {this.props.siteVisits}</span>
        </div>
        <div className={classNames('dashboard-GETSButtonClicks', this.props.className)}>
          <span>GETS URL Clicks: {this.props.GETSClicks}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  siteVisits: state.siteVisits,
  GETSClicks: state.GETSClicks
});

const mapDispatchToProps = {
  fetchSiteVisitMetrics: fetchSiteVisitMetrics,
  fetchGETSClicksMetrics: fetchGETSClicksMetrics
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(MetricsContainer))`
  
  display: flex;

  color: white;
  width: 100%;
  justify-items: center;
   flex-direction: row;
   
  .span {
  
  
  width: 50px;
  }
`;
