import styled from '@emotion/styled';

import React from 'react';

import useCurrentUser from './hooks/useCurrentUser';

export default function Header() {
  const { currentUser } = useCurrentUser();

  return (
    <Wrapper>
      <Logo src="../assets/images/logo-small.png" alt="devlinky-logo" />
      {currentUser && <Profile src={currentUser.githubProfile} alt="user-profile" />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  margin: 36px 30px 0 30px;
`;

const Logo = styled.img`
  width: 140px;
  height: 25px;

  border-radius: 0px;
`;

// TODO : 동그랗게 하기
const Profile = styled.img`
  height: 36px;
  width: 36px;

  border-radius: 0px;
`;
