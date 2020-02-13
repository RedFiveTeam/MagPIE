import * as React from 'react';
import styled from 'styled-components';
import { TargetModel } from '../tgt-page/models/TargetModel';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { exitIxnPage } from '../../state/actions';
import { ApplicationState } from '../../state';
import { StyledIxnBackButtonVector } from '../../resources/icons/IxnBackButtonVector';

interface Props {
  exitIxnPage: () => void;
  target: TargetModel
  dateString: string
  className?: string
}

export const IxnHeader: React.FC<Props> = props => {
  return(
    <div className={classNames(props.className)}>
      <div className={'ixn-dash--header'}>
        <div className={'ixn-dash--header--back-button'} onClick={props.exitIxnPage}>
          <StyledIxnBackButtonVector/>
        </div>
        <div className={'ixn-dash--header--mgrs-date-container'}>
          <div className={'ixn-dash--header--mgrs'}>
            <b>MGRS:</b> {props.target.mgrs}
          </div>
          <div className={'ixn-dash--header--date'}>
            Date: {props.dateString}
          </div>
        </div>
        <div className={'ixn-dash--header--tgt-name-container'}>
          <span className={'ixn-dash--header--tgt-name'}>TGT: {props.target.name}</span>
        </div>
        <div className={'ixn-dash--header--notes'}>
          <span><b>EEI Notes:</b> {props.target.notes}</span>
        </div>
        <div className={'ixn-dash--header--filler'}>
          &nbsp;
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = ({ixns}: ApplicationState) => ({
  dateString: ixns.dateString
});

const mapDispatchToProps = {
  exitIxnPage: exitIxnPage
};

export const StyledIxnHeader = styled(
  connect(mapStateToProps, mapDispatchToProps)(IxnHeader))`
  font-size: ${(props) => props.theme.font.sizeRow};
  font-family: ${(props) => props.theme.font.familyRow};
  color: ${(props) => props.theme.color.fontPrimary};
  display: flex;
  
  .ixn-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 63px;
    background: ${(props) => props.theme.color.backgroundIxnHeader};
  }
  
  .ixn-dash--header--back-button {
    cursor: pointer;
    padding-left: 18px;
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: ${(props) => props.theme.color.backgroundAction};
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
    font-weight: ${(props) => props.theme.font.weightBold};
  }
  
  .ixn-dash--header--tgt-name {
    font-size: 32px;
    font-weight: ${(props) => props.theme.font.weightMedium};
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
`;
