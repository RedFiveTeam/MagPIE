import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { TargetModel } from '../models/TargetModel';
import classNames from 'classnames';
import { Box, createMuiTheme, createStyles, TextField, Theme } from '@material-ui/core';
import { crayonBox } from '../../../resources/crayonBox';
import AddTgtDateButtonVector from '../../../resources/icons/AddTgtDateButtonVector';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { TargetPostModel } from '../models/TargetPostModel';
import { submitNewTarget } from '../../../state/actions';
import { connect } from 'react-redux';
import RfiModel from '../../rfi-page/models/RfiModel';
import { ExploitDateModel } from '../models/ExploitDateModel';

interface Props {
  target: TargetModel | null;
  key: number;
  submitNewTarget: (target: TargetPostModel, rfi: RfiModel) => void;
  rfi: RfiModel;
  exploitDate: ExploitDateModel;
  setAddTgt: (dateId: number) => void;
  className?: string;
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
  const [name, setName] = useState("");
  const [mgrs, setMgrs] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");

  const inputName = (event: any) => {
    let newName = event.target.value;
    setName(newName);
    if (newName.length > 9 || (newName.length === 9 && newName.match(/[A-Z]{3}[0-9]{2}-[0-9]{3}/) === null)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const inputMgrs = (event: any) => {
    let newMgrs = event.target.value;
    setMgrs(newMgrs);
    if (newMgrs.length > 15 || (newMgrs.length === 15 && newMgrs.match(/[0-9]{2}[A-Z]{3}[0-9]{10}/) === null)) {
      setMgrsError(true);
    } else {
      setMgrsError(false);
    }
  };

  const inputNotes = (event: any) => {
    setNotes(event.target.value);
  };

  const inputDescription = (event: any) => {
    setDescription(event.target.value);
  };

  const validate = () => {
    let errors: boolean = false; //to avoid race condition for local state nameError and mgrsError
    if (name.length !== 9 || name.match(/[A-Z]{3}[0-9]{2}-[0-9]{3}/) === null) {
      setNameError(true);
      errors = true;
    } else {
      setNameError(false);
    }
    if (mgrs.length !== 15 || mgrs.match(/[0-9]{2}[A-Z]{3}[0-9]{10}/) === null) {
      setMgrsError(true);
      errors = true;
    } else {
      setMgrsError(false);
    }
    if (!errors) {
      props.submitNewTarget(
        new TargetPostModel(
          props.rfi.rfiNum,
          new Date(props.exploitDate.exploitDate.unix() * 1000), //convert date to UTC from moment
          name, mgrs, notes, description),
        props.rfi
      );
      props.setAddTgt(-1);
      setName("");
      setMgrs("");
      setDescription("");
      setNotes("");
    }
    return;
  };

  function onBlur(event: any) {
    let currentTarget: any = event.currentTarget;

    setTimeout(function () {
      if (!currentTarget.contains(document.activeElement)) {
        validate();
      }
    }, 0);
  }

  return (
    <div className={props.className}>
      <form className={"add-tgt-form"}
            onBlur={onBlur}
            onKeyPress={(e: any) => {
              if (e.which === 13)
                validate();
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
              error={nameError}
              label={props.target ? "" : (nameError ? "Error" : "Required")}
              placeholder="OPRYY-###"
              onChange={inputName}
            />
            <TextField
              className={classNames("mgrs", classes.margin)}
              value={props.target? props.target.mgrs : mgrs}
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
              value={props.target? props.target.notes : notes}
              disabled={props.target !== null}
              label={props.target || notes !== "" ? "" : "EEI Notes"}
              onChange={inputNotes}
            />
            <TextField
              multiline
              rowsMax="2"
              className={classNames("description", classes.margin)}
              value={props.target? props.target.description : description}
              disabled={props.target !== null}
              label={props.target || description !== "" ? "" : "TGT Description"}
              onChange={inputDescription}
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
            <div className={"delete"}>&nbsp;</div>
            <div className={"log"}>&nbsp;</div>
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

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {
  submitNewTarget: submitNewTarget
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
  
  .tgt-input {
    width: 100%
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
  
  .delete {
    width: 61px;
    height: 62px;
  }
  
  .log {
    width: 137px;
    height: 62px;
  }
  
  .tgt-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
  }
`;


