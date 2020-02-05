import * as React from 'react';
import styled from 'styled-components';
import { TargetModel } from '../tgt-page/models/TargetModel';
import classNames from 'classnames';
import BackButtonVector from '../../resources/icons/BackButtonVector';
import { connect } from 'react-redux';
import { exitIxnPage } from '../../state/actions/ixn/IxnActions';

interface Props {
  target: TargetModel
  exitIxnPage: () => void;
  className?: string
}

export const IxnDashboard: React.FC<Props> = props => {
  return(
    <div className={classNames(props.className)}>
      <div className={'ixn-dash--header'}>
        <div className={'ixn-dash--header--back-button'} onClick={props.exitIxnPage}>
          <BackButtonVector/>
          <span>Go Back</span>
        </div>
        <div className={'ixn-dash--header--tgt-name-container'}>
          <span className={'ixn-dash--header--tgt-name'}>TGT: {props.target.name}</span>
        </div>
        <div className={'ixn-dash--header--filler'}>
          &nbsp;
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: any) => ({
  target: state.ixnReducer.target
});

const mapDispatchToProps = {
  exitIxnPage: exitIxnPage
};

export const StyledIxnDashboard = styled(
  connect(mapStateToProps, mapDispatchToProps)(IxnDashboard))`
  font-size: ${(props) => props.theme.font.sizeRow};
  font-family: ${(props) => props.theme.font.familyRow};
  color: ${(props) => props.theme.color.fontPrimary};
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  
  .ixn-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .ixn-dash--header--back-button {
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
  
  .ixn-dash--header--tgt-name-container {
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
  
  .ixn-dash--header--tgt-name {
    font-size: 32px;
    font-weight: ${(props) => props.theme.font.weightMedium};
  }
  
  .ixn-dash--header--filler {
    width: 108px;
  }
`
