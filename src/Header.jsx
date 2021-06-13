import React from 'react';

import useCurrentUser from './hooks/useCurrentUser';

export default function Header() {
  const { currentUser } = useCurrentUser();

  return (
    <>
      <img src="../assets/images/logo-small.png" alt="devlinky-logo" />
      {currentUser && <img src={currentUser.githubProfile} alt="user-profile" />}
    </>
  );
}
