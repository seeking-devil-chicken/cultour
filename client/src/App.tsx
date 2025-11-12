import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
async function fetchEventsByCountry(country, dateFrom, dateTo) {
  const params = new URLSearchParams();
  params.set('country', country);
  params.set('startDate', dateFrom);
  params.set('endDate', dateTo);
  const res = await fetch(
    'http://localhost:3000/api/events?${params.toString()}'
  );
  if (!res) {
    throw new Error('there was a problem fetching events data');
  }
  return res.json();
}

export default function App() {
  const [allData, setAllData] = useState<Posts[] | null>(null);

  const [postData, setPostData] = useState();
  const [eventCountries, setEventCountries] = useState<String[]>();
  const [selectedCountry, setSelectedCountry] = useState<String>();
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

  // console.log('🍎allData', allData);
  // //POST request for creating new posts
  // useEffect(() => {
  //   const postData = async () => {
  //     const url = 'http://localhost:4000/userpost'; //will update later
  //     const newPost = {
  //       name: '',
  //       country: '',
  //       category: '',
  //       text: '',
  //       image: '',
  //     };
  //     try {
  //       const postResponse = await fetch(url, {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/JSON',
  //           'content-type': 'application/JSON',
  //         },
  //         body: JSON.stringify(newPost),
  //       });
  //       if (!postResponse.ok) {
  //         throw new Error('there was a problem adding new post to database');
  //       }
  //       const postedData = await postResponse.json();
  //     } catch (error) {
  //       throw new Error(`error during post request, ${error}`);
  //     }
  //   };
  //   postData();
  // }, []);

  //GET request for events data
  useEffect(() => {
    if (!selectedCountry) return;
    const getEventsData = async () => {
      const today = new Date();
      const oneMonth = new Date();
      oneMonth.setDate(oneMonth.getDate() + 30);
      const todayAPI = today.toISOString().split('T')[0];
      const oneMonthAPI = oneMonth.toISOString().split('T')[0];
      const promise = fetchEventsByCountry(
        selectedCountry,
        todayAPI,
        oneMonthAPI
      );
      const eventsData = await promise;
      setEventsData(eventsData);
    };
    //getEventsData();
  }, [selectedCountry]);

  //GET request for countries in the events page
  useEffect(() => {
    const getEventCountriesData = async () => {
      try {
        const url = 'http://localhost:3000/api/countries';
        const response = await fetch(url);
        if (!response) {
          throw new Error('could not fetch event countries data');
        }
        const eventCountries = await response.json();
        setEventCountries(eventCountries);
      } catch (error) {
        throw new Error(`Could not fetch event countries data ${error}`);
      }
    };
    // getEventCountriesData();
  }, []);

  const navigate = useNavigate();

  //router structure for the whole app
  return (
    <>
      <header className='homePage flex justify-center flex-col items-center text-3xl'>
        <img
          id='logo'
          src='../client/assets/favicon.png'
          width='50px'
          height='50px'
        ></img>
        <h1>Cultour</h1>
      </header>

      <div className='paths'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <h1 className='text-7xl px-5 py-5'>Welcome!</h1>
                <p className='p-1 px-5 py-5'>
                  Cultour is an app designed to broaden your understanding of
                  cultures around the world through diverse experiences you can
                  enjoy alone or with others — from food and games to customs,
                  rituals, and media. It’s a space for discovery, connection,
                  and community building.
                </p>
                <div className='homebuttons flex flex-col p-3'>
                  <button id='discover' onClick={() => navigate('/discover')}>
                    Discover activities
                  </button>
                  <button id='events' onClick={() => navigate('/events')}>
                    Find events
                  </button>
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
          <Route
            path='/events/:id'
            element={<IndividualEvent allEvents={eventsData} />}
          />
        </Routes>
      </div>
    </>
  );
}
