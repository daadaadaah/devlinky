import { createSlice } from '@reduxjs/toolkit';

import { fetchUrlMetaData } from '../services/api';
import { fetchUrl } from '../services/chrome';

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

export const loadUrl = () => (dispatch) => {
  fetchUrl((data) => dispatch(setUrl(data)));
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
