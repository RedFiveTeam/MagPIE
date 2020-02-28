import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { Box, createMuiTheme } from '@material-ui/core';
import AddTgtDateButtonVector from '../../../resources/icons/AddTgtDateButtonVector';
import { ThemeProvider } from '@material-ui/styles'
import { crayonBox } from '../../../resources/crayonBox';
import { connect } from 'react-redux';
import { StyledTgtRow } from './TgtRow';
import { StyledTgtDateDivider } from './TgtDateDivider';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { TargetModel } from '../../../store/tgt/TargetModel';
import RfiModel from '../../../store/rfi/RfiModel';
import { Status } from '../TgtDashboard';

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
  className?: string;
}

export const TgtDateRegion: React.FC<Props> = props => {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#323232',
      },
    },
  });

  function printTargets() {
    return props.targets.map((target: TargetModel, index: number) =>
      <StyledTgtRow
        theme={theme}
        target={target}
        key={index}
        rfi={props.rfi}
        exploitDate={props.exploitDate}
        setAddEditTarget={props.setAddEditTarget}
        editable={props.editTarget === target.id}
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
      <ThemeProvider theme={theme}>
        <div className={'tgt-input'}>
          <Box
            height={32}
            width={110}
            border={2}
            borderRadius={16}
            borderColor={crayonBox.safetyOrange}
            bgcolor={theme.palette.primary.main}
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
            <StyledTgtRow
              target={null}
              key={99999}
              rfi={props.rfi}
              exploitDate={props.exploitDate}
              setAddEditTarget={props.setAddEditTarget}
              editable={true}
            />
            :
            null}
        </div>
      </ThemeProvider>
    </div>
  )
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export const StyledTgtDateSection = styled(connect(mapStateToProps, mapDispatchToProps)(TgtDateRegion))`
  font-family: ${(props) => props.theme.font.familyRegion};
  font-weight: ${(props) => props.theme.font.weightBold};
  font-size: ${(props) => props.theme.font.sizeRegion};
  color: ${(props) => props.theme.color.fontPrimary};
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
    background: ${(props) => props.theme.color.fontPrimary};
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
    border-left: 4px solid ${(props) => props.theme.color.backgroundBase};
    width: 89px;
    height: 62px;
  }
  
  .input-exploitation {
    border-left: 4px solid ${(props) => props.theme.color.backgroundBase};
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
    background-color: ${(props) => props.theme.color.backgroundInformation};
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
  
  .status-button {
    font-weight: bold;
    cursor: default;
    margin-right: 25px;
  }
  
  .no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
  }
`;
