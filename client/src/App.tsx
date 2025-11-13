import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Posts from '../components/Posts';
import Discover from '../controller/discover.tsx';
import IndividualPost from '../components/individualPost.tsx';
import Events from '../controller/events.tsx';
import IndividualEvent from '../components/individualEvent.tsx';

interface Posts {
  id: number;
  created_at: string;
  user_id: number;
  country: string;
  category: string;
  title: string;
  text: string;
  image: string;
}

interface User {
  user_id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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
//helper function to create request param
async function fetchEventsByCountry(
  dateFrom: string,
  dateTo: string,
  country?: string
) {
  const params = new URLSearchParams();
  if (country) {
    params.set('country', country);
  }
  params.set('startDate', dateFrom);
  params.set('endDate', dateTo);
  const res = await fetch(
    `http://localhost:4000/api/events?${params.toString()}`
  );
  if (!res.ok) {
    throw new Error('there was a problem fetching events data');
  }
  return res.json();
}

export default function App() {
  const [allData, setAllData] = useState<Posts[] | null>(null);

  const [postData, setPostData] = useState();
  const [eventsData, setEventsData] = useState<Event[]>();

  //GET request
  useEffect(() => {
    console.log('🍎inside useEffect');
    const getData = async () => {
      try {
        console.log('inside try🍊');
        const url = 'http://localhost:4000/countries';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('there was an error fetching all data');
        }
        const fetchedData = await response.json();
        setAllData(fetchedData);
        console.log('✅', fetchedData);
      } catch (error) {
        throw new Error(`Could not fetch data ${error}`);
      }
    };
    getData();
  }, []);

  //GET request for events data
  useEffect(() => {
    const getEventsData = async () => {
      const today = new Date();
      const oneMonth = new Date();
      oneMonth.setDate(oneMonth.getDate() + 30);
      const todayAPI = today.toISOString().split('T')[0];
      const oneMonthAPI = oneMonth.toISOString().split('T')[0];
      const promise = fetchEventsByCountry(todayAPI, oneMonthAPI);
      const eventsData = await promise;
      setEventsData(eventsData);
    };
    getEventsData();
  }, []);

  const navigate = useNavigate();

  //router structure for the whole app
  return (
    <div className='max-w-[1200px] mx-auto mb-5'>
      <header className='homePage flex justify-center flex-col items-center text-3xl pb-10'>
        <Link to='/'>
          <img
            className='logo'
            id='logo'
            src='../client/assets/favicon.png'
            width='100px'
            height='100px'
          ></img>
        </Link>
        <h1 className='text-3xl'>Cultour</h1>
      </header>

      <div className='paths'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <h1 className='text-5xl px-5 py-5'>Welcome!</h1>
                <p className='p-1 px-5 py-5'>
                  Cultour is an app designed to broaden your understanding of
                  cultures around the world through diverse experiences you can
                  enjoy alone or with others — from food and games to customs,
                  rituals, and media. It’s a space for discovery, connection,
                  and community building.
                </p>
                <div className='pathWrapper grid grid-cols-1 md:grid-cols-2 gap-8 m-5'>
                  <div
                    className='discoverPath relative aspect-[16/9] overflow-hidden object-cover object-center group rounded-xl'
                    onClick={() => navigate('/discover')}
                  >
                    <img
                      src='../client/assets/discover-image.png'
                      className='w-full h-full object-cover object-center block'
                    ></img>
                    <div className='absolute inset-0 bg-black/30 group-hover:bg-[#fcc61d] transition-colors duration-300'></div>
                    <div className='absolute inset-0 flex justify-center items-center pl-7 pr-7 z-10'>
                      <h2
                        className='text-3xl text-[#f7f7f7] text-shadow-sm text-shadow-black/10'
                        id='discover'
                      >
                        Discover activities
                      </h2>
                    </div>
                  </div>
                  <div
                    className='eventsPath relative aspect-[16/9] overflow-hidden object-cover object-center group rounded-xl'
                    onClick={() => navigate('/events')}
                  >
                    <img
                      src='../client/assets/find-events-image.jpg'
                      className='w-full h-full object-cover object-center block'
                    ></img>
                    <div className='absolute inset-0 bg-black/30 group-hover:bg-[#fcc61d] transition-colors duration-300'></div>
                    <div className='absolute inset-0 flex justify-center items-center pl-7 pr-7 z-10'>
                      <h2
                        className='text-3xl text-[#f7f7f7] text-shadow-sm text-shadow-black/10'
                        id='events'
                      >
                        Find events
                      </h2>
                    </div>
                  </div>
                </div>
              </>
            }
          />
          <Route
            path='/discover'
            element={
              <>
                <Discover allData={allData} newPostData={setPostData} />
              </>
            }
          />

          <Route
            path='/posts/:id'
            element={<IndividualPost allData={allData} />}
          />
          <Route
            path='/events/'
            element={
              <>
                <Events allEvents={eventsData} />
              </>
            }
          />
          <Route path='/events/:id' element={<IndividualEvent />} />
        </Routes>
      </div>
    </div>
  );
}
