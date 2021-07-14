/* eslint-disable react/no-array-index-key */
import styled from '@emotion/styled';

import React from 'react';

import style from '../styles/designSystem';

export default function Url({
  url, onChangeUrl, onSeatchUrl,
}) {
  return (
    <URLInputField>
      <label htmlFor="devlink-url">
        url
      </label>
      <URLInputContainer>
        <URLInput
          type="text"
          id="devlink-url"
          aria-label="devlink-url"
          placeholder="URL을 입력해주세요"
          name="url"
          value={url || ''}
          onChange={onChangeUrl}
        />
        <SearchButton
          type="button"
          id="search-url"
          aria-label="search-url"
          onClick={onSeatchUrl}
        >
          <img src="../../assets/images/btn_search.png" alt="btn-search" />
        </SearchButton>
      </URLInputContainer>
    </URLInputField>
  );
}

const URLInputField = styled.fieldset`
  margin-top: 20px;

  display: flex;
  flex-direction: column;

  & label {
    text-transform: capitalize;
    
    font-weight: 300;
    font-size: 12px;
    opacity: 0.8;

    font-family: ${style.font.family.en};
  }

  & input {
    height: 30px;

    ::placeholder {
      font-family: ${style.font.family.krNum};
      opacity: 0.5;
    }
  }
`;

const URLInputContainer = styled.div`
  display: flex;
`;

const URLInput = styled.input`
  margin-top: 4px;

  width: 235px;
  background: ${style.colors.white};
  border-radius: 15px;

  padding: 0 16px;
`;

const SearchButton = styled.button`
  margin: 10px 0 4px 17px;

  background: transparent;
    
  & img {
    background: url('../../assets/images/btn_search.png');
  }
`;
