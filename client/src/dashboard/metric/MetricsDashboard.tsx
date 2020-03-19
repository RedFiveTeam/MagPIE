import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../resources/theme';
import MagpieFullLogo from '../../resources/icons/MagpieFullLogo';
import { fetchTgtsCreatedPerWeek, fetchWorkflowTime } from '../../store/metrics';

interface MyProps {
  className?: string
}

export const MetricsDashboard: React.FC<MyProps> = (props) => {
  const [workflowTime, setWorkflowTime] = useState([-1, -1]);
  const [tgtsPerWeek, setTgtsPerWeek] = useState(-1);

  useEffect(() => {
    fetchWorkflowTime()
      .then(response => response.json())
      .then(workflowTime => setWorkflowTime(workflowTime))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  useEffect(() => {
    fetchTgtsCreatedPerWeek()
      .then(response => response.json())
      .then(tgtsPerWeek => setTgtsPerWeek(tgtsPerWeek))
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  return (
    <div className={classNames(props.className, 'metrics-dashboard')}>
      <div className={'metrics-sidebar'}><MagpieFullLogo/></div>
      <div className={'metrics-container'}>
        {workflowTime[0] > -1 ?
          <div className={'card'}>
            <div className={'card-header'}>
              Avg RFI Spent in Status
            </div>
            <div className={'card-body'}>
              <div className={'card-row'}>
                <span>Open</span>
                <span><b>{workflowTime[0]} d</b></span>
              </div>
              <div className={'card-row'}>
                <span>New</span>
                <span><b>{workflowTime[1]} d</b></span>
              </div>
            </div>
          </div>
          :
          null
        }
        {tgtsPerWeek > -1 ?
          <div className={'card'}>
            <div className={'card-header'}>
              Avg Targets Created
            </div>
            <div className={'card-body'}>
              <span>{tgtsPerWeek}</span>
            </div>
          </div>
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
    padding-top: 93px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  
  .card {
    width: 294px;
    height: 201px;
    margin-left: 36px;
    background-color: ${theme.color.backgroundMetricsCard};
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    padding-top: 12px;
  }
  
  .card-header {
    color: ${theme.color.fontMetricsHeader};
    font-size: ${theme.font.sizeMetricsHeader};
    font-weight: ${theme.font.weightBold};
    text-align: center;
    width: 100%;
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 157px;
    font-size: ${theme.font.sizeBigMetric};
    font-weight: bold;
  }
  
  .card-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 13px 34px 13px 34px;
    width: 100%;
    font-weight: normal;
      font-size: ${theme.font.sizeHeader};
  }
`;
