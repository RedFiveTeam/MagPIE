import styled from 'styled-components';
import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import RfiModel from '../rfi-page/models/RfiModel';
import { exitTgtPage, setDatePlaceholder, updateRfiDate } from '../../state/actions';
import BackButtonVector from '../../resources/icons/BackButtonVector';
import Flatpickr from 'react-flatpickr';
import '../../resources/flatpickr.css'
import { formatRfiNum } from '../../utils';
import { Moment } from 'moment';
import { StyledTgtDateDivider } from './TgtDateDivider';
import { StyledTgtTable } from './TgtTable';
import moment from 'moment';
import AddDateVector from '../../resources/icons/AddDateVector';
import { StyledTgtTableHeader } from './header/TgtTableHeader';

interface Props {
  rfi: RfiModel;
  dates: Moment[];
  showDatePlaceholder: boolean;
  exitTgtPage: () => void;
  updateRfiDate: (rfi: RfiModel, date: Date) => void;
  setDatePlaceholder: (show: boolean) => void;
  className?: string;
}

export const TgtDashboard: React.FC<Props> = props => {

  function printDates(dates: Moment[]) {
    return dates.map((exploitDate: Moment, index: number) =>
      <StyledTgtDateDivider
        key={index}
        index={index}
        exploitDate={exploitDate.utc().format("D MMM YY")}
        className={"date-divider--" + moment(exploitDate).format("D-MMM-YY")}
      />
    );
  }

  return (

    <div className={classNames(props.className)}>
      <div className={'tgt-dash--header'}>
        <div className={'tgt-dash--header--back-button'} onClick={props.exitTgtPage}>
          <BackButtonVector/>
          <span>Go Back</span>
        </div>
        <div className={'tgt-dash--header--rfi-num-container'}>
          <span className={'tgt-dash--header--rfi-num'}>RFI: {formatRfiNum(props.rfi.rfiNum)}</span>
        </div>
        <div className={'tgt-dash--header--filler'}>
          &nbsp;
        </div>
      </div>

      <div className={'tgt-dash-body'}>
        <StyledTgtTable>
          {props.dates.length > 0 || props.showDatePlaceholder ?
            <StyledTgtTableHeader/>
            :
            <></>
          }
          {printDates(props.dates)}
          {props.showDatePlaceholder ?
            <StyledTgtDateDivider
              exploitDate={"DDMMMYY"}
              className={"date-divider--placeholder"}
            />
            :
            <></>
          }
        </StyledTgtTable>

        <div className={'tgt-dash-add-date-button'}>
          <Flatpickr
            placeholder={'Add Date       '}
            onOpen={() => {
              props.setDatePlaceholder(true);
            }}
            onClose={newDates => {
              if (newDates[0] !== undefined) {
                props.updateRfiDate(props.rfi, newDates[0]);
              } else {
                props.setDatePlaceholder(false);
              }
            }}
            options={{
              mode: "single",
              maxDate: "today",
              dateFormat: ""
            }}
          />
          <div className={'add-date-vector'}><AddDateVector/></div>
        </div>
      </div>

      <div className={'tgt-dash--rfi-description-container'}>
        <div className={'tgt-dash--rfi-description'}>
          <span>RFI DESCRIPTION: {props.rfi.description}</span>
        </div>
      </div>

    </div>
  );
};

const mapStateToProps = (state: any) => ({
  rfi: state.tgtReducer.rfi,
  viewTgtPage: state.tgtReducer.viewTgtPage,
  exploitDates: state.tgtReducer.exploitDates,
  dates: state.tgtReducer.dates,
  showDatePlaceholder: state.tgtReducer.showDatePlaceholder
});

const mapDispatchToProps = {
  exitTgtPage: exitTgtPage,
  updateRfiDate: updateRfiDate,
  setDatePlaceholder: setDatePlaceholder
};

export const StyledTgtDashboard = styled(
  connect(mapStateToProps, mapDispatchToProps)(TgtDashboard))`
  font-size: ${(props) => props.theme.font.sizeRow};
  font-family: ${(props) => props.theme.font.familyRow};
  color: ${(props) => props.theme.color.fontPrimary};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .tgt-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .tgt-dash--header--back-button {
    cursor: pointer;
    padding-top: 28px;
    padding-left: 45px;
    width: 108px;
    min-width: 108px;
    height: 92px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: ${(props) => props.theme.color.backgroundAction};
    
    :hover {
      color: ${(props) => props.theme.color.buttonBackgroundActive};
      path {
        fill: ${(props) => props.theme.color.buttonBackgroundActive};
      }
    }
  }
  
  .tgt-dash--header--rfi-num-container {
    text-align: center;
    width: 500px;
    min-width: 300px;
    margin: auto;
    padding-top: 46px;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: ${(props) => props.theme.font.weightBold};
  }
  
  .tgt-dash--header--rfi-num {
    font-size: 32px;
    font-weight: ${(props) => props.theme.font.weightMedium};
  }
  
  .tgt-dash-daterange-display-inactive {
    color: ${(props) => props.theme.color.backgroundInformation};
  }
  
  .tgt-dash--header--filler {
    width: 108px;
  }
  
  .tgt-dash-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tgt-dash--rfi-description-container {
    width:100%;
    padding-left: 113px;
    padding-right: 103px;
    padding-bottom: 21px;
    height: 136px;
  }

  .tgt-dash--rfi-description {
    height: 115px;
    min-width: 500px;
    padding-right: 10px;
    overflow-y: auto;
  }
  
  .date-divider--placeholder {
    width: 100%;
    color: ${(props) => props.theme.color.fontBackgroundInactive};
    margin-bottom: -32px;
  }
  
  .tgt-dash-add-date-button {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

  }
  
  .add-date-vector {
    margin-left: -33px;
    margin-bottom: -4px;
    pointer-events: none;
  }
  
  AddDateVector {
    pointer-events: none;
  }
`;
