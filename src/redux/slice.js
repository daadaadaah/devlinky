import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'devlinky#',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser(state, { payload: currentUser }) {
      return {
        ...state,
        currentUser,
      };
    },
  },
});

export const {
  setCurrentUser,
} = actions;

export default reducer;
