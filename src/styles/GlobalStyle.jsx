import React from 'react';

import { Global, css } from '@emotion/react';

import style from './designSystem';

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        font-family: ${style.common.font.en.family};
      }

      body {
        width: 320px;
        min-height: 600px;
        background-color: ${style.common.background};
        color: ${style.common.color};
      }

      button {
        cursor: pointer;
      }
    `}
  />
);

export default GlobalStyle;
