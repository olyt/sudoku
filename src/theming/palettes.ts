type THexColor = `#${string}`;

// first color palette
// const darkSalmon = '#E29578';
const unbleachedSilk: THexColor = '#FFDDD2';
const aliceBlue: THexColor = '#EDF6F9';
const middleBlueGreen: THexColor = '#83C5BE';
const ming: THexColor = '#006D77';
const lightBlue: THexColor = '#B8D8D8';
const cadetGray = '#7A9E9F';
const paynesGray = '#4F6367';
// const beige = '#EEF5DB';
const bittersweet: THexColor = '#FE5F55';
const black = '#000000';

export interface IPalette {
  primary: THexColor;
  secondary: THexColor;
  secondaryLight: THexColor;
  primaryLight: THexColor;
  error: THexColor;
  lightError: THexColor;
  primaryHint: THexColor;
  secondaryHint: THexColor;
  defaultBlack: THexColor;
}

const defaultPalette: IPalette = {
  primary: ming,
  secondary: middleBlueGreen,
  secondaryLight: lightBlue,
  primaryLight: aliceBlue,
  error: bittersweet,
  lightError: unbleachedSilk,
  primaryHint: cadetGray,
  secondaryHint: paynesGray,
  defaultBlack: black,
};

export default defaultPalette;
