import styled from 'styled-components';
import * as React from 'react';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { StyledTableHeader } from '../components/header/TableHeader';
import { StyledTgtTable } from './table/TgtTable';
import { StyledTgtDateDivider } from './table/TgtDateDivider';
import { Box } from '@material-ui/core';
import theme from '../../resources/theme';
import AddDateVector from '../../resources/icons/AddTgtDateVector';
import { crayonBox } from '../../resources/crayonBox';
import { ApplicationState } from '../../store';
import { StyledTgtDateSection } from './table/TgtDateRegion';
import { StyledTgtDashboardHeader } from './TgtDashboardHeader';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import { TargetModel } from '../../store/tgt/TargetModel';
import RfiModel from '../../store/rfi/RfiModel';
import { postExploitDate, submitPostTarget } from '../../store/tgt/Thunks';
import { exitTgtPage, setDatePlaceholder } from '../../store/tgt';
import { TargetPostModel } from '../../store/tgt/TargetPostModel';
import { ExploitDatePostModel } from '../../store/tgt/ExploitDatePostModel';

interface MyProps {
  rfi: RfiModel;
  exploitDates: ExploitDateModel[];
  showDatePlaceholder: boolean;
  exitTgtPage: () => void;
  setDatePlaceholder: (show: boolean) => void;
  targets: TargetModel[];
  className?: string;
}

export enum Status {
  VIEW,
  ADD,
  EDIT
}

export const TgtDashboard: React.FC<MyProps> = props => {
  const moment = require('moment');
  const [addTarget, setAddTarget] = useState(-1); //value is the id of the exploit date that is being added to
  const [editTarget, setEditTarget] = useState(-1); // value is the id of the tgt that is being edited
  const [addDate, setAddDate] = useState(false);

  const dispatch = useDispatch();

  const handlePostTarget = (target: TargetPostModel) => {
    dispatch(submitPostTarget(target, props.rfi));
  };

  const handlePostExploitDate = (date: ExploitDatePostModel) => {
    dispatch(postExploitDate(props.rfi, date));
  };

  const handleAddEdit = (status: Status, id?: number) => {
    switch (status) {
      case Status.ADD:
        if (id && addTarget === -1 && editTarget === -1) {
          setAddTarget(id);
        }
        break;
      case Status.EDIT:
        if (id && addTarget === -1 && editTarget === -1) {
          setEditTarget(id);
        }
        break;
      case Status.VIEW:
        setTimeout(() => {
          setAddTarget(-1);
          setEditTarget(-1);
        }, 150);
    }
  };

  function printDates(dates: ExploitDateModel[]) {
    return dates.map((exploitDateModel: ExploitDateModel, index: number) =>
      <StyledTgtDateSection
        rfi={props.rfi}
        addDate={addDate}
        setAddDate={setAddDate}
        exploitDate={exploitDateModel}
        exploitDateDisplay={exploitDateModel.exploitDate.utc().format('D MMM YY')}
        targets={props.targets.filter(target => target.exploitDateId === exploitDateModel.id)}
        editTarget={editTarget}
        addTgt={addTarget}
        setAddEditTarget={handleAddEdit}
        index={index}
        className={'date-divider--' + moment(exploitDateModel.exploitDate).format('D-MMM-YY')}
        key={index}
        addingOrEditing={!(addTarget === -1 && editTarget === -1 && !addDate)}
        postTarget={handlePostTarget}
        postExploitDate={handlePostExploitDate}
      />,
    );
  }

  let isDisabled = addTarget > 0 || addDate || editTarget > 0;
  return (
    <div className={classNames(props.className)}>
      <StyledTgtDashboardHeader
        exitTgtPage={props.exitTgtPage}
        rfi={props.rfi}
      />
      <div className={'tgt-dash-body'}>
        {props.exploitDates.length > 0 || props.showDatePlaceholder ?
          <StyledTableHeader
            headers={['TGT Name', 'MGRS', 'EEI Notes', 'TGT Description', 'Delete', 'Exploitation']}
          />
          :
          null
        }
        <StyledTgtTable>
          {printDates(props.exploitDates)}
          {addDate ?
            <StyledTgtDateDivider
              rfiId={props.rfi.id}
              setAddDate={setAddDate}
              className={'date-divider--placeholder'}
              uKey={props.rfi.id}
              hasTgts={false}
              postExploitDate={handlePostExploitDate}
            />
            :
            null
          }
        </StyledTgtTable>
        <div className={'add-date-container'}>
          <Box
            height={34}
            minHeight={34}
            width={174}
            borderRadius={17}
            onClick={() => {
              setAddDate(true);
              setTimeout(() => {
                let scrollToLocation = document.getElementById('tgt-table-scrollable-region');
                if (scrollToLocation !== null)
                  scrollToLocation!.scrollTo(0, scrollToLocation!.scrollHeight);
              }, 50);
            }}
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
            fontSize={14}
            fontWeight={'bold'}
            id={'add-date-button'}
            className={classNames(
              'add-date-button' + (isDisabled ? '-disabled' : ''),
              'no-select',
            )}
          >
            <span>Add Coverage Date&nbsp;&nbsp;&nbsp;</span>
            <AddDateVector/>
          </Box>
          {/*Prevents user from tabbing out of page to address bar*/}
          <input className={'hidden-input'}/>
        </div>
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

const mapStateToProps = ({tgtState}: ApplicationState) => ({
  rfi: tgtState.rfi,
  exploitDates: tgtState.exploitDates,
  showDatePlaceholder: tgtState.showDatePlaceholder,
  targets: tgtState.targets,
});

const mapDispatchToProps = {
  exitTgtPage: exitTgtPage,
  setDatePlaceholder: setDatePlaceholder,
};

export const StyledTgtDashboard = styled(
  connect(mapStateToProps, mapDispatchToProps)(TgtDashboard))`
  font-size: ${theme.font.sizeRow};
  font-family: ${theme.font.familyRow};
  color: ${theme.color.fontPrimary};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .tgt-dash-daterange-display-inactive {
    color: ${theme.color.backgroundInformation};
  }
  
  .tgt-table {
    height: 100%;
  }
  
  .tgt-dash-body {
    height: calc(100vh - 199px);
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
    padding-right: 12px;
    overflow-y: auto;
  }
  
  .date-divider--placeholder {
    width: 100%;
    color: ${theme.color.fontBackgroundInactive};
    margin-bottom: -32px;
  }
  
  .tgt-dash-add-date-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .add-date-container {
    width: 224px;
    height: 34px;    
    margin-bottom: 7px;
    margin-top: 7px;
  }
  
  .add-date-button {
    cursor: pointer;
    background-color: ${theme.color.buttonAddDate};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
  
  .add-date-button-disabled {
    pointer-events: none; !important;
    background-color: ${theme.color.buttonAddDate};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    opacity: 0.5;
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
  
  .input-disabled {
    pointer-events: none; !important
    opacity: 0.5; !important
  }

  .add-date-vector {
    pointer-events: none;
  }
  
  AddDateVector {
    pointer-events: none;
  }
  
  .header-cell--name {
    margin-left: 40px;
    width: 123px;
  }
  
  .header-cell--mgrs {
    width: 163px;
  }
  
  .header-cell--notes {
    width: 397px;
  }
  
  .header-cell--description {
    width: 429px;
  }
  
  .header-cell--status {
    width: 128px;
  }
  
  .header-cell--delete {
    width: 70px;
  }
  
  .header-cell--exploitation {
    width: 128px;
  }
  
  .hidden-input {
    opacity: 0;
    z-index: -1;
    position: absolute;
  }
  
  .delete-edit-button-container {
    border-left: 4px solid ${crayonBox.softMetal};
    border-right: 4px solid ${crayonBox.softMetal};
    height: 62px;
    display: flex;
    flex: 0 0 81px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
