import reducer, {
  setCurrentUser,
} from './slice';

import { currentUser } from '../../fixtures';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      currentUser: null,
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
});
