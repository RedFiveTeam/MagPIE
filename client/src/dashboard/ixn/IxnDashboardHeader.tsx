import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import { TargetModel } from '../../store/tgt/TargetModel';
import theme from '../../resources/theme';
import { Box } from '@material-ui/core';
import RollupIcon from '../../resources/icons/RollupIcon';

interface Props {
  exitIxnPage: () => void;
  target: TargetModel;
  dateString: string;
  disableRollupButton: boolean;
  showRollup: () => void;
  className?: string;
}

export const IxnDashboardHeader: React.FC<Props> = props => {

  return (
    <div className={classNames(props.className)}>
      <div className={'ixn-dash--header'}>
        <div className={'ixn-dash--header--back-button'} onClick={props.exitIxnPage}>
          <StyledBackButtonVector/>
        </div>
        <div className={'ixn-dash--header--mgrs-date-container'}>
          <div className={'ixn-dash--header--mgrs'}>
            <b>MGRS:</b> {props.target.mgrs}
          </div>
          <div className={'ixn-dash--header--date'}>
            <b>Date:</b> {props.dateString}
          </div>
        </div>
        <div className={'rollup-button-container'}>
          <div className={classNames('rollup-button', props.disableRollupButton ? 'disabled' : null)}
               onClick={() => {if (!props.disableRollupButton) props.showRollup()}}
          >
            <Box
              className={'rollup-box no-select'}
              height={32}
              width={123}
              border={2}
              borderRadius={16}
              borderColor={theme.color.primaryButton}
              bgcolor={theme.color.backgroundModal}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              paddingRight={0.25}
              paddingLeft={1.25}
              zIndex={1000}
              color={theme.color.fontPrimary}
              fontSize={12}
              fontWeight={'bold'}
            >
              Export Rollups
              <RollupIcon/>
            </Box>
          </div>
        </div>
        <div className={'ixn-dash--header--tgt-name-container'}>
          <span className={'ixn-dash--header--tgt-name'}>
            TGT: {props.target.name}
          </span>
        </div>
        <div className={'ixn-dash--header--notes'}>
          <span><b>EEI Notes:</b> {props.target.notes}</span>
        </div>
        <div className={'ixn-dash--header--filler'}>
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export const StyledIxnDashboardHeader = styled(IxnDashboardHeader)`
  font-size: ${theme.font.sizeRow};
  font-family: ${theme.font.familyRow};
  color: ${theme.color.fontPrimary};
  display: flex;
  width: 100%;
  
  .ixn-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 63px;
    background: ${theme.color.backgroundHeader};
  }
  
  .ixn-dash--header--back-button {
    cursor: pointer;
    padding-left: 18px;
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: ${theme.color.backgroundAction};
  }
  
  .ixn-dash--header--mgrs-date-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 1;
    min-width: 400px;
    font-size: 20px;
  }
  
  .ixn-dash--header--tgt-name-container {
    text-align: center;
    width: 400px;
    min-width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: ${theme.font.weightBold};
  }
  
  .ixn-dash--header--tgt-name {
    font-size: 32px;
    font-weight: ${theme.font.weightMedium};
  }
  
  .ixn-dash--header--notes {
    flex: 1 1;
    min-width: 400px;
    overflow-y: auto;
    height: 59px;
    padding-right: 10px;
    font-size: 18px;
  }
  
  .ixn-dash--header--filler {
    width: 60px;
  }
  
  .rollup-button {
    cursor: pointer;
  }
  
  .rollup-box {
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
`;
