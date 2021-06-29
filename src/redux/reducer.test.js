import reducer, {
  setCurrentUser,
  setUrl,
  setPreview,
  setComment,
} from './slice';

import {
  currentUser, url, preview, comment,
} from '../../fixtures';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      currentUser: null,
      url: null,
      preview: null,
      comment: null,
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
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

  describe('setCommnet', () => {
    it('set Commnet', () => {
      const initialState = {
        currentUser: null,
        url: null,
        preview: null,
        comment: null,
      };

      const state = reducer(initialState, setComment(comment));

      expect(state.comment).toStrictEqual(comment);
    });
  });
});
