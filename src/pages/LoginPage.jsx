import React from 'react';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import useCurrentUser from '../hooks/useCurrentUser';

import { loadCurrentUser } from '../redux/slice';

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
    <>
      <main>
        <button type="button" id="btn-login" onClick={handleClickLogin}>Github login</button>
      </main>
    </>
  );
}
