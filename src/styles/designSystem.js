import { colors, font } from './commom';

const common = { // TODO : 다크모드/라이트모드는 나중에 하기로~
  background: colors.yoonblue.deepDark,
  font: {
    en: {
      family: font.family.en,
      weight: {
        medium: font.weight.medium,
        bold: font.weight.bold,
      },
    },
    krNum: {
      family: font.family.krNum,
      weight: {
        light: font.weight.light,
        regular: font.weight.regular,
        bold: font.weight.bold,
      },
    },
  },
};

const button = {
  normal: {
    background: colors.yoonblue.normal,
    color: colors.white,
  },
  hover: {
    background: colors.yoonblue.light,
    color: colors.white,
  },
  press: {
    background: colors.yoonblue.dark,
    color: colors.white,
  },
  dimmend: {
    background: colors.yoonblue.normal,
    color: colors.gray.normal,
  },
};

const card = {
  background: colors.yoonblue.mediumDark,
};

const style = {
  common,
  button,
  card,
};

export default style;
