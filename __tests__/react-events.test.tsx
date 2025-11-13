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
describe('event page tests', () => {
  const makeFutureIso = (daysAhead: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString();
  };

  const makePastIso = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString();
  };
  it('only displays future events', () => {
    const fakeEvents: Event[] = [
      {
        id: 1234,
        event_city: 'Tokyo',
        event_title: 'Future Event',
        event_datetime: makeFutureIso(2),
        address: '1234 Street',
        description: 'A test event',
        image: 'https://example.com/image.jpg',
        ticket_price: '$100',
        website_url: 'https://example.com',
        country: 'Japan',
        category: 'Food',
      },
      {
        id: 4321,
        event_city: 'New York',
        event_title: 'Past Event',
        event_datetime: makePastIso(2),
        address: '4321 Street',
        description: 'A test event',
        image: 'https://example.com/image.jpg',
        ticket_price: '$50',
        website_url: 'https://example.com',
        country: 'USA',
        category: 'Media',
      },
    ];

    render(
      <MemoryRouter>
        <Events allEvents={fakeEvents} />
      </MemoryRouter>
    );
    expect(screen.getByText('Future Event')).toBeInTheDocument();
    expect(screen.queryByText('Past Event')).not.toBeInTheDocument();
  });

  it('only shows 3 event cards at a time', () => {
    const testEvent = {
      event_city: 'Tokyo',
      event_title: 'Future Event',
      event_datetime: makeFutureIso(1),
      address: '1234 Street',
      description: 'A test event',
      image: 'https://example.com/image.jpg',
      ticket_price: '$100',
      website_url: 'https://example.com',
      country: 'Japan',
      category: 'Food',
    };
    const allTestEvents: Event[] = [];
    for (let i = 0; i < 5; i++) {
      allTestEvents.push({
        ...testEvent,
        id: i + 1,
        event_title: `Event ${1 + i}`,
      });
    }

    render(
      <MemoryRouter>
        <Events allEvents={allTestEvents} />
      </MemoryRouter>
    );
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('Event 3')).toBeInTheDocument();
    expect(screen.queryByText('Event 4')).not.toBeInTheDocument();
    expect(screen.queryByText('Event 5')).not.toBeInTheDocument();
  });
});
