import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

interface RelatedPost {
  id: number;
  title: string;
  text: string;
  image: string;
  country: string;
}

interface EventData {
  eventDetails: Event;
  relatedPosts: RelatedPost[];
}

function formatEventDateTime(isoString: string): string {
  const date = new Date(isoString);

  const datePart = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${datePart} | ${timePart}`;
}
export default function IndividualEvent() {
  const { id } = useParams();
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:4000/api/events/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Event not found!');
          } else {
            throw new Error('Failed to fetch event data');
          }
        } else {
          const data: EventData = await response.json();
          setEventData(data);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!eventData) {
    return <p>Event not found!</p>;
  }

  const { eventDetails, relatedPosts } = eventData;

  return (
    <>
      <header className='text-5xl py-5'>{eventDetails.event_title}</header>
      {/* <div className='absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300'></div> */}
      <img
        src={eventDetails.image}
        width='500px'
        height='300px'
        className='w-full h-full object-cover object-center block'
      ></img>

      <p>{formatEventDateTime(eventDetails.event_datetime)}</p>
      <p>Event Address: {eventDetails.address}</p>
      <p>Ticket: {eventDetails.ticket_price}</p>
      <p>{eventDetails.description}</p>
      <p>For more info, visit {eventDetails.website_url}</p>

      <h2 className='text-5xl py-5 mt-10'>Related Posts</h2>
      {relatedPosts.length > 0 ? (
        <div className='related-posts-grid grid grid-cols-2 gap-4 p-5'>
          {relatedPosts.map((post) => (
            <div key={post.id} className='post-card overflow-hidden shadow-lg'>
              <Link to={`/posts/${post.id}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className='my-5 w-full h-48 object-cover'
                />
              </Link>
              <div className='p-4'>
                <Link to={`/posts/${post.id}`}>
                  <h3 className='text-2xl font-bold'>{post.title}</h3>
                </Link>
                <p>{post.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='px-5'>No related posts found for this event's country.</p>
      )}
    </>
  );
}
