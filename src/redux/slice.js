import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'devlinky#',
  initialState: {
    currentUser: null,
    url: null,
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
  },
});

export const {
  setCurrentUser,
  setUrl,
} = actions;

export default reducer;
