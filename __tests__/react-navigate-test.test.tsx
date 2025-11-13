import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import Events from '../client/controller/events';
interface Event {
  id: number;
  event_city: string;
  event_title: string;
  event_datetime: string;
  address: string;
  description: string;
  image: string;
  ticket_price: string;
  website_url: string;
  country: string;
  category: string;
}

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('useNavigate test', () => {
  const makeFutureIso = (daysAhead: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString();
  };

  it('redirects to the correct individual event post on click', async () => {
    const user = userEvent.setup();

    const testEvents: Event[] = [
      {
        id: 333,
        event_city: 'Tokyo',
        event_title: 'Future Event',
        event_datetime: makeFutureIso(1),
        address: '333 Street',
        description: 'A test event',
        image: 'https://example.com/image.jpg',
        ticket_price: '$100',
        website_url: 'https://example.com',
        country: 'Japan',
        category: 'Food',
      },
    ];
    render(<Events allEvents={testEvents} />);
    await user.click(screen.getByTestId('eventCard'));
    expect(mockNavigate).toHaveBeenCalledWith('/events/333');
  });
});
