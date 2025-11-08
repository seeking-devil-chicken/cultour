import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import Discover from '../controller/discover.tsx';
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
  //holds three states:
  //1. all the post data in the SQL database
  //2. data for creating new post
  //3. screen mode
  const [allData, setAllData] = useState<Posts[] | null>(null);
  const [postData, setPostData] = useState();
  const [screen, setScreen] = useState('home');

  //GET request for all data
  useEffect(() => {
    console.log('🍎inside useEffect');
    console.log('🍎inside useEffect');
    const getData = async () => {
      try {
        console.log('inside try🍊');
        const url = 'http://localhost:4000/countries';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('there was an error fetching all data');
          throw new Error('there was an error fetching all data');
        }
        const fetchedData = await response.json();
        setAllData(fetchedData);
        console.log('✅', fetchedData);
        console.log('✅', fetchedData);
      } catch (error) {
        throw new Error(`Could not fetch data ${error}`);
      }
    };
    getData();
  }, []);

  console.log('🍎allData', allData);
  console.log('🍎allData', allData);
  //POST request for users
  // useEffect(() => {
  //   const postData = async () => {
  //     const url = 'http://localhost:4000/'; //will update later
  //     const url = 'http://localhost:4000/'; //will update later
  //     const newPost = {
  //       name: '',
  //       country: '',
  //       category: '',
  //       text: '',
  //       image: '',
  //       name: '',
  //       country: '',
  //       category: '',
  //       text: '',
  //       image: '',
  //     };
  //     try {
  //       const postResponse = await fetch(url, {
  //         method: 'POST',
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/JSON',
  //           'content-type': 'application/JSON',
  //           Accept: 'application/JSON',
  //           'content-type': 'application/JSON',
  //         },
  //         body: JSON.stringify(newPost),
  //       });
  //       if (!postResponse.ok) {
  //         throw new Error('there was a problem adding new post to database');
  //         throw new Error('there was a problem adding new post to database');
  //       }
  //       const postedData = await postResponse.json();
  //     } catch (error) {
  //       throw new Error(`error during post request, ${error}`);
  //     }
  //   };
  //   // postData();
  // }, []);

  //logic for what gets displayed on the screen
  let display;
  if (screen === 'home') {
    display = (
      <>
        <h2>Choose your path</h2>
        <button id='disover'>Discover activities</button>
        <button id='events'>Find events</button>
        {/* </>
    );
  } else if (screen === 'discover') {
    display = (
      <> */}
        <Discover
          allData={allData}
          screen={screen}
          setScreen={setScreen}
          newPostData={setPostData}
        />
      </>
    ); //add discover component later
  }
  if (!allData) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  } else {
    return (
      <>
        <div className='homePage'>
          <img
            id='logo'
            src='../client/assets/favicon.png'
            width='40px'
            height='40px'
          ></img>
          <h1>Cultour</h1>
        </div>
        <div className='paths'>{display}</div>
      </>
    );
  }
}
