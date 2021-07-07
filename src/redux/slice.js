import { createSlice } from '@reduxjs/toolkit';

import {
  fetchUrlMetaData, login, isUser, autoSignup,
} from '../services/api';

import { fetchUrl } from '../services/chrome';

import { saveItem } from '../services/storage/localStorage';

const { actions, reducer } = createSlice({
  name: 'devlinky#',
  initialState: {
    error: null,
    currentUser: null,
    url: null,
    preview: null,
    comment: null,
  },
  reducers: {
    setError(state, { payload: error }) {
      return {
        ...state,
        error,
      };
    },
    setCurrentUser(state, { payload: currentUser }) {
      return {
        ...state,
        currentUser,
      };
    },
    setUrl(state, { payload: url }) {
      return {
        ...state,
        url,
      };
    },
    setPreview(state, { payload: preview }) {
      return {
        ...state,
        preview,
      };
    },
    setComment(state, { payload: comment }) {
      return {
        ...state,
        comment,
      };
    },
  },
});

export const {
  setError,
  setCurrentUser,
  setUrl,
  setPreview,
  setComment,
} = actions;

export const loadCurrentUser = () => async (dispatch) => {
  try {
    const currentUser = await login();

    const user = {
      firebaseUid: currentUser.uid,
      githubId: currentUser.githubId,
      githubProfile: currentUser.githubProfile,
    };

    // eslint-disable-next-line no-unused-vars
    const response = await isUser(user.firebaseUid) || await autoSignup(user);

    saveItem('LAST_LOGIN_USER', JSON.stringify(currentUser));

    dispatch(setCurrentUser(currentUser));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loadUrl = () => async (dispatch) => {
  const url = await fetchUrl();
  dispatch(setUrl(url));
};

export const fetchPreview = () => async (dispatch, getState) => {
  const { url } = getState();

  const { title, thumbnail } = await fetchUrlMetaData(url);

  dispatch(setPreview({
    url,
    title,
    thumbnail,
  }));
};

export default reducer;
