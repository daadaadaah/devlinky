import { getDefaultMiddleware } from '@reduxjs/toolkit';

import configureStore from 'redux-mock-store';

import { fetchPreview, setPreview } from './slice';

import { fetchUrlMetaData } from '../services/api';

import { preview } from '../../fixtures';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('../services/api');

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
});
