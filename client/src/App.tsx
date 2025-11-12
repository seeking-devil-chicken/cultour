import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Posts from '../components/Posts';
import Discover from '../controller/discover.tsx';
import IndividualPost from '../components/individualPost.tsx';
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

export default function App() {
  const [allData, setAllData] = useState<Posts[] | null>(null);

  const [postData, setPostData] = useState();
  const [screen, setScreen] = useState('home');

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
        </Routes>
      </div>
    </>
  );
}
