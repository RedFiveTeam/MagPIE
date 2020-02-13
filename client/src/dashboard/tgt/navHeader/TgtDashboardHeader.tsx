import * as React from 'react';
import TgtBackButtonVector from '../../../resources/icons/TgtBackButtonVector';
import { formatRfiNum } from '../../../utils';
import styled from 'styled-components';
import RfiModel from '../../../store/rfi/RfiModel';

interface OwnProps {
  exitTgtPage: () => void;
  rfi: RfiModel;
  className?: string;
}

export const TgtDashboardHeader: React.FC<OwnProps> = (props) => {
  return (
    <div className={props.className}>
      <div className={'tgt-dash--header'}>
        <div className={'tgt-dash--header--back-button'} onClick={props.exitTgtPage}>
          <TgtBackButtonVector/>
          <span>Go Back</span>
        </div>
        <div className={'tgt-dash--header--rfi-num-container'}>
          <span className={'tgt-dash--header--rfi-num'}>RFI: {formatRfiNum(props.rfi.rfiNum)}</span>
        </div>
        <div className={'tgt-dash--header--filler'}>
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export const StyledTgtDashboardHeader = styled(TgtDashboardHeader)`
  font-size: ${(props) => props.theme.font.sizeRow};
  font-family: ${(props) => props.theme.font.familyRow};
  color: ${(props) => props.theme.color.fontPrimary};
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
  
  .tgt-dash--header--filler {
    width: 108px;
  }
`;
