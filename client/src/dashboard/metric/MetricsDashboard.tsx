import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../resources/theme';
import MagpieFullLogo from '../../resources/icons/MagpieFullLogo';
import { fetchMetric } from '../../store/metrics';
import { Metric, MetricCardData, StyledMetricCard } from './MetricsCard';

interface MyProps {
  className?: string
}

export const MetricsDashboard: React.FC<MyProps> = (props) => {
  const [workflowTime, setWorkflowTime] = useState([-1, -1]);
  const [tgtsPerWeek, setTgtsPerWeek] = useState(-1);
  const [ixnsPerWeek, setIxnsPerWeek] = useState(-1);
  const [getsClicks, setGetsClicks] = useState([-1, -1]);
  const [deletions, setDeletions] = useState([-1, -1, -1, -1]);
  const [logins, setLogins] = useState(-1);

  useEffect(() => {
    fetchMetric('workflow-time')
      .then(response => response.json())
      .then(workflowTime => setWorkflowTime(workflowTime))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('targets-created-per-week')
      .then(response => response.json())
      .then(tgtsPerWeek => setTgtsPerWeek(tgtsPerWeek))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('ixns-created-per-week')
      .then(response => response.json())
      .then(ixnsPerWeek => setIxnsPerWeek(ixnsPerWeek))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('gets-clicks')
      .then(response => response.json())
      .then(getsClicks => setGetsClicks(getsClicks))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('deletions-per-week')
      .then(response => response.json())
      .then(deletions => setDeletions(deletions))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchMetric('logins-per-week')
      .then(response => response.json())
      .then(logins => setLogins(logins))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  return (
    <div className={classNames(props.className, 'metrics-dashboard')}>
      <div className={'metrics-sidebar'}><MagpieFullLogo/></div>
      <div className={'metrics-container'}>
        {workflowTime[0] > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg RFI Spent in Status',
              [
                new Metric(workflowTime[0] + ' d', 'Open'),
                new Metric(workflowTime[1] + ' d', 'New'),
              ])}
            className={'workflow-time'}
          />
          :
          null
        }
        {tgtsPerWeek > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Targets Created',
              [
                new Metric(tgtsPerWeek),
              ])}
            className={'tgts-created'}
          />
          :
          null
        }
        {ixnsPerWeek > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Interactions Created',
              [
                new Metric(ixnsPerWeek),
              ])}
            className={'ixns-created'}
          />
          :
          null
        }
        {getsClicks[0] > -1 ?
          <StyledMetricCard
            data={new MetricCardData('GETS Clicks',
              [
                new Metric(getsClicks[0], 'Open'),
                new Metric(getsClicks[1], 'New'),
              ])}
            className={'gets-clicks'}
          />
          :
          null
        }
        {deletions[0] > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Deletions',
              [
                new Metric(deletions[0], 'Dates'),
                new Metric(deletions[1], 'Targets'),
                new Metric(deletions[2], 'Segments'),
                new Metric(deletions[3], 'Interactions'),
              ])}
            className={'deletions'}
          />
          :
          null
        }
        {logins > -1 ?
          <StyledMetricCard
            data={new MetricCardData('Avg Logins',
              [
                new Metric(logins),
              ])}
            className={'logins'}
          />
          :
          null
        }
      </div>
    </div>
  );
};

export const StyledMetricsDashboard = styled(MetricsDashboard)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100vh;
  width: 100%;
  background-color: ${theme.color.backgroundLoading};
  font-family: ${theme.font.familyRow};
  font-size: ${theme.font.sizeHeader};
  font-weight: ${theme.font.weightHeader};
  color: ${theme.color.fontActive};
  
  .metrics-sidebar {
    flex: 0 0 134px;
    background-color: ${theme.color.backgroundSidebar};
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  
  .metrics-container {
    width: 100%;
    padding: 75px 15px 0 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
  }
`;
