import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';
import App from '../App';

describe('About component', () => {
  test('Page contains information about Pokédex, and '
    + 'contains 2 paragraphs about Pokédex', () => {
    const { history } = renderWithRouter(<About />);

    history.push('/about');

    const paragraphs = screen.getAllByText(
      (content, element) => element.tagName.toLowerCase() === 'p'
      && content.includes('Pokémons'),
    );
    expect(paragraphs).toHaveLength(2);
  });

  test('Page contains a h2 heading with text `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutPage = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(aboutPage).toBeInTheDocument();
  });

  test('Page contains image of a Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const imagePath = screen.getByAltText('Pokédex');
    expect(imagePath.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  test('Click on link redirects to About page', () => {
    const { getByRole } = renderWithRouter(<App />);

    const linkAbout = getByRole('link', {
      name: /about/i,
    });
    userEvent.click(linkAbout);

    const aboutPage = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(aboutPage).toBeInTheDocument();
  });
});

// Referências p/ queries de prioridade, encontrar tags p e img:
// --> https://testing-library.com/docs/queries/about/#priority
// --> https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
