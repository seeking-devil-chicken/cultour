import { useParams } from 'react-router-dom';
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

export default function IndividualEvent({ allEvents }) {
  const { id } = useParams();
  const post: Event = allEvents.find(
    (post: Event) => Number(post.id) === Number(id)
  );

  if (!post) {
    return <p>Post not found!</p>;
  }
  return (
    <>
      <header className='text-7xl px-5 py-5'>{post.event_title}</header>
      <img src={post.image} width='500px' height='300px'></img>
      <p>Event Date & Time: {post.event_datetime}</p>
      <p>Event Address: {post.address}</p>
      <p>Ticket: {post.ticket_price}</p>
      <p>{post.description}</p>
      <p>For more info, visit {post.website_url}</p>
    </>
  );
}
