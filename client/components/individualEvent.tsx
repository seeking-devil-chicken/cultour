import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MdAccessTimeFilled } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { IoTicket } from 'react-icons/io5';
import { TbWorld } from 'react-icons/tb';
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
      <div className='pageWrapper mx-auto flex flex-col gap-5'>
        <div className='imageWrapper relative w-full aspect-[16/9] mx-auto overflow-hidden object-cover object-center block rounded-xl'>
          <img
            src={eventDetails.image}
            className='w-full h-full object-cover object-center block'
          ></img>
          <div className='absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300'></div>
          <div className='absolute inset-0 flex justify-center flex-wrap items-center text-8xl p-8 z-10'>
            <h1 className='text-8xl'>
              {eventDetails.event_title.toUpperCase()}
            </h1>
          </div>
        </div>
        <div className='infoWrapper grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 bg-[#c59560] text-[#f7f7f7] p-8 mt-8 rounded-xl'>
          <div className='leftColumn md:col-span-1 flex flex-col flex-flexwrap text-1xl gap-4'>
            <div className='flex items-center gap-2'>
              <MdAccessTimeFilled className='text-2xl' />
              <span>{formatEventDateTime(eventDetails.event_datetime)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <FaLocationDot className='text-2xl' />
              <span>{eventDetails.address}</span>
            </div>
            <div className='flex items-center gap-2'>
              <IoTicket className='text-2xl' />
              <span>{eventDetails.ticket_price}</span>
            </div>
            <div className='flex items-center gap-2'>
              <TbWorld className='text-2xl' />
              <span>
                <a
                  href={eventDetails.website_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline hover:text-[#3338a0]'
                >
                  Visit website
                </a>
              </span>
            </div>
          </div>
          <div className='right Column md:col-span-2 md:border-l md:border-white md:pl-8'>
            <p className='pb-3'>ABOUT</p>
            <p>{eventDetails.description}</p>
          </div>
        </div>
        <div className='relatedPostsWrapper'>
          <h2 className='text-5xl py-5 mt-10'>Related Posts</h2>
          {relatedPosts.length > 0 ? (
            <div className='related-posts-grid grid grid-cols-2 gap-4 p-5'>
              {relatedPosts.map((post) => (
                <div
                  key={post.id}
                  className='post-card overflow-hidden shadow-lg'
                >
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
            <p className='px-5'>
              No related posts found for this event's country.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
