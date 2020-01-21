import styled from 'styled-components';
import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import RfiModel, { RfiStatus } from '../rfi-page/models/RfiModel';
import { exitCoiPage, updateRfiDate } from '../../state/actions';
import BackButtonVector from '../../resources/icons/BackButtonVector';
import Flatpickr from 'react-flatpickr';
import '../../resources/flatpickr.css'
import { formatRfiNum } from '../../utils';

interface Props {
  rfi: RfiModel;
  exitCoiPage: () => void;
  updateRfiDate: (date1: Date, date2: Date, rfi: RfiModel) => void;
  className?: string;
}

export class CoiDashboard extends React.Component<Props, any> {

  render() {

    function printDates(rfi: RfiModel) {
      return rfi.exploitStart!.isSame(rfi.exploitEnd!) ?
        rfi.exploitStart!.format("DDMMMYY").toUpperCase() :
        rfi.exploitStart!.format("DDMMMYY").toUpperCase() + " - " +
        rfi.exploitEnd!.format("DDMMMYY").toUpperCase()
    }

    return (
      <div className={classNames(this.props.className)}>
        <div className={'coi-dash--header'}>
          <div className={'coi-dash--header--back-button'} onClick={this.props.exitCoiPage}>
            <BackButtonVector/>
            <span>Go Back</span>
          </div>
          <div className={'coi-dash--header--rfi-num-container'}>
            <span className={'coi-dash--header--rfi-num'}>RFI: {formatRfiNum(this.props.rfi.rfiNum)}</span>
            <span className={'coi-dash-daterange-display'
            + (this.props.rfi.exploitStart !== null ? '-active' : '-inactive')}>
              {(this.props.rfi.exploitStart !== null) ? printDates(this.props.rfi) : "DDMMMYY"}
            </span>
          </div>
          <div className={'coi-dash--header--filler'}>
            &nbsp;
          </div>
        </div>
        <div className={'coi-dash-body'}>
          {
            (this.props.rfi.exploitStart === null && this.props.rfi.status === RfiStatus.OPEN ?
              <div className={'coi-dash-add-date-button'}>
                <Flatpickr
                  placeholder={'Add Date +'}
                  onClose={newDates => {
                    if (newDates[0] !== undefined && newDates[1] !== undefined)
                      this.props.updateRfiDate(newDates[0], newDates[1], this.props.rfi);
                  }}
                  options={{
                    mode: "range",
                    maxDate: "today"
                  }}
                />
              </div>
              :
              <div className={'coi-dash--add-new-tgt'}>
                &nbsp;
              </div>)
          }
        </div>
        <div className={'coi-dash--rfi-description-container'}>
          <div className={'coi-dash--rfi-description'}>
            <span>RFI DESCRIPTION: {this.props.rfi.description}</span>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  rfi: state.coiReducer.rfi,
  viewCoiPage: state.coiReducer.viewCoiPage,
  exploitDates: state.coiReducer.exploitDates
});

const mapDispatchToProps = {
  exitCoiPage: exitCoiPage,
  updateRfiDate: updateRfiDate
};

export const StyledCoiDashboard = styled(
  connect(mapStateToProps, mapDispatchToProps)(CoiDashboard))`
  font-size: ${(props) => props.theme.font.sizeRow};
  font-family: ${(props) => props.theme.font.familyRow};
  color: ${(props) => props.theme.color.fontPrimary};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .coi-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .coi-dash--header--back-button {
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
  
  .coi-dash--header--rfi-num-container {
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
  
  .coi-dash--header--rfi-num {
    font-size: 32px;
    font-weight: ${(props) => props.theme.font.weightMedium};
  }
  
  .coi-dash-daterange-display-inactive {
    color: ${(props) => props.theme.color.backgroundInformation};
  }
  
  .coi-dash--header--filler {
    width: 108px;
  }
  
  .coi-dash-body {
    height: 100%;
    padding-top: 47px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .coi-dash--rfi-description-container {
    width:100%;
    padding-left: 113px;
    padding-right: 103px;
    padding-bottom: 21px;
    height: 136px;
  }

  .coi-dash--rfi-description {
    height: 115px;
    min-width: 500px;
    padding-right: 10px;
    overflow-y: auto;
  }
`;
