import React from 'react';

import { render } from '@testing-library/react';

import { useHistory } from 'react-router-dom';

import LoginPage from './LoginPage';

import useCurrentUser from '../hooks/useCurrentUser';

import { currentUser } from '../../fixtures';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

jest.mock('../hooks/useCurrentUser');

describe('<LoginPage />', () => {
  context('without currentUser', () => {
    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser: null,
      }));
    });

    it('shows login button', () => {
      const { container } = render(<LoginPage />);

      expect(container).toHaveTextContent('login');
    });
  });

  context('with currentUser', () => {
    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));

      const mockPush = jest.fn();
      useHistory.mockImplementation(() => ({
        push: mockPush,
      }));
    });

    it('shows mainPage', () => {
      const { container } = render(<LoginPage />);

      expect(container).toHaveTextContent('login');
    });
  });
});
