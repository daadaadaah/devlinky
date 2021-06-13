import React from 'react';

import { screen, render } from '@testing-library/react';

import Header from './Header';

describe('<Header />', () => {
  it('shows logo', () => {
    render(<Header />);
    const logo = screen.getByAltText('devlinky-logo');
    expect(logo).toHaveAttribute('src', '../assets/images/logo-small.png');
  });
});
