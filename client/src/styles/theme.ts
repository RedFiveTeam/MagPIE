import { crayonBox } from './crayonBox';

const theme = {
  color: {
    buttonBackground: crayonBox.safetyOrange,
    mainBackground: crayonBox.softMetal,
    backgroundText: crayonBox.blueGrey,
    foregroundText: crayonBox.eggWhite,
    inputBackground: crayonBox.safetyOrange,
    titleBackground: crayonBox.pitchBlack
  }
};

export * from './components';

export default theme;