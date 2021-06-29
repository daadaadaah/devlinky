import { getDefaultMiddleware } from '@reduxjs/toolkit';

import configureStore from 'redux-mock-store';

import {
  loadUrl, setUrl, fetchPreview, setPreview,
} from './slice';

import { fetchUrl } from '../services/chrome';
import { fetchUrlMetaData } from '../services/api';

import { url, preview } from '../../fixtures';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('../services/api');
jest.mock('../services/chrome');

describe('actions', () => {
  let store;

  describe('loadUrl', () => {
    beforeEach(() => {
      store = mockStore({
        url: null,
      });

      fetchUrl.mockImplementation(() => (url));
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
});
