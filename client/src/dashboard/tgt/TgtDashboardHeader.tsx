import * as React from 'react';
import { formatRfiNum } from '../../utils';
import styled from 'styled-components';
import RfiModel from '../../store/rfi/RfiModel';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import theme from '../../resources/theme';

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
          <StyledBackButtonVector/>
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
  font-size: ${theme.font.sizeRow};
  font-family: ${theme.font.familyRow};
  color: ${theme.color.fontPrimary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .tgt-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 63px;
    background: ${theme.color.backgroundHeader};
  }
  
  .tgt-dash--header--back-button {
    cursor: pointer;
    padding-left: 18px;
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: ${theme.color.backgroundAction};
  }
  
  .tgt-dash--header--rfi-num-container {
    text-align: center;
    width: 400px;
    min-width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: ${theme.font.weightBold};
  }
  
  .tgt-dash--header--rfi-num {
    font-size: 32px;
    font-weight: ${theme.font.weightMedium};
  }
  
  .tgt-dash--header--filler {
    width: 108px;
  }
`;
