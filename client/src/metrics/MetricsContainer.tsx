import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchMetrics } from './MetricsActions';

interface Props {
  fetchMetrics: () => void;
  siteVisitCount: number;
  className?: string;
}

export class MetricsContainer extends React.Component<Props> {
  componentDidMount(): void {
    this.props.fetchMetrics();
  }

  render() {
    return (
      <div className={classNames('metrics-dashboard', this.props.className)}>
        {this.props.siteVisitCount}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  siteVisitCount: state.siteVisitCount
});

const mapDispatchToProps = {
  fetchMetrics: fetchMetrics,
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(MetricsContainer))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
`;
