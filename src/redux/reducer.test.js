import reducer, {
  setError,
  setCurrentUser,
  setUrl,
  setPreview,
} from './slice';

import {
  error, currentUser, url, preview,
} from '../../fixtures';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      currentUser: null,
      url: null,
      preview: null,
      error: null,
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setError', () => {
    it('set error', () => {
      const initialState = {
        error: null,
      };

      const state = reducer(initialState, setError(error));

      expect(state.error).toStrictEqual(error);
    });
  });

  describe('setCurrentUser', () => {
    it('set currentUser', () => {
      const initialState = {
        currentUser: null,
      };

      const state = reducer(initialState, setCurrentUser(currentUser));

      expect(state.currentUser).toStrictEqual(currentUser);
    });
  });

  describe('setUrl', () => {
    it('set url', () => {
      const initialState = {
        currentUser: null,
        url: null,
        preview: null,
      };

      const state = reducer(initialState, setUrl(url));

      expect(state.url).toStrictEqual(url);
    });
  });

  describe('setPreview', () => {
    it('set Preview', () => {
      const initialState = {
        currentUser: null,
        url: null,
        preview: null,
      };

      const state = reducer(initialState, setPreview(preview));

      expect(state.preview).toStrictEqual(preview);
    });
  });
});
