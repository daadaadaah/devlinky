import { createSlice } from '@reduxjs/toolkit';

import {
  fetchUrlMetaData, login, isUser, autoSignup, postDevlink,
} from '../services/api';

import { fetchUrl } from '../services/chrome';

import { saveItem } from '../services/storage/localStorage';

import { teches } from '../../assets/js/data';

const { actions, reducer } = createSlice({
  name: 'devlinky#',
  initialState: {
    error: null,
    currentUser: null,
    url: null,
    preview: null,
    comment: null,
    tags: [],
    autoCompleteTags: [],
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
    setTags(state, { payload: tags }) {
      return {
        ...state,
        tags,
      };
    },
    setAutoCompleteTags(state, { payload: autoCompleteTags }) {
      return {
        ...state,
        autoCompleteTags,
      };
    },
    resetAutoCompleteTags(state) {
      return {
        ...state,
        autoCompleteTags: [],
      };
    },
    resetDevlink(state) {
      return {
        ...state,
        url: null,
        preview: null,
        comment: null,
        tags: [],
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
  setTags,
  setAutoCompleteTags,
  resetAutoCompleteTags,
  resetDevlink,
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

export const loadAutoCompleteTags = (newTag) => (dispatch) => {
  const autoCompleteTags = teches.filter((tech) => tech.name.toUpperCase().match(new RegExp(`^${newTag}`, 'i')));
  dispatch(setAutoCompleteTags(autoCompleteTags));
};

export const submitDevlink = () => async (dispatch, getState) => {
  const {
    currentUser, url, preview, comment, tags,
  } = getState();

  const devlink = {
    url,
    preview,
    comment,
    tags,
  };

  try {
    // eslint-disable-next-line no-unused-vars
    const response = await postDevlink({ userId: currentUser.uid, devlink });
    dispatch(resetDevlink());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default reducer;
