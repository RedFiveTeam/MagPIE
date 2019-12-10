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
    fontLoading: crayonBox.lightGray
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
    tableWidth: '607px',
    rowWidth: '576px',
    leftWidth: '408px'
  }
};

export * from './components';

export default theme;
