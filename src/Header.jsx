import styled from '@emotion/styled';

import React from 'react';

import { useDispatch } from 'react-redux';

import useCurrentUser from './hooks/useCurrentUser';

import style from './styles/designSystem';

import { removeCurrentUser } from './redux/slice';

export default function Header() {
  const { currentUser } = useCurrentUser();

  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(removeCurrentUser());
  };

  return (
    <Layout>
      <Logo src="../assets/images/logo-small.png" alt="devlinky-logo" />
      {currentUser && (
        <>
          <Profile src={currentUser.githubProfile} alt="user-profile" />
          <button type="button" onClick={handleClickLogout}>Log out</button>
        </>
      )}
    </Layout>
  );
}

const Layout = styled.header`
  margin: ${style.common.interval.small} ${style.common.interval.tiny} 0;

  & img:nth-child(1) {
    margin-top: 6px;
  }

  & img:nth-child(2) {
    margin-left: 128px;
  }

`;

const Logo = styled.img`
  width: 120px;
  height: 21px;
`;

const Profile = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
`;
