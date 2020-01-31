import styled from 'styled-components';
import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import RfiModel from '../rfi-page/models/RfiModel';
import { exitTgtPage, setDatePlaceholder, updateRfiDate } from '../../state/actions';
import { StyledTgtTableHeader } from './tgtTable/header/TgtTableHeader';
import { ExploitDateModel } from './models/ExploitDateModel';
import { TargetModel } from './models/TargetModel';
import { StyledTgtTable } from './tgtTable/TgtTable';
import { StyledTgtDateDivider } from './TgtDateDivider';
import { Box } from '@material-ui/core';
import theme from '../../resources/theme';
import AddDateVector from '../../resources/icons/AddTgtDateVector';
import { crayonBox } from '../../resources/crayonBox';
import { ApplicationState } from '../../state';
import { StyledTgtDateSection } from './TgtDateRegion';
import { StyledTgtDashboardHeader } from './header/TgtDashboardHeader';

interface Props {
  rfi: RfiModel;
  exploitDates: ExploitDateModel[];
  showDatePlaceholder: boolean;
  exitTgtPage: () => void;
  updateRfiDate: (rfiId: number, date: Date) => void;
  setDatePlaceholder: (show: boolean) => void;
  targets: TargetModel[];
  className?: string;
}

export const TgtDashboard: React.FC<Props> = props => {
  const moment = require('moment');
  const [addTgt, setAddTgt] = useState(-1); //value is the id of the exploit date that is being added to
  const [addDate, setAddDate] = useState(false);

  function printDates(dates: ExploitDateModel[]) {
    return dates.map((exploitDateModel: ExploitDateModel, index: number) =>
      <StyledTgtDateSection
        rfi={props.rfi}
        addDate={addDate}
        setAddDate={setAddDate}
        exploitDate={exploitDateModel}
        exploitDateDisplay={exploitDateModel.exploitDate.utc().format("D MMM YY")}
        targets={props.targets.filter(target => target.exploitDateId === exploitDateModel.id)}
        addTgt={addTgt}
        setAddTgt={setAddTgt}
        index={index}
        className={"date-divider--" + moment(exploitDateModel.exploitDate).format("D-MMM-YY")}
        key={index}
      />
    );
  }

  return (
    <div className={classNames(props.className)}>
      <StyledTgtDashboardHeader
        exitTgtPage={props.exitTgtPage}
        rfi={props.rfi}
      />
      <div className={'tgt-dash-body'}>
          {props.exploitDates.length > 0 || props.showDatePlaceholder ?
            <StyledTgtTableHeader/>
            :
            null
          }
        <StyledTgtTable>
          {printDates(props.exploitDates)}
          {addDate ?
            <StyledTgtDateDivider
              rfiId={props.rfi.id}
              addDate={addDate}
              setAddDate={setAddDate}
              className={"date-divider--placeholder"}
              uKey={props.rfi.id}
              hasTgts={false}
            />
            :
            null
          }
        </StyledTgtTable>
        <Box
          height={32}
          minHeight={32}
          width={110}
          border={2}
          borderRadius={16}
          borderColor={theme.color.addButtonBorder}
          bgcolor={theme.color.addButtonBackground}
          onClick={() => setAddDate(true)}
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          fontSize={14}
          className={'add-date-button'}
        >
          <span>Add Date&nbsp;&nbsp;&nbsp;</span>
          <AddDateVector/>
        </Box>
      </div>
      <div className={'tgt-dash--rfi-description-container'}>
        <Box
          border={1}
          borderRadius={8}
          borderColor={crayonBox.eggWhite}
          className={'tgt-dash--rfi-description'}
          padding={1}
        >
          <span>RFI DESCRIPTION: {props.rfi.description}</span>
        </Box>
      </div>
    </div>
  );
};

const mapStateToProps = ({tgts}: ApplicationState) => ({
  rfi: tgts.rfi,
  exploitDates: tgts.exploitDates,
  showDatePlaceholder: tgts.showDatePlaceholder,
  targets: tgts.targets
});

const mapDispatchToProps = {
  exitTgtPage: exitTgtPage,
  updateRfiDate: updateRfiDate,
  setDatePlaceholder: setDatePlaceholder,
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
  
  .tgt-dash-daterange-display-inactive {
    color: ${(props) => props.theme.color.backgroundInformation};
  }
  
  .tgt-dash-body {
    height: calc(100vh - 270px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tgt-dash--rfi-description-container {
    width: 100%;
    padding-left: 113px;
    padding-right: 113px;
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .add-date-button {
    cursor: pointer;
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
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
