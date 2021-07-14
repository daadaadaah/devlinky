import styled from '@emotion/styled';

import React from 'react';

import style from '../styles/designSystem';

export default function Comment({ comment, onChangeComment }) {
  return (
    <FormField>
      <label htmlFor="devlink-comment">
        comment
      </label>
      <input
        type="text"
        id="devlink-comment"
        aria-label="devlink-comment"
        placeholder="Comment를 입력해주세요"
        name="comment"
        autoComplete="off"
        value={comment || ''}
        onChange={onChangeComment}
      />
    </FormField>
  );
}

const FormField = styled.fieldset`
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

  & label input {
    margin-top: 4px;

    padding: 0 16px;
    background: ${style.colors.white};
    border-radius: 15px;
  }

  & input {
    height: 30px;

    ::placeholder {
      font-family: ${style.font.family.krNum};
      opacity: 0.5;
    }
  }
`;
