import reducer, {
  setError,
  setCurrentUser,
  setUrl,
  setPreview,
  setComment,
  setTags,
  setAutoCompleteTags,
  resetAutoCompleteTags,
} from './slice';

import {
  error, currentUser, url, preview, comment, tags, autoCompleteTags,
} from '../../fixtures';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      error: null,
      currentUser: null,
      url: null,
      preview: null,
      comment: null,
      tags: [],
      autoCompleteTags: [],
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

  describe('setTags', () => {
    it('set Tags', () => {
      const initialState = {
        currentUser: null,
        url: null,
        preview: null,
        comment: null,
        tags: [],
      };

      const state = reducer(initialState, setTags(tags));

      expect(state.tags).toStrictEqual(tags);
    });
  });

  describe('setAutoCompleteTags', () => {
    it('set autoCompleteTags', () => {
      const initialState = {
        currentUser: null,
        url: null,
        preview: null,
        comment: null,
        tags: [],
        autoCompleteTags: [],
      };

      const state = reducer(initialState, setAutoCompleteTags(autoCompleteTags));

      expect(state.autoCompleteTags).toStrictEqual(autoCompleteTags);
    });
  });

  describe('resetAutoCompleteTags', () => {
    it('reset autoCompleteTags', () => {
      const initialState = {
        currentUser: null,
        url: null,
        preview: null,
        comment: null,
        tags: [],
        autoCompleteTags,
      };

      const state = reducer(initialState, resetAutoCompleteTags());

      expect(state.autoCompleteTags).toStrictEqual([]);
    });
  });
});
