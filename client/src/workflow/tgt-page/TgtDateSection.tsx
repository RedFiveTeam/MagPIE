import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { Box, createMuiTheme } from '@material-ui/core';
import AddTgtDateButtonVector from '../../resources/icons/AddTgtDateButtonVector';
import { ThemeProvider } from '@material-ui/styles'
import { crayonBox } from '../../resources/crayonBox';
import { StyledTgtDateDivider } from './TgtDateDivider';
import RfiModel from '../rfi-page/models/RfiModel';
import { connect } from 'react-redux';
import { StyledTgtRow } from './row/TgtRow';
import { TargetModel } from './models/TargetModel';
import { ExploitDateModel } from './models/ExploitDateModel';

interface Props {
  rfi: RfiModel;
  exploitDate: ExploitDateModel;
  exploitDateString: string;
  targets: TargetModel[];
  addTgt: number;
  setAddTgt: (dateId: number) => void;
  index?: number;
  className?: string;
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     margin: {
//       margin: theme.spacing(1),
//     },
//   }),
// );

export const TgtDateSection: React.FC<Props> = props => {

  // const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#323232',
      },
    },
  });

  // const theme2 = createMuiTheme({
  //   palette: {
  //     primary: {
  //       main: crayonBox.skyBlue,
  //     },
  //   },
  //   overrides: {
  //     MuiInput: {
  //       input: {
  //         "&::placeholder": {
  //           color: '#838383'
  //         },
  //         color: "white", // if you also want to change the color of the input, this is the prop you'd use
  //       }
  //     }
  //   }
  // });


  function printTargets(exploitDateId: number) {
    let dateTargets = props.targets.filter(target => target.exploitDateId === exploitDateId);
    return dateTargets.map((target: TargetModel, index: number) =>
      <StyledTgtRow
        theme={theme}
        target={target}
        key={index}
        rfi={props.rfi}
        exploitDate={props.exploitDate}
        setAddTgt={props.setAddTgt}
      />)
  }

  return (
    <div className={props.className}>
      <StyledTgtDateDivider
        exploitDate={props.exploitDateString}
        className={"date-divider--" + props.exploitDateString}
      />
      <ThemeProvider theme={theme}>
        {printTargets(props.exploitDate.id)}
        <div className={'tgt-input'}>
          <Box
            height={32}
            width={110}
            border={2}
            borderRadius={16}
            borderColor={crayonBox.safetyOrange}
            bgcolor={theme.palette.primary.main}
            onClick={() => {
              if (props.addTgt === -1)
                props.setAddTgt(props.exploitDate.id)
            }}
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            paddingRight={0.25}
            paddingLeft={2.8}
            fontSize={12}
            className={classNames('add-tgt-button' + (props.addTgt === -1 ? '' : '-disabled'), 'no-select')}
          >
            Add TGT
            <AddTgtDateButtonVector/>
          </Box>
          {props.addTgt === props.exploitDate.id ?
            <StyledTgtRow
              target={null}
              key={99999}
              rfi={props.rfi}
              exploitDate={props.exploitDate}
              setAddTgt={props.setAddTgt}
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

export const StyledTgtDateSection = styled(connect(mapStateToProps, mapDispatchToProps)(TgtDateSection))`
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
    margin-top: 22px;
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
  
  .tgt-error-msg {
    color: ${(props) => props.theme.color.fontError};
    font-size: ${(props) => props.theme.font.sizeRow};
    font-weight: ${(props) => props.theme.font.weightRow};
    line-height:19px;
  }
`;
