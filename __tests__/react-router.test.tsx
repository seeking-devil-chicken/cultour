import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import App from '../client/src/App';
import Events from '../client/controller/events';
import IndividualEvent from '../client/components/individualEvent';

vi.mock('../client/controller/discover.tsx', () => ({
  default: () => <h1>Post your own!</h1>,
}));

vi.mock('../client/controller/events.tsx', () => ({
  default: () => <h1>Filter events by country</h1>,
}));

describe('home routing', () => {
  function setup() {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    return { user };
  }
  vi.mock('../client/controller/discover.tsx', () => ({
    default: () => <h1>Post your own!</h1>,
  }));

  vi.mock('../client/controller/events.tsx', () => ({
    default: () => <h1>Filter events by country</h1>,
  }));

  it('renders home page', async () => {
    setup();
    expect(
      screen.getByRole('heading', { name: /welcome/i })
    ).toBeInTheDocument();
  });

  it('renders discover page on click', async () => {
    const { user } = setup();
    await user.click(screen.getByTestId('discoverPath'));
    expect(
      screen.getByRole('heading', { name: /Post your own!/i })
    ).toBeInTheDocument();
  });

  it('renders events page on click', async () => {
    const { user } = setup();
    await user.click(screen.getByTestId('eventsPath'));
    expect(
      screen.getByRole('heading', { name: /Filter events by country/i })
    ).toBeInTheDocument();
  });
});
