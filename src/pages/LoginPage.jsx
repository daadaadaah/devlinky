import styled from '@emotion/styled';

import React from 'react';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import useCurrentUser from '../hooks/useCurrentUser';

import { loadCurrentUser } from '../redux/slice';

import { colors, font } from '../styles/commom';

import style from '../styles/designSystem';

export default function LoginPage() {
  const history = useHistory();

  const { currentUser } = useCurrentUser();

  if (currentUser) {
    history.push('/');
  }

  const dispatch = useDispatch();

  const handleClickLogin = () => {
    dispatch(loadCurrentUser());
  };

  return (
    <main>
      {/* 문구 수정 필요 */}
      <Welcome>어떤 문구를 넣어야 되나어떤 문구를 넣어야 되나어떤 문구를 넣어야 되나어떤 문구를 넣어야 되나어떤 문구를 넣어야 되나</Welcome>
      <LoginButton type="button" id="btn-login" onClick={handleClickLogin}>Github login</LoginButton>
    </main>
  );
}

const Welcome = styled.p`
  position: absolute;
  
  top: 100px;
  left: 60px;

  color:  ${colors.gray.light};

  text-align: center;
  font-family: ${font.family.krNum};
  font-size: ${font.size.regular};;
  font-weight: ${font.weight.light};

`;

const LoginButton = styled.button`
  position: absolute;  
  width: 240px;
  height: 42px;
  border-radius: 63px;

  left: 60px;
  top: 318px;

  background-color: ${style.button.normal.background};
  color:  ${style.button.normal.color};

  text-align: center;
  font-size: ${style.button.font.size};;
  font-weight: ${style.button.font.weight};
  
  &:hover {
    background-color:${style.button.hover.background};
  }
`;
