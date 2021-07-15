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
        /* 임시 : 디자인 QA용 */
        ${process.env.NODE_ENV !== 'production' && `box-shadow: 0 0 0 1px${style.colors.white}`};
      }

      button {
        cursor: pointer;
      }
    `}
  />
);

export default GlobalStyle;
