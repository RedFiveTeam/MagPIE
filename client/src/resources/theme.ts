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
    backgroundHighlighted: crayonBox.mediumBlueGray,//
    backgroundAssigned: crayonBox.notEggWhite,
    backgroundModal: crayonBox.steelBlue,
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
    backgroundToolTip: crayonBox.mediumBlue,
    inProgress: crayonBox.stoplightYellow,
    complete: crayonBox.stoplightGreen,
    primaryButton: crayonBox.brightBlue,//
    buttonRowDisabled: crayonBox.subtleGray,
    buttonDoesNotMeetEei: crayonBox.tomatoRed,
    fontActive: crayonBox.notEggWhite,
    backgroundLoading: crayonBox.coolBlack,
    backgroundUsernameSuffix: crayonBox.warmGray,
    backgroundInput: crayonBox.mediumBlueGray,
    fontUsernameSuffix: crayonBox.lighterGray,
    loginIcon: crayonBox.mediumBrightBlue,//
    backgroundSidebar: crayonBox.steelBlue,
    backgroundIxnSidebar: crayonBox.darkRedBlue,//
    backgroundMetricsCard: crayonBox.darkBlue,
    fontMetricsHeader: crayonBox.brightBlue,
    modalInputBorder: crayonBox.subtlerGray,
    fontHeader: crayonBox.skyBlueGreen,//
    backgroundFocus: crayonBox.mediumBlueGray,//
    borderAddButton: crayonBox.mediumGreenBlue,//
    dateDividerHighlight: crayonBox.mediumGreenBlue,//
    backgroundPillButton: crayonBox.darkGreenBlue,//
    fontSubHeader: crayonBox.lightBlueGray,//
    copyTgtBorder: crayonBox.lightCoolBlack,//
    dateDividerBox: crayonBox.mediumBrightBrightBlue,//
    subduedOutline: crayonBox.anotherGray,//
    rejectIcon: crayonBox.subduedTomatoRed,//
    backgroundSnackbarError: crayonBox.darkTomatoRed,//
  },

  font: {
    familyRow: 'Roboto',
    weightRow: 400,
    weightMedium: 500,
    weightBold: 700,
    weightBolder: 900,
    weightSubHeader: 300,
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
    sizeHelperText: '28px',
    sizeModalHeader: '30px',
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
    overrides: {
      MuiToolbar: {
        root: {
          background: '#000000',
        },
      },
    },
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
      background: theme.color.backgroundSnackbar,
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
      fontFamily: theme.font.familyHeader,
      fontWeight: theme.font.weightMedium,
      fontSize: theme.font.sizeRegion,
      lineHeight: '21px',
    },
    deleteModal: {
      marginLeft: -271,
      marginTop: -94,
      width: 542,
      height: 188,
      fontFamily: theme.font.familyHeader,
      fontWeight: theme.font.weightBold,
      fontSize: theme.font.sizeHeader,
    },
    rejectModal: {
      marginLeft: -332,
      marginTop: -204,
      width: 662,
      height: 408,
      fontFamily: theme.font.familyHeader,
      fontWeight: theme.font.weightMedium,
      fontSize: theme.font.sizeRegion,
    },
    //@ts-ignore
    modalBody: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.color.deleteButton,
      textAlign: 'center',
      outline: 'none',
      backgroundColor: theme.color.backgroundModal,
      borderRadius: 8,
      borderColor: theme.color.backgroundFocus,
      borderWidth: 2,
      borderStyle: 'solid',
      paddingTop: '12px',
    },
    //@ts-ignore
    narrativeModalBody: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.color.deleteButton,
      textAlign: 'center',
      outline: 'none',
      backgroundColor: theme.color.backgroundHighlighted,
      borderRadius: 8,
    },
    rollupModalBody: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.color.deleteButton,
      textAlign: 'center',
      outline: 'none',
      backgroundColor: theme.color.backgroundHighlighted,
      borderRadius: 8,
      padding: '0 2px',
    },
    modalConfirmation: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: theme.color.backgroundFocus,
      width: '100%',
      height: '52px',
      flexShrink: 0,
      justifySelf: 'flex-end',
      padding: '0 115px',
      boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.5)',
      borderBottomRightRadius: '6px',
      borderBottomLeftRadius: '6px',
      zIndex: 2,
    },
    modalButton: {
      cursor: 'pointer',
      fontSize: theme.font.sizeHeader,
      '&:hover': {
        textShadow: '0px 0px 4px #FFFFFF',
      },
    },
    modalTextfield: {
      backgroundColor: theme.color.backgroundModal,
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      padding: '0 4px',
      width: '100%',
    },
    rejectTextfield: {
      backgroundColor: theme.color.backgroundModal,
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      padding: '0 4px',
      width: '658px',
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
    rejectHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalInputContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: 917,
      height: 534,
      overflow: 'auto',
      padding: '6px 2px',
      background: theme.color.backgroundModal,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
    },
    buttonSection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '40px',
      backgroundColor: theme.color.backgroundFocus,
      padding: '8px',
      justifySelf: 'flex-end',
    },
    copyToClipboard: {
      width: 208,
      height: 38,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: theme.font.sizeRow,
      borderRadius: 4,
      cursor: 'pointer',
      border: '1px solid' + theme.color.primaryButton,
      marginRight: '17px',
      '&:hover': {
        boxShadow: '0 0 6px #FFF',
      },
    },
    spacer: {
      width: 128,
    },
    saveSubmitButton: {
      width: 208,
      height: 38,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: theme.font.sizeRow,
      borderRadius: 4,
      cursor: 'pointer',
      background: theme.color.primaryButton,
      '&:hover': {
        boxShadow: '0 0 6px #FFF',
      },
    },

  }));

export default theme;
