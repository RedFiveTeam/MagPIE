import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import theme from '../../resources/theme';
import { MetricCardData, StyledMetricCard } from '../metric/MetricsCard';
import { useDispatch } from 'react-redux';
import { exitUserMetricsPage } from '../../store/rfi';
import DatePickerIcon from '../../resources/icons/DatePickerIcon';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { fetchUserMetric } from '../../store/metrics';

interface MyProps {
  className?: string;
}

export const UserMetricsDashboard: React.FC<MyProps> = (props) => {
  const moment = require('moment');
  const magPieBeginning = new Date(moment('2019-10-01').unix() * 1000 + 60000 * new Date().getTimezoneOffset());

  const [startDate, setStartDate] = useState(magPieBeginning as Date|null);
  const [endDate, setEndDate] = useState(new Date() as Date|null);
  const [completedRfis, setCompletedRfis] = useState(-1);
  const [targetsCreated, setTargetsCreated] = useState(-1);
  const [hoursWorked, setHoursWorked] = useState(-1);
  const [uniqueCustomers, setUniqueCustomers] = useState(-1);

  const [displayStartPicker, setDisplayStartPicker] = useState(false);
  const [displayEndPicker, setDisplayEndPicker] = useState(false);

  const dispatch = useDispatch();

  const handleExit = () => {
    dispatch(exitUserMetricsPage());
  };

  useEffect(() => {
    console.log(startDate);
    console.log(endDate);
    fetchUserMetric('rfis-completed', startDate, endDate)
      .then(response => response.json())
      .then(rfis => setCompletedRfis(rfis))
      .catch((reason) => {
        console.log('Failed to fetch RFIS completed: ' + reason);
      });
  }, [startDate, endDate]);


  useEffect(() => {
    fetchUserMetric('targets-created', startDate, endDate)
      .then(response => response.json())
      .then(targets => setTargetsCreated(targets))
      .catch((reason) => {
        console.log('Failed to fetch targets created: ' + reason);
      });
  }, [startDate, endDate]);

  useEffect(() => {
    fetchUserMetric('hours-worked', startDate, endDate)
      .then(response => response.json())
      .then(hoursWorked => setHoursWorked(hoursWorked))
      .catch((reason) => {
        console.log('Failed to fetch hours worked: ' + reason);
      });
  }, [startDate, endDate]);

  useEffect(() => {
    fetchUserMetric('unique-customers', startDate, endDate)
      .then(response => response.json())
      .then(uniqueCustomers => setUniqueCustomers(uniqueCustomers))
      .catch((reason) => {
        console.log('Failed to fetch unique customers: ' + reason);
      });
  }, [startDate, endDate]);

  return (
    <div className={classNames(props.className, 'metrics-dashboard')}>
      <div className='metrics-header'>
        <div className={'metrics-header--back-button'} onClick={handleExit}>
          <StyledBackButtonVector/>
        </div>
        <div className={'smallbord-container'}>
          <img src={'smallbord.png'} alt={'logo'} height={'63px'}/>
        </div>
      </div>
      <div className={'datepickers-container'}>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}>
          <div className={'datepicker-date'}>
            <DatePicker
              value={startDate}
              onChange={date => setStartDate(date)}
              animateYearScrolling
              minDate={magPieBeginning}
              maxDate={endDate}
              open={displayStartPicker}
              onClose={() => setDisplayStartPicker(false)}
              InputProps={{
                disableUnderline: true,
              }}
              format={'MM/dd/yy'}
            />
          </div>
          <div onClick={() => setDisplayStartPicker(true)}>
            <DatePickerIcon/>
          </div>
          <div className={'datepicker-spacer no-select'}>
            —
          </div>
          <div className={'datepicker-date'}>
            <DatePicker
              value={endDate}
              onChange={date => setEndDate(date)}
              animateYearScrolling
              minDate={startDate}
              maxDate={new Date()}
              open={displayEndPicker}
              onClose={() => setDisplayEndPicker(false)}
              InputProps={{
                disableUnderline: true,
              }}
              format={'MM/dd/yy'}
            />
          </div>
          <div onClick={() => setDisplayEndPicker(true)}>
            <DatePickerIcon/>
          </div>
        </MuiPickersUtilsProvider>
      </div>
      <div className={'metrics-container'}>
        {completedRfis >= 0 ?
          <StyledMetricCard
            data={new MetricCardData('RFIs Completed', completedRfis)}
            className={'rfis-completed'}
          />
          :
          null
        }
        {targetsCreated >= 0 ?
          <StyledMetricCard
            data={new MetricCardData('Targets Created', targetsCreated)}
            className={'targets-created'}
          />
          :
          null
        }
        {hoursWorked >= 0 ?
          <StyledMetricCard
            data={new MetricCardData('Hours Worked', hoursWorked)}
            className={'hours-worked'}
          />
          :
          null
        }
        {uniqueCustomers >= 0 ?
          <StyledMetricCard
            data={new MetricCardData('Requesting Customers', uniqueCustomers)}
            className={'requesting-customers'}
          />
          :
          null
        }
      </div>
    </div>
  );
};

export const StyledUserMetricsDashboard = styled(UserMetricsDashboard)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
  width: 100%;
  background-color: ${theme.color.backgroundLoading};
  font-family: ${theme.font.familyRow};
  font-size: ${theme.font.sizeHeader};
  font-weight: ${theme.font.weightHeader};
  color: ${theme.color.fontActive};
  
    .metrics-header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: ${theme.color.backgroundHeader};
    margin-bottom: 17px;
    flex: 0 0 63px;
  }
  
  .metrics-header--back-button {
    cursor: pointer;
    padding-left: 18px;
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: ${theme.color.backgroundAction};
  }
  
  .metrics-container {
    margin-top: 11px;
    width: 100%;
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    overflow-y: auto;
  }
  
  .datepickers-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  
  .datepicker-spacer {
    width: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
  }
  
  .datepicker-date {
    input {
      font-size: 22px;
      font-weight: bold;
    }
    width: 93px;
  }
`;
