import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Not Found component', () => {
  test('Page renders a heading with text `Page requested not found 😭`'
  + 'when the route is invalid', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/rota-que-não-existe');

    const notFoundTest = getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFoundTest).toBeInTheDocument();
  });

  test('Page renders the image Pikachu crying', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-não-existe');

    const altText = 'Pikachu crying because the page requested was not found';
    const imagePath = screen.getByAltText(altText);
    expect(imagePath.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
