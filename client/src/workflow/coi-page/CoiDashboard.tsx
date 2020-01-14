import styled from 'styled-components';
import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import RfiModel from '../rfi-page/models/RfiModel';
import { exitCoiPage } from '../../state/actions/coi/CoiActions';
import BackButtonVector from '../../resources/icons/BackButtonVector';

interface Props {
  rfi: RfiModel;
  exitCoiPage: () => void;
  className?: string;
}

export class CoiDashboard extends React.Component<Props> {
  render() {
    return (
      <div className={classNames(this.props.className)}>
        <div className={'coi-dash--header'}>
          <div className={'coi-dash--header--back-button'} onClick={this.props.exitCoiPage}>
            <BackButtonVector/>
            <span>Go Back</span>
          </div>
          <div className={'coi-dash--header--rfi-id-container'}>
            <span className={'coi-dash--header--rfi-id'}>{this.props.rfi.id}</span>
          </div>
          <div className={'coi-dash--header--filler'}>
            &nbsp;
          </div>
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
  viewCoiPage: state.coiReducer.viewCoiPage
});

const mapDispatchToProps = {
  exitCoiPage: exitCoiPage
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
  }
  
  .coi-dash--header--rfi-id-container {
    text-align: center;
    width: 500px;
    min-width: 300px;
    margin: auto;
    padding-top: 48px;
  }
  
  .coi-dash--header--rfi-id {
    font-size: 32px;
  }
  
  .coi-dash--header--filler {
    width: 108px;
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
