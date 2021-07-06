import React from 'react';

import { Global, css } from '@emotion/react';

import style from './designSystem';

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
      }

      body {
        width: 360px;
        min-height: 600px;
        background-color: ${style.common.background};
        font-family: ${style.common.font.en.family};
      }
    `}
  />
);

export default GlobalStyle;
