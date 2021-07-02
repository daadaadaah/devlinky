import { getDefaultMiddleware } from '@reduxjs/toolkit';

import configureStore from 'redux-mock-store';

import {
  loadUrl,
  setUrl,
  fetchPreview,
  setPreview,
  loadCurrentUser,
  setCurrentUser,
} from './slice';

import { fetchUrl } from '../services/chrome';
import { fetchUrlMetaData, login } from '../services/api';

import { url, preview, currentUser } from '../../fixtures';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('../services/api');
jest.mock('../services/chrome');
jest.mock('../services/storage/localStorage');

describe('actions', () => {
  let store;

  describe('loadUrl', () => {
    beforeEach(() => {
      store = mockStore({
        url: null,
      });

      fetchUrl.mockResolvedValue(url);
    });

    it('runs setUrl', async () => {
      await store.dispatch(loadUrl());

      const actions = store.getActions();

      expect(actions[0]).toStrictEqual(setUrl(url));
    });
  });

  describe('fetchPreview', () => {
    beforeEach(() => {
      store = mockStore({
        url,
      });

      fetchUrlMetaData.mockResolvedValue(preview);
    });

    it('runs setPreview', async () => {
      await store.dispatch(fetchPreview());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setPreview(preview));
    });
  });

  describe('loadCurrentUser', () => {
    beforeEach(() => {
      store = mockStore({
        currentUser: null,
      });

      login.mockResolvedValue(currentUser);
    });

    it('runs setCurrentUser', async () => {
      await store.dispatch(loadCurrentUser());

      const actions = store.getActions();

      expect(actions[0]).toStrictEqual(setCurrentUser(currentUser));
    });
  });
});
