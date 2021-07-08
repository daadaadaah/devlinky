import styled from '@emotion/styled';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import useCurrentUser from './hooks/useCurrentUser';

import style from './styles/designSystem';

import { removeCurrentUser, setToggleMenu, resetToggleMenu } from './redux/slice';

import { get } from './utils';

export default function Header() {
  const { currentUser } = useCurrentUser();

  const dispatch = useDispatch();

  const toggleMenu = useSelector(get('toggleMenu'));

  const handleClickProfile = () => {
    dispatch(setToggleMenu(!toggleMenu));
  };

  const handleClickLogout = () => {
    dispatch(removeCurrentUser());
    dispatch(resetToggleMenu());
  };

  return (
    <Layout>
      <Logo src="../assets/images/logo-small.png" alt="devlinky-logo" />
      {currentUser && (
        <>
          <Profile src={currentUser.githubProfile} onClick={handleClickProfile} alt="user-profile" />
          <SpeechBubble toggleMenu={toggleMenu}>
            <div />
            <div>
              <button type="button" onClick={handleClickLogout}>Log out</button>
            </div>
          </SpeechBubble>
        </>
      )}
    </Layout>
  );
}

const Layout = styled.header`
  margin: ${style.common.interval.small} ${style.common.interval.tiny} 0;

  & img:nth-of-type(1) {
    margin-top: 6px;
  }

  & img:nth-of-type(2) {
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

const SpeechBubble = styled.div`
  display: ${({ toggleMenu }) => (toggleMenu ? 'block' : 'none')};
`;
