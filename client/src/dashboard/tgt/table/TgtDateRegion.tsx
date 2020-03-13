import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import AddTgtDateButtonVector from '../../../resources/icons/AddTgtDateButtonVector';
import { StyledTgtRow } from './TgtRow';
import { StyledTgtDateDivider } from './TgtDateDivider';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { TargetModel } from '../../../store/tgt/TargetModel';
import RfiModel from '../../../store/rfi/RfiModel';
import { Status } from '../TgtDashboard';
import { StyledTgtInputRow } from './TgtInputRow';
import theme from '../../../resources/theme';
import { TargetPostModel } from '../../../store/tgt/TargetPostModel';

interface Props {
  rfi: RfiModel;
  addDate: boolean;
  setAddDate: (addDate: boolean) => void;
  exploitDate: ExploitDateModel;
  exploitDateDisplay: string;
  targets: TargetModel[];
  setAddEditTarget: (status: Status, id?: number) => void;
  editTarget: number;
  addTgt: number;
  index: number;
  addingOrEditing: boolean;
  postTarget: (target: TargetPostModel) => void;
  className?: string;
}

export const TgtDateRegion: React.FC<Props> = props => {

  function printTargets() {
    return props.targets.map((target: TargetModel, index: number) =>
      props.editTarget === target.id ?
      <StyledTgtInputRow
        target={target}
        key={index}
        rfi={props.rfi}
        exploitDate={props.exploitDate}
        setAddEditTarget={props.setAddEditTarget}
        addingOrEditing={props.addingOrEditing}
      />
      :
        <StyledTgtRow
          target={target}
          key={index}
          rfi={props.rfi}
          exploitDate={props.exploitDate}
          setAddEditTarget={props.setAddEditTarget}
          addingOrEditing={props.addingOrEditing}
          postTarget={props.postTarget}
        />
    )
  }

  let isNotDisabled = props.addTgt === -1 && props.editTarget === -1 && !props.addDate;

  return (
    <div className={props.className}>
      <StyledTgtDateDivider
        rfiId={props.rfi.id}
        setAddDate={props.setAddDate}
        exploitDate={props.exploitDate}
        exploitDateDisplay={
          new Date(props.exploitDate.exploitDate.utc().unix() * 1000
            + new Date(props.exploitDate.exploitDate.utc().unix() * 1000)
              .getTimezoneOffset() * 60000).toString()
        }
        className={"date-divider--" + props.exploitDateDisplay}
        uKey={props.index}
        hasTgts={props.targets.length > 0}
      />
        <div className={'tgt-input'}>
          <Box
            height={32}
            width={110}
            border={2}
            borderRadius={16}
            borderColor={theme.color.backgroundAction}
            bgcolor={theme.color.backgroundStatus}
            onClick={() => props.setAddEditTarget(Status.ADD, props.exploitDate.id)}
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            paddingRight={0.25}
            paddingLeft={2.8}
            fontSize={12}
            className={classNames('add-tgt-button' + (isNotDisabled ? '' : '-disabled'), 'no-select')}
          >
            Add TGT
            <AddTgtDateButtonVector/>
          </Box>
          {printTargets()}
          {props.addTgt === props.exploitDate.id ?
            <StyledTgtInputRow
              target={null}
              key={99999}
              rfi={props.rfi}
              exploitDate={props.exploitDate}
              setAddEditTarget={props.setAddEditTarget}
              addingOrEditing={props.addingOrEditing}
            />
            :
            null}
        </div>
    </div>
  )
};

export const StyledTgtDateSection = styled(TgtDateRegion)`
  font-family: ${theme.font.familyRegion};
  font-weight: ${theme.font.weightBold};
  font-size: ${theme.font.sizeRegion};
  color: ${theme.color.fontPrimary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
  width: 100%;
  
  .separator-line {
    flex-grow: 1;
    height: 2px;
    border-radius: 4px;
    background: ${theme.color.fontPrimary};
    margin-bottom: 8px;
  }
  
  .separator-title {
    width: 108px;
    text-align: center;
  }
  
  .input-tgt-name {
    width: 115px;
  }
  
  .input-mgrs {
    width: 141px;
  }
  
  .input-notes {
    width: 389px;
    font-size: 12pt;
  }
  
  .input-description {
    width: 262px;
    font-size: 12pt;
  }
  
  .input-status {
    width: 140px;
  }
  
  .input-delete {
    border-left: 4px solid ${theme.color.backgroundBase};
    width: 89px;
    height: 62px;
  }
  
  .input-exploitation {
    border-left: 4px solid ${theme.color.backgroundBase};
    width: 111px;
    height: 62px;
  }
  
  .tgt-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  
  .add-tgt-form-box {
    height: 62px;
    min-width: 1359px;
    margin-top: 8px;
    background-color: ${theme.color.backgroundInformation};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
    margin-bottom: 9px;
    padding-right: 7px;
  }
  
  .add-tgt-button {
    cursor: pointer;
    margin-left: 8px;
    box-shadow: 0 2px 4px #000000;
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
  
  .add-tgt-button-disabled {
    margin-left: 8px;
    opacity: 0.5;
    pointer-events: none;
  }
`;
