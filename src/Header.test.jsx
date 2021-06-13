import React from 'react';

import { screen, render } from '@testing-library/react';

import useCurrentUser from './hooks/useCurrentUser';

import { currentUser } from '../fixtures';

import Header from './Header';

jest.mock('./hooks/useCurrentUser');

describe('<Header />', () => {
  context('inital render', () => {
    useCurrentUser.mockImplementation(() => ({
      currentUser: null,
    }));

    it('shows logo', () => {
      render(<Header />);
      const logo = screen.getByAltText('devlinky-logo');
      expect(logo).toHaveAttribute('src', '../assets/images/logo-small.png');
    });
  });

  context('with currentUser', () => {
    useCurrentUser.mockImplementation(() => ({
      currentUser,
    }));

    it('shows user profile', () => {
      render(<Header />);

      const userProfile = screen.getByAltText('user-profile');

      expect(userProfile).toHaveAttribute('src', currentUser.githubProfile);
    });
  });

  context('without currentUser', () => {
    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser: null,
      }));
    });

    it('do not show user profile', () => {
      render(<Header />);

      expect(screen.findByAltText('user-profile')).toBeDefined();
    });
  });
});
