import { crayonBox } from './crayonBox';
import './fonts/roboto/roboto.css';
import './fonts/helveticaneue/helveticaneue.css';
import './fonts/arvo/arvo.css';
import { createMuiTheme } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';

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
    backgroundIxnHeader: crayonBox.pitchBlack,
    buttonOnBlack: crayonBox.straightWhite,
    segmentDivider: crayonBox.mediumMediumLightGray,
    buttonAddDate: crayonBox.brightBlue,
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
    sizeRowSmall: '12px'
  },

  table: {
    rowHeight: '64px',
    tableWidth: '607px',
    rowWidth: '576px',
    leftWidth: '408px'
  },

  flatpickr: {
    headerBackground: crayonBox.safetyOrange
  }
};

const muiPalette = createPalette({
  type: 'dark',
  primary: {
    main: crayonBox.brightBlue
  }
});

export const muiTheme = createMuiTheme({
  palette: muiPalette
});

export default theme;
