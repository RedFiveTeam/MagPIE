import { crayonBox } from './crayonBox';
import './fonts/roboto/roboto.css';
import './fonts/helveticaneue/helveticaneue.css';
import './fonts/arvo/arvo.css';

const theme = {
  color: {
    backgroundBase: crayonBox.softMetal,
    fontPrimary: crayonBox.eggWhite,
    fontAction: crayonBox.tarBlack,
    backgroundInformation: crayonBox.steelGray,
    backgroundInactive: crayonBox.blueGrayLight,
    backgroundAction: crayonBox.safetyOrange,
    backgroundAssigned: crayonBox.notEggWhite,
    fontLoading: crayonBox.lightGray,
    fontInactive: crayonBox.mediumGray,
    fontBackgroundInactive: crayonBox.mediumLightGray,
    buttonInactive: crayonBox.notEggWhite,
    buttonActive: crayonBox.softMetal,
    buttonBackgroundActive: crayonBox.pitchBlack,
    showLessBackground: crayonBox.subtleGray,
    addButtonBackground: crayonBox.forestGreen,
    fontAddDate: crayonBox.eggGray,
    fontError: crayonBox.bloodRed,
    fontInputFocus: crayonBox.skyBlue
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
    weightRegion: 100,
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

export default theme;
