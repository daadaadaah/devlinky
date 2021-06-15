import React from 'react';

import { useHistory } from 'react-router-dom';

import { fireEvent, render } from '@testing-library/react';

import MainPage from './MainPage';

import useCurrentUser from '../hooks/useCurrentUser';

import { currentUser } from '../../fixtures';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

jest.mock('../hooks/useCurrentUser');

describe('<MainPage />', () => {
  context('with currentUser', () => {
    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));
    });

    it('shows menus', () => {
      const { container } = render(<MainPage />);

      expect(container).toHaveTextContent('bookmark');

      expect(container).toHaveTextContent('list');
    });
  });

  context('without currentUser', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
      useHistory.mockImplementation(() => ({
        push: mockPush,
      }));

      useCurrentUser.mockImplementation(() => ({
        currentUser: null,
      }));
    });

    it('redirect to LoginPage', () => {
      render(<MainPage />);

      expect(mockPush).toBeCalledWith('/login');
    });
  });

  context('when bookmark menu is clicked', () => {
    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));
    });

    it('shows the devlink save form', () => {
      const { container, getByText } = render(<MainPage />);

      fireEvent.click(getByText(/bookmark/i));

      expect(container).toHaveTextContent('url');
      expect(container).toHaveTextContent('preview');
      expect(container).toHaveTextContent('comment');
      expect(container).toHaveTextContent('tags');
      expect(container).toHaveTextContent('save a contents');
    });
  });

  context('when list menu is clicked', () => {
    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));
    });

    it('shows list', () => {
      const { container, getByText } = render(<MainPage />);

      fireEvent.click(getByText(/list/i));

      expect(container).toHaveTextContent('list tab menu');
    });
  });
});
