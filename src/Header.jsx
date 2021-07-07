import styled from '@emotion/styled';

import React from 'react';

import useCurrentUser from './hooks/useCurrentUser';

import style from './styles/designSystem';

export default function Header() {
  const { currentUser } = useCurrentUser();

  return (
    <Layout>
      <Logo src="../assets/images/logo-small.png" alt="devlinky-logo" />
      {currentUser && <Profile src={currentUser.githubProfile} alt="user-profile" />}
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
