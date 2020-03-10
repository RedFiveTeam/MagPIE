import { crayonBox } from './crayonBox';
import './fonts/roboto/roboto.css';
import './fonts/helveticaneue/helveticaneue.css';
import './fonts/arvo/arvo.css';
import { createMuiTheme, createStyles, Theme } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';
import { makeStyles } from '@material-ui/core/styles';

const theme = {
  color: {
    backgroundBase: crayonBox.softMetal,
    fontPrimary: crayonBox.eggWhite,
    fontAction: crayonBox.tarBlack,
    backgroundInformation: crayonBox.steelGray,
    backgroundInactive: crayonBox.blueGrayLight,
    backgroundAction: crayonBox.safetyOrange,
    backgroundAssigned: crayonBox.notEggWhite,
    backgroundModal: crayonBox.lightBlack,
    backgroundStatus: crayonBox.darkGray,
    fontLoading: crayonBox.lightGray,
    fontInactive: crayonBox.mediumGray,
    fontBackgroundInactive: crayonBox.mediumLightGray,
    buttonInactive: crayonBox.notEggWhite,
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
    backgroundHeader: crayonBox.pitchBlack,
    buttonOnBlack: crayonBox.straightWhite,
    segmentDivider: crayonBox.mediumMediumLightGray,
    fontToolTip: crayonBox.softMetal,
    backgroundToolTip: crayonBox.lightGray,
    inProgress: crayonBox.stoplightYellow,
    complete: crayonBox.stoplightGreen,
    buttonAddDate: crayonBox.brightBlue,
    buttonRowDisabled: crayonBox.subtleGray,
    buttonDoesNotMeetEei: crayonBox.tomatoRed,
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
  },

  table: {
    rowHeight: '64px',
    tableWidth: '607px',
    rowWidth: '576px',
    leftWidth: '408px',
  },
};

const muiPalette = createPalette({
  type: 'dark',
  primary: {
    main: theme.color.buttonAddDate,
  },
});

export const muiTheme = createMuiTheme({
  palette: muiPalette,
});

const rowPalette = createPalette({
  primary: {
    main: theme.color.fontInputFocus,
  },
  secondary: {
    main: '#FFFFFF',
  },
});

export const rowTheme = createMuiTheme({
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

export const rowStyles = makeStyles((localTheme: Theme) =>
  createStyles({
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
  }),
);

export default theme;
