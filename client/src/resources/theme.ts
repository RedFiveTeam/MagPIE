import { crayonBox } from './crayonBox';
import './fonts/roboto/roboto.css';
import './fonts/helveticaneue/helveticaneue.css';
import './fonts/arvo/arvo.css';
import { createMuiTheme, createStyles, Theme } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';
import { makeStyles } from '@material-ui/core/styles';

const theme = {
  color: {
    backgroundBase: crayonBox.coolBlack,//
    fontPrimary: crayonBox.eggWhite,
    fontAction: crayonBox.tarBlack,
    backgroundInformation: crayonBox.steelBlue,//
    backgroundInactive: crayonBox.blueGrayLight,
    backgroundAction: crayonBox.safetyOrange,
    backgroundAssigned: crayonBox.notEggWhite,
    backgroundModal: crayonBox.lightBlack,
    backgroundStatus: crayonBox.darkGray,
    backgroundSnackbar: crayonBox.mediumBlue,
    fontLoading: crayonBox.lightGray,
    fontInactive: crayonBox.mediumMediumLightGray,
    fontBackgroundInactive: crayonBox.mediumGray,
    buttonInactive: crayonBox.mediumBlueGray,//
    buttonActive: crayonBox.softMetal,
    buttonBackgroundActive: crayonBox.pitchBlack,
    showLessBackground: crayonBox.subtleGray,
    addButtonBackground: crayonBox.forestGreen,
    addButtonBorder: crayonBox.darkGreen,
    fontAddDate: crayonBox.eggGray,
    fontError: crayonBox.bloodRed,
    fontInputFocus: crayonBox.skyBlue,
    deleteButton: crayonBox.straightWhite,
    borderModal: crayonBox.darkRed,
    deleteButtonFocus: crayonBox.brightRed,
    backgroundHeader: crayonBox.steelBlue,//
    buttonOnBlack: crayonBox.straightWhite,
    regionDividerPrimary: crayonBox.mediumMediumBrightBlue,//
    regionDividerSecondary: crayonBox.blueBlueGray,//
    fontToolTip: crayonBox.softMetal,
    backgroundToolTip: crayonBox.lightGray,
    inProgress: crayonBox.stoplightYellow,
    complete: crayonBox.stoplightGreen,
    primaryButton: crayonBox.brightBlue,//
    buttonRowDisabled: crayonBox.subtleGray,
    buttonDoesNotMeetEei: crayonBox.tomatoRed,
    fontActive: crayonBox.notEggWhite,
    backgroundLoading: crayonBox.coolBlack,
    backgroundUsernameSuffix: crayonBox.warmGray,
    backgroundInput: crayonBox.lessDarkGray,
    fontUsernameSuffix: crayonBox.lighterGray,
    loginIcon: crayonBox.mediumBrightBlue,
    backgroundSidebar: crayonBox.steelBlue,
    backgroundMetricsCard: crayonBox.darkBlue,
    fontMetricsHeader: crayonBox.brightBlue,
    modalInputBorder: crayonBox.subtlerGray,
    fontHeader: crayonBox.skyBlueGreen,//
    backgroundFocus: crayonBox.mediumBlueGray,//
    borderAddButton: crayonBox.mediumGreenBlue,//
    backgroundPillButton: crayonBox.darkGreenBlue,//
  },

  font: {
    familyRow: 'Roboto',
    weightRow: 400,
    weightMedium: 500,
    weightBold: 700,
    sizeRow: '16px',
    familyHeader: 'Roboto',
    weightHeader: 400,
    sizeHeader: '24px',
    sizeHeaderSmall: '16px',
    familyRegion: 'Roboto',
    weightRegion: 500,
    sizeRegion: '18px',
    sizeRowSmall: '12px',
    sizeRowMedium: '14px',
    sizeMetricsHeader: '20px',
    sizeBigMetric: '40px',
  },

  table: {
    rowHeight: '64px',
    tableWidth: '607px',
    rowWidth: '576px',
    leftWidth: '408px',
  },
};

const muiPalette = createPalette(
  {
    type: 'dark',
    primary: {
      main: theme.color.primaryButton,
    },
  });

export const muiTheme = createMuiTheme(
  {
    palette: muiPalette,
  });

const rowPalette = createPalette(
  {
    primary: {
      main: theme.color.fontInputFocus,
    },
    secondary: {
      main: '#FFFFFF',
    },
  });

export const rowTheme = createMuiTheme(
  {
    palette: rowPalette,
    overrides: {
      MuiInput: {
        input: {
          '&::placeholder': {
            color: theme.color.fontBackgroundInactive,
          },
          color: 'white', // if you also want to change the color of the input, this is the prop you'd use
        },
        underline: {
          '&:before': {
            borderBottom: '1px solid white',
          },
        },
      },
    },
  });

export const rowStyles = makeStyles((localTheme: Theme) => createStyles(
  {
    margin: {
      margin: localTheme.spacing(1),
    },
    inputLabel: {
      color: theme.color.fontBackgroundInactive,
    },
    clickable: {
      cursor: 'pointer',
      userSelect: 'none',
      position: 'absolute',
      marginLeft: '12px',
      '&:hover': {
        boxShadow: '0px 0px 6px #FFFFFF',
      },
      textAlign: 'center',
    },
    tgtClickable: {
      marginLeft: '19px',
    },
    inProgress: {
      marginTop: '2px',
    },
    completed: {
      marginTop: '46px',
    },
    doesNotMeetEei: {
      marginTop: '90px',
    },
    statusUnclickable: {
      alignSelf: 'center',
      boxShadow: '0px 2px 4px #000000',
      fontWeight: 'bold',
      userSelect: 'none',
      textAlign: 'center',
    },
    snackbarButton: {
      fontSize: theme.font.sizeRowMedium,
    },
  }),
);

export const longInputStyles = makeStyles((localTheme: Theme) => createStyles(
  {
    modal: {
      marginLeft: -471,
      marginTop: -301,
      width: 942,
      height: 602,
    },
    //@ts-ignore
    modalBody: {
      height: 602,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      fontFamily: theme.font.familyHeader,
      fontWeight: theme.font.weightMedium,
      fontSize: theme.font.sizeRegion,
      lineHeight: '21px',
      color: theme.color.deleteButton,
      textAlign: 'center',
      outline: 'none',
      backgroundColor: theme.color.backgroundModal,
      borderRadius: 8,
      borderColor: theme.color.buttonOnBlack,
      borderWidth: 2,
      borderStyle: 'solid',
      padding: '8px',
    },
    modalConfirmation: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 162,
    },
    modalYes: {
      cursor: 'pointer',
      fontSize: theme.font.sizeHeader,
      color: theme.color.fontBackgroundInactive,
      '&:hover': {
        color: theme.color.deleteButton,
        textShadow: '0px 0px 4px #FFFFFF',
      },
    },
    modalNo: {
      cursor: 'pointer',
      fontSize: theme.font.sizeHeader,
      '&:hover': {
        textShadow: '0px 0px 4px #FFFFFF',
      },
    },
    modalTextfield: {
      width: 900,
    },
    modalTextfieldReadonlyContainer: {
      overflowWrap: 'break-word',
      overflowY: 'auto',
    },
    modalTextfieldReadonly: {
      width: 900,
      height: 525,
      textAlign: 'left',
      whiteSpace: 'pre-wrap',
    },
    modalInputContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: 917,
      height: 534,
      border: '1px solid ' + theme.color.modalInputBorder,
      borderRadius: 8,
    },
    buttonSection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 'available',
    },
    copyToClipboard: {
      fontSize: theme.font.sizeRow,
      cursor: 'pointer',
      width: 128,
      '&:hover': {
        textShadow: '0px 0px 4px #FFFFFF',
      },
    },
    spacer: {
      width: 128,
    },
  }));

export default theme;
