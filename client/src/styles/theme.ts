import { crayonBox } from './crayonBox';
import './fonts/roboto/roboto.css';

const theme = {
  color: {
    backgroundBase: crayonBox.softMetal,
    fontPrimary: crayonBox.eggWhite,
    fontAction: crayonBox.tarBlack,
    backgroundInformation: crayonBox.steelGray,
    backgroundInactive: crayonBox.blueGrayLight,
    backgroundAction: crayonBox.safetyOrange,
    backgroundAssigned: crayonBox.notEggWhite
  },

  font: {
    familyRow: 'Roboto',
    weightRow: 400,
    weightBold: 700,
    sizeRow: '16px',
    familyHeader: 'Roboto',
    weightHeader: 400,
    sizeHeader: '24px',
    familyRegion: 'Roboto',
    weightRegion: 100,
    sizeRegion: '18px'
  },

  table: {
    rowHeight: '64px',
    tableWidth: '456px',
    shadowWidth: '424px'
  }
};

export * from './components';

export default theme;
