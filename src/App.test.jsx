import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import { currentUser } from '../fixtures';

jest.mock('react-redux');

describe('<App />', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      currentUser,
    }));
  });

  it('shows user profile', () => {
    const { container } = render(<App />);
    expect(container).toHaveTextContent('devlinky');
  });
});
