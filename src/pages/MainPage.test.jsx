import React from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import MainPage from './MainPage';

import useCurrentUser from '../hooks/useCurrentUser';

import { setUrl } from '../redux/slice';

import { currentUser, url, preview } from '../../fixtures';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

jest.mock('react-redux');

jest.mock('../hooks/useCurrentUser');

describe('<MainPage />', () => {
  context('with currentUser', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));

      useDispatch.mockImplementation(() => dispatch);
    });

    it('shows menus', () => {
      const { container } = render(<MainPage />);

      expect(container).toHaveTextContent('bookmark');

      expect(container).toHaveTextContent('list');
    });
  });

  context('without currentUser', () => {
    const dispatch = jest.fn();
    const mockPush = jest.fn();

    beforeEach(() => {
      useHistory.mockImplementation(() => ({
        push: mockPush,
      }));

      useCurrentUser.mockImplementation(() => ({
        currentUser: null,
      }));

      useDispatch.mockImplementation(() => dispatch);
    });

    it('redirect to LoginPage', () => {
      render(<MainPage />);

      expect(mockPush).toBeCalledWith('/login');
    });
  });

  context('when bookmark menu is clicked', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));

      useDispatch.mockImplementation(() => dispatch);
    });

    it('shows the devlink save form', () => {
      const { container, getByText, getByAltText } = render(<MainPage />);

      fireEvent.click(getByText(/bookmark/i));

      expect(container).toHaveTextContent('url');
      expect(container).toHaveTextContent('preview');
      expect(getByAltText('preview-default')).toHaveAttribute('src', '../../assets/images/preview_default.png');
      expect(container).toHaveTextContent('comment');
      expect(container).toHaveTextContent('tags');
      expect(container).toHaveTextContent('save a contents');
    });
  });

  context('when list menu is clicked', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));

      useDispatch.mockImplementation(() => dispatch);
    });

    it('shows list', () => {
      const { container, getByText } = render(<MainPage />);

      fireEvent.click(getByText(/list/i));

      expect(container).toHaveTextContent('list tab menu');
    });
  });

  context('with url & preview', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));

      useDispatch.mockImplementation(() => dispatch);

      useSelector.mockImplementation((selector) => selector({
        url,
        preview,
      }));
    });

    it('shows url info', () => {
      const { container, getByAltText } = render(<MainPage />);

      expect(container).toBeInTheDocument(preview.url);
      expect(container).toBeInTheDocument(preview.title);
      expect(getByAltText('thumbnail')).toHaveAttribute('src', preview.thumbnail);
    });
  });

  context('without url', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));

      useDispatch.mockImplementation(() => dispatch);

      useSelector.mockImplementation((selector) => selector({
        url: null,
      }));
    });

    it('shows preview default image', () => {
      const { getByAltText } = render(<MainPage />);

      expect(getByAltText('preview-default')).toHaveAttribute('src', '../../assets/images/preview_default.png');

      jest.useFakeTimers();

      setTimeout(() => {
        expect(dispatch).toBeCalledWith(setUrl(url));
      }, 1000);
    });
  });

  context('with url & without preview', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));

      useDispatch.mockImplementation(() => dispatch);

      useSelector.mockImplementation((selector) => selector({
        url,
        preview: null,
      }));
    });

    it('listens change events', () => {
      const { container } = render(<MainPage />);

      expect(container).toBeInTheDocument(url);

      expect(dispatch).not.toBeCalledWith(setUrl(url));
      expect(dispatch).toBeCalledTimes(1);
    });
  });

  context('when url input is modified', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));

      useDispatch.mockImplementation(() => dispatch);

      useSelector.mockImplementation((selector) => selector({
        url,
        preview,
      }));
    });

    it('change url', () => {
      const { getByLabelText } = render(<MainPage />);

      const newUrl = 'http://example.com';

      fireEvent.change(getByLabelText('devlink-url'), {
        target: { value: newUrl },
      });

      expect(dispatch).toBeCalledWith(setUrl(newUrl));
    });
  });

  context('when search button is clicked', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      useCurrentUser.mockImplementation(() => ({
        currentUser,
      }));

      useDispatch.mockImplementation(() => dispatch);

      useSelector.mockImplementation((selector) => selector({
        url,
        preview,
      }));
    });

    it('change preivew', () => {
      const { getByLabelText } = render(<MainPage />);

      fireEvent.click(getByLabelText('search-url'));

      expect(dispatch).toBeCalledTimes(1);
    });
  });
});
