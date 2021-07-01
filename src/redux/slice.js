import { createSlice } from '@reduxjs/toolkit';

import { fetchUrlMetaData } from '../services/api';
import { fetchUrl } from '../services/chrome';

const { actions, reducer } = createSlice({
  name: 'devlinky#',
  initialState: {
    currentUser: null,
    url: null,
    preview: null,
    comment: null,
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
    setComment(state, { payload: comment }) {
      return {
        ...state,
        comment,
      };
    },
  },
});

export const {
  setCurrentUser,
  setUrl,
  setPreview,
  setComment,
} = actions;

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
