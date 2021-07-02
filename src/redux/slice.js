import { createSlice } from '@reduxjs/toolkit';

import { fetchUrlMetaData, login } from '../services/api';

import { fetchUrl } from '../services/chrome';

import { saveItem } from '../services/storage/localStorage';

const { actions, reducer } = createSlice({
  name: 'devlinky#',
  initialState: {
    currentUser: null,
    url: null,
    preview: null,
  },
  reducers: {
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
  },
});

export const {
  setCurrentUser,
  setUrl,
  setPreview,
} = actions;

export const loadCurrentUser = () => async (dispatch) => {
  const currentUser = await login();

  saveItem('LAST_LOGIN_USER', JSON.stringify(currentUser));

  dispatch(setCurrentUser(currentUser));
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
