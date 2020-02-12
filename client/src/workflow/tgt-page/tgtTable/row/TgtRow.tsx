import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TargetModel } from '../../models/TargetModel';
import classNames from 'classnames';
import { Box, createMuiTheme, createStyles, TextField, Theme } from '@material-ui/core';
import { crayonBox } from '../../../../resources/crayonBox';
import AddTgtDateButtonVector from '../../../../resources/icons/AddTgtDateButtonVector';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { TargetPostModel } from '../../models/TargetPostModel';
import { StyledDeleteTgtButtonVector } from '../../../../resources/icons/DeleteTgtButtonVector';
import { StyledExploitationLogButtonVector } from '../../../../resources/icons/ExploitationLogButtonVector';
import { deleteTgt, submitNewTarget } from '../../../../state/actions';
import { navigateToIxnPage } from '../../../../state/actions/ixn/IxnActions';
import RfiModel from '../../../rfi-page/models/RfiModel';
import { ExploitDateModel } from '../../models/ExploitDateModel';
import { connect } from 'react-redux';

interface Props {
  target: TargetModel | null;
  key: number;
  submitNewTarget: (target: TargetPostModel, rfi: RfiModel) => void;
  rfi: RfiModel;
  exploitDate: ExploitDateModel;
  setAddTgt: (dateId: number) => void;
  navigateToIxnPage: (target: TargetModel) => void;
  deleteTgt: (tgtId: number) => void;
  className?: string;
}

enum Status {
  ENTERING,
  SUBMITTING,
  DELETING
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export const TgtRow: React.FC<Props> = props => {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: crayonBox.skyBlue,
      },
      secondary: {
        main: "#323232"
      }
    },
    overrides: {
      MuiInput: {
        input: {
          "&::placeholder": {
            color: "#838383"
          },
          color: "white", // if you also want to change the color of the input, this is the prop you'd use
        }
      }
    }
  });

  const [nameError, setNameError] = useState(false);
  const [mgrsError, setMgrsError] = useState(false);
  //If the user enters a name or MGRS incorectly once, always check for exact match
  const [strongValidateName, setStrongValidateName] = useState(false);
  const [strongValidateMgrs, setStrongValidateMgrs] = useState(false);
  const [name, setName] = useState("");
  const [mgrs, setMgrs] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(Status.ENTERING);

  const handleStatusChange = () => {
    if (status === Status.DELETING) {
      if (props.target) {
        props.deleteTgt(props.target.id);
      } else {
        props.setAddTgt(-1);
      }
    } else if (status === Status.SUBMITTING) {
      validateAllAndSubmit();
      setStatus(Status.ENTERING);
    }
  };

  useEffect(
    handleStatusChange,
    [status]
  );

  function weakMatchNameError(name: string): boolean {
    return name.length > 9 || (name.length === 9 && name.match(/[A-Z]{3}[0-9]{2}-[0-9]{3}/) === null)
  }

  function strongMatchNameError(name: string): boolean {
    return name.length !== 9 || name.match(/[A-Z]{3}[0-9]{2}-[0-9]{3}/) === null
  }

  function weakMatchMgrsError(mgrs: string): boolean {
    return mgrs.length > 15 || (mgrs.length === 15 && mgrs.match(/[0-9]{2}[A-Z]{3}[0-9]{10}/) === null)
  }

  function strongMatchMgrsError(mgrs: string): boolean {
    return mgrs.length !== 15 || mgrs.match(/[0-9]{2}[A-Z]{3}[0-9]{10}/) === null
  }

  const inputName = (event: any) => {
    let newName = event.target.value;
    setName(newName);
    if (strongValidateName) {
      setNameError(strongMatchNameError(newName));
    } else {
      setNameError(weakMatchNameError(newName));
      setStrongValidateName(weakMatchNameError(newName));
    }
  };

  const inputMgrs = (event: any) => {
    let newMgrs = event.target.value;
    setMgrs(newMgrs);
    if (strongValidateMgrs) {
      setMgrsError(strongMatchMgrsError(newMgrs));
    } else {
      setMgrsError(weakMatchMgrsError(newMgrs));
      setStrongValidateMgrs(weakMatchMgrsError(newMgrs));
    }
  };

  const inputNotes = (event: any) => {
    setNotes(event.target.value);
  };

  const inputDescription = (event: any) => {
    setDescription(event.target.value);
  };

  const validateAllAndSubmit = () => {
    let errors: boolean = false; // To avoid race condition for local state nameError and mgrsError
    setNameError(false);
    setMgrsError(false);
    setNameError(strongMatchNameError(name));
    setStrongValidateName(strongMatchNameError(name));
    setMgrsError(strongMatchMgrsError(mgrs));
    setStrongValidateMgrs(strongMatchMgrsError(mgrs));
    errors = (strongMatchMgrsError(mgrs) || strongMatchNameError(name));
    if (!errors) {
      props.setAddTgt(-1);
      props.submitNewTarget(
        new TargetPostModel(
          props.rfi.rfiNum,
          new Date(props.exploitDate.exploitDate.unix() * 1000), //convert date to UTC from moment
          name, mgrs, notes, description),
        props.rfi
      );
    }
  };

  function onBlur(event: any) {
    let currentTarget: any = event.currentTarget;
    console.log("this ran");
    console.log("this is the current target" + currentTarget);
    console.log("this is the active element" + document.activeElement);
    console.log("this is the status" + status);
    setTimeout(function () {
      if (!currentTarget.contains(document.activeElement) && status !== Status.DELETING) {
        setStatus(Status.SUBMITTING);
      }
    }, 50);
  }

  const handleDeleteClick = () => {
    setStatus(Status.DELETING);
  };

  const handleIxnClick = () => {
    if (props.target !== null) {
      props.navigateToIxnPage(props.target);
    }
  };

  return (
    <div className={props.className}>
      <form className={"add-tgt-form"}
            onBlur={onBlur}
            onKeyPress={(e: any) => {
              if (e.which === 13  ) {
                validateAllAndSubmit();
              }
            }}
      >
        <Box
          borderRadius={8}
          className={"tgt-form-box"}
        >
          <ThemeProvider theme={theme}>
            <TextField
              autoFocus={props.target === null}
              className={classNames("tgt-name", classes.margin)}
              value={props.target ? props.target.name : name}
              disabled={props.target !== null}
              required
              placeholder="OPRYY-###"
              label={props.target ? "" : (nameError ? "Error" : "Required")}
              error={nameError}
              onChange={inputName}
            />
            <TextField
              className={classNames("mgrs", classes.margin)}
              value={props.target ? props.target.mgrs : mgrs}
              disabled={props.target !== null}
              required
              placeholder="##XXX##########"
              label={props.target ? "" : (mgrsError ? "Error" : "Required")}
              error={mgrsError}
              onChange={inputMgrs}
            />
            <TextField
              multiline
              rowsMax="2"
              className={classNames("notes", classes.margin)}
              value={props.target ? props.target.notes : notes}
              disabled={props.target !== null}
              label={props.target || notes !== "" ? "" : "EEI Notes"}
              onChange={inputNotes}
            />
            <TextField
              multiline
              rowsMax="2"
              className={classNames("description", classes.margin)}
              value={props.target ? props.target.description : description}
              disabled={props.target !== null}
              label={props.target || description !== "" ? "" : "TGT Description"}
              onChange={inputDescription}
              onKeyDown={(e: any) => {
                if(e.keyCode === 9) {
                  validateAllAndSubmit();
                }
              }}
            />
            <Box
              height={32}
              width={110}
              border={2}
              borderRadius={16}
              borderColor={crayonBox.eggWhite}
              bgcolor={theme.palette.secondary.main}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              paddingRight={0.25}
              paddingLeft={2.8}
              fontSize={12}
              className={classNames("status-button", "no-select")}
            >
              Status
              <AddTgtDateButtonVector/>
            </Box>
            <div className={"delete-tgt"}
                 id={"delete" + (props.target !== null ? ("" + props.target.id) : "-add-tgt-row")}
                 onClick={handleDeleteClick}>
              <StyledDeleteTgtButtonVector/>
            </div>
            <div className={classNames("exploitation", props.target ? "" : "disabled")} onClick={handleIxnClick}>
              <StyledExploitationLogButtonVector/>
            </div>
          </ThemeProvider>
        </Box>
      </form>
      {nameError ?
        <div className={"tgt-error-msg"}>Please use the format "OPNYY-###" for TGT name</div>
        : null
      }
      {mgrsError ?
        <div className={"tgt-error-msg"}>Please use the format "##XXX##########" for MGRS</div>
        : null
      }
    </div>
  )
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  submitNewTarget: submitNewTarget,
  navigateToIxnPage: navigateToIxnPage,
  deleteTgt: deleteTgt
};

export const StyledTgtRow = styled(connect(mapStateToProps, mapDispatchToProps)(TgtRow))`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
  width: 100%;
  
  .add-tgt-form {
    width: 100%;
  }
  
  .tgt-name {
    width: 115px;
  }
  
  .mgrs {
    width: 155px;
  }
  
  .notes {
    width: 389px;
  }
  
  .description {
    width: 262px;
  }
  
  .status {
    width: 120px;
  }
  
  .delete-tgt {
    border-left: 4px solid ${crayonBox.softMetal};
    border-right: 4px solid ${crayonBox.softMetal};
    width: 90px;
    height: 62px;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .exploitation {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 108px;
    height: 62px;
    cursor: pointer;
  }
  
  .disabled {
    pointer-events: none; !important;
  }

  .tgt-form-box {
    height: 62px;
    width: 100%;
    margin-top: 8px;
    background-color: #464646;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
    margin-bottom: 9px;
    padding-right: 7px;
  }
  
  .status-button {
    font-weight: bold;
    cursor: default;
    margin-right: 25px;
    box-shadow: 0 2px 4px #000000;
  }
  
  .no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
  }
`;


