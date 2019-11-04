import { crayonBox } from './crayonBox';
import './fonts/roboto/roboto.css';

const theme = {
  color: {
    backgroundBase: crayonBox.softMetal,
    fontPrimary: crayonBox.eggWhite,
    fontAction: crayonBox.tarBlack,
    backgroundInformation: crayonBox.steelGray,
    backgroundInactive: crayonBox.tarBlack,
    backgroundAction: crayonBox.safetyOrange
  },

  font: {
    familyRow: 'Roboto',
    weightRow: 400,
    sizeRow: '16px',
    familyHeader: 'Roboto',
    weightHeader: 400,
    sizeHeader: '24px',
    familyRegion: 'Roboto',
    weightRegion: 100,
    sizeRegion: '18px'
  }
};

export * from './components';

export default theme;
