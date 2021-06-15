import React from 'react';

import { useHistory } from 'react-router-dom';

import useCurrentUser from '../hooks/useCurrentUser';

export default function LoginPage() {
  const history = useHistory();

  const { currentUser } = useCurrentUser();

  if (currentUser) {
    history.push('/');
  }

  return (
    <>
      <main>
        <button type="button">Github login</button>
      </main>
    </>
  );
}
