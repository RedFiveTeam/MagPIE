import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchGetsClicksMetrics, fetchSiteVisitMetrics, fetchSiteVisitsGraphWeek } from './MetricsActions';
import { Bar, defaults } from 'react-chartjs-2';

interface Props {
  fetchSiteVisitMetrics: () => void;
  fetchGetsClicksMetrics: () => void;
  fetchSiteVisitsGraphWeek: () => void;
  siteVisits: number;
  GetsClicks: number;
  siteVisitsGraphWeek: number[];
  className?: string;
}

export class MetricsContainer extends React.Component<Props> {
  componentDidMount(): void {
    this.props.fetchSiteVisitMetrics();
    this.props.fetchGetsClicksMetrics();
    this.props.fetchSiteVisitsGraphWeek();
  }

  setupData(visits: number[]) {
    defaults.global.defaultFontFamily = "Roboto";
    defaults.global.defaultFontColor = "#FEFEFE";
    defaults.global.defaultFontSize = 14;
    const data = {
      labels: ['6 Days Ago', '5 Days Ago', '4 Days Ago', '3 Days Ago', '2 Days Ago', 'Yesterday', 'Today'],
      datasets: [
        {
          label: 'Site visits',
          backgroundColor: 'rgba(42,58,136,0.4)',
          borderColor: 'rgba(42,58,136,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(42,58,213,0.4)',
          hoverBorderColor: 'rgba(42,58,213,1)',
          data: visits,
        }
      ]
    };
    return data;
  }

  render() {
    return (
      <div className={classNames('metrics-dashboard', this.props.className)}>
        <div className={classNames('dashboard-siteVisits', this.props.className)}>
          <span>Site Visits: {this.props.siteVisits}</span>
        </div>
        <div className={classNames('dashboard-GETSButtonClicks', this.props.className)}>
          <span>GETS URL Clicks: {this.props.GetsClicks}</span>
        </div>
        <div className={classNames('dashboard-siteVisitsGraphWeek', this.props.className)}>
          <Bar
            data={this.setupData(this.props.siteVisitsGraphWeek)}
            width={100}
            height={50}
            options={{maintainAspectRatio: false}}
          />
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state: any) => ({
  siteVisits: state.metricsReducer.siteVisits,
  GetsClicks: state.metricsReducer.GetsClicks,
  siteVisitsGraphWeek: state.metricsReducer.siteVisitsGraphWeek
});

const mapDispatchToProps = {
  fetchSiteVisitMetrics: fetchSiteVisitMetrics,
  fetchGetsClicksMetrics: fetchGetsClicksMetrics,
  fetchSiteVisitsGraphWeek: fetchSiteVisitsGraphWeek
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(MetricsContainer))`
  display: flex;
  color: white;
  width: 100%;
  justify-items: center;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;  
   
  .span {
    width: 50px;
  }
  
  .metrics-dashboard {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;    
  }
  
  .dashboard-siteVisits {
    width: 150px;
  }
  
  .dashboard-GETSButtonClicks {
    width: 200px;
  }
  
  .dashboard-siteVisitsGraphWeek {
    width: 1000px;
    height: 500px;
  }
  
`;
