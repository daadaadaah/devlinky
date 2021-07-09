import reducer, {
  setError,
  setCurrentUser,
  resetCurrentUser,
  setSelectTabMenu,
  setUrl,
  setPreview,
  setComment,
  setTags,
  setAutoCompleteTags,
  resetAutoCompleteTags,
  resetDevlink,
  settoggleSpeechBubble,
  resettoggleSpeechBubble,
} from './slice';

import {
  error,
  currentUser,
  url,
  preview,
  comment,
  tags,
  autoCompleteTags,
  toggleSpeechBubble,
  selectTabMenu,
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
      toggleSpeechBubble: false,
      selectTabMenu: selectTabMenu.Menu1,
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

  describe('resetCurrentUser', () => {
    it('reset CurrentUser', () => {
      const initialState = {
        currentUser,
        url: null,
        preview: null,
      };

      const state = reducer(initialState, resetCurrentUser());

      expect(state.currentUser).toBeNull();
    });
  });

  describe('setSelectTabMenu', () => {
    it('reset SelectTabMenu', () => {
      const initialState = {
        currentUser,
        url: null,
        preview: null,
        selectTabMenu: selectTabMenu.Menu1,
      };

      const state = reducer(initialState, setSelectTabMenu(selectTabMenu.Menu2));

      expect(state.selectTabMenu).toBe(selectTabMenu.Menu2);
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

  describe('resetDevlink', () => {
    it('reset Devlink', () => {
      const initialState = {
        currentUser: null,
        url,
        preview,
        comment,
        tags,
        autoCompleteTags: [],
      };

      const state = reducer(initialState, resetDevlink());

      expect(state.url).toBeNull();
      expect(state.preview).toBeNull();
      expect(state.comment).toBeNull();
      expect(state.tags).toStrictEqual([]);
    });
  });

  describe('settoggleSpeechBubble', () => {
    it('set toggleSpeechBubble', () => {
      const initialState = {
        currentUser: null,
        url: null,
        preview: null,
        comment: null,
        tags: [],
        autoCompleteTags: [],
        toggleSpeechBubble: false,
      };

      const state = reducer(initialState, settoggleSpeechBubble(toggleSpeechBubble));

      expect(state.toggleSpeechBubble).toBeTruthy();
    });
  });

  describe('resettoggleSpeechBubble', () => {
    it('reset toggleSpeechBubble', () => {
      const initialState = {
        currentUser: null,
        url: null,
        preview: null,
        comment: null,
        tags: [],
        autoCompleteTags: [],
        toggleSpeechBubble,
      };

      const state = reducer(initialState, resettoggleSpeechBubble());

      expect(state.toggleSpeechBubble).toBeFalsy();
    });
  });
});
