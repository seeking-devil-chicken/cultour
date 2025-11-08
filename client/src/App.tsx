import { useState, useEffect } from 'react';
import type { JSX } from 'react';

interface Data {
  id: number;
  created_at: string;
  user_id: number;
  country: string;
  category: string;
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
  //state that holds all data
  const [allData, setAllData] = useState<Data[]>();
  const [postData, setPostData] = useState();

  //GET request for all data
  useEffect(() => {
    const getData = async () => {
      try {
        const url = 'http://localhost:3000/countries'; //will update later
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('there was an error fetching all data');
        }
        const fetchedData = await response.json();
        setAllData(fetchedData);
      } catch (error) {
        throw new Error(`Could not fetch data ${error}`);
      }
    };
  }, []);

  console.log('allData', allData);
  //POST request for users
  useEffect(() => {
    const postData = async () => {
      const url = 'http://localhost:3000/'; //will update later
      const newPost = {
        name: '',
        country: '',
        category: '',
        text: '',
        image: '',
      };
      try {
        const postResponse = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/JSON',
            'content-type': 'application/JSON',
          },
          body: JSON.stringify(newPost),
        });
        if (!postResponse.ok) {
          throw new Error('there was a problem adding new post to database');
        }
        const postedData = await postResponse.json();
      } catch (error) {
        throw new Error(`error during post request, ${error}`);
      }
    };
  }, []);
  return (
    <>
      <h1>Hello World!</h1>
    </>
  );
}
