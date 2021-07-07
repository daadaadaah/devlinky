import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import { currentUser } from '../fixtures';

jest.mock('react-redux');

describe('<App />', () => {
  const dispatch = jest.fn();

  function renderApp({ path }) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );
  }

  context('with any path ', () => {
    beforeEach(() => {
      useDispatch.mockImplementation(() => dispatch);
    });

    it('shows App name', () => {
      const { getByAltText } = renderApp({ path: '/' });

      const logo = getByAltText('devlinky-logo');
      expect(logo).toHaveAttribute('src', '../assets/images/logo-small.png');
    });
  });

  context('with path / & with currentUser', () => {
    beforeEach(() => {
      useDispatch.mockImplementation(() => dispatch);

      useSelector.mockImplementation((selector) => selector({
        currentUser,
      }));
    });

    it('shows menus', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('newlink');
      expect(container).toHaveTextContent('list');
    });
  });

  context('with path / & without currentUser', () => {
    beforeEach(() => {
      useDispatch.mockImplementation(() => dispatch);

      useSelector.mockImplementation((selector) => selector({
        currentUser: null,
      }));
    });

    it('does not show menus & redirect loginPage', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).not.toHaveTextContent('newlink');
      expect(container).not.toHaveTextContent('list');
      expect(container).toHaveTextContent('login');
    });
  });
});
