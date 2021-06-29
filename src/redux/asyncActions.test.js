import { getDefaultMiddleware } from '@reduxjs/toolkit';

import configureStore from 'redux-mock-store';

import {
  fetchPreview, setPreview, loadUrl, setUrl,
} from './slice';

import { fetchUrlMetaData } from '../services/api';
import { fetchUrl } from '../services/chrome';

import { preview } from '../../fixtures';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('../services/api');
jest.mock('../services/chrome');

describe('actions', () => {
  let store;

  describe('fetchPreview', () => {
    beforeEach(() => {
      store = mockStore({
        url: preview.url,
      });

      fetchUrlMetaData.mockResolvedValue(preview);
    });

    it('runs setPreview', async () => {
      await store.dispatch(fetchPreview());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setPreview(preview));
    });
  });

  describe('loadUrl', () => {
    beforeEach(() => {
      store = mockStore({
        url: null,
      });

      fetchUrl.mockImplementation((callback) => callback(preview.url));
    });

    it('runs setUrl', async () => {
      await store.dispatch(loadUrl());

      const actions = store.getActions();

      expect(actions[0]).toStrictEqual(setUrl(preview.url));
    });
  });
});
