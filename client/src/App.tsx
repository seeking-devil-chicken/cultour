import { useState, useEffect } from "react";
import type { JSX } from "react";
import Posts from "../components/Posts";
import Discover from "../controller/discover.tsx";

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
  const [allData, setAllData] = useState<Posts[] | null>([
    // JAPAN (5)
    // {
    //   id: 1,
    //   created_at: '2025-02-01T10:00:00Z',
    //   user_id: 101,
    //   country: 'Japan',
    //   category: 'food',
    //   title: 'Okonomiyaki',
    //   text: 'Savory pancake from Osaka with cabbage, pork, and okonomi sauce.',
    //   image:
    //     'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Okonomiyaki_001.jpg/2560px-Okonomiyaki_001.jpg',
    // },
    // {
    //   id: 2,
    //   created_at: '2025-02-01T10:05:00Z',
    //   user_id: 101,
    //   country: 'Japan',
    //   category: 'games',
    //   title: 'Kendama',
    //   text: 'Traditional Japanese skill toy — catch the ball on different cups.',
    //   image:
    //     'https://www.fit-und-warm.ch/images/product_images/original_images/mrd-trading/K2040_2.jpg',
    // },
    // {
    //   id: 3,
    //   created_at: '2025-02-01T10:10:00Z',
    //   user_id: 102,
    //   country: 'Japan',
    //   category: 'customs',
    //   title: 'Taking off shoes indoors',
    //   text: 'Common etiquette in Japanese homes; wear house slippers instead.',
    //   image:
    //     'https://timetravellinggypsy.wordpress.com/wp-content/uploads/2014/10/800px-japanese_house_slippers.jpg',
    // },
    // {
    //   id: 4,
    //   created_at: '2025-02-01T10:15:00Z',
    //   user_id: 102,
    //   country: 'Japan',
    //   category: 'rituals',
    //   title: 'Hatsumode',
    //   text: 'First shrine visit of the New Year to pray for good fortune.',
    //   image:
    //     'https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2024-12/hatumode-guide_1.jpg?itok=ua3SFBh_',
    // },
    // {
    //   id: 5,
    //   created_at: '2025-02-01T10:20:00Z',
    //   user_id: 103,
    //   country: 'Japan',
    //   category: 'media',
    //   title: 'Ghibli Film Night',
    //   text: 'Watch Spirited Away or Totoro to experience modern Japanese storytelling.',
    //   image:
    //     'https://i2.wp.com/hyperallergic.com/wp-content/uploads/2020/09/spirited-away.jpg?resize=1080%2C584&quality=100&ssl=1',
    // },
    // // ARMENIA (5)
    // {
    //   id: 6,
    //   created_at: '2025-02-02T09:00:00Z',
    //   user_id: 201,
    //   country: 'Armenia',
    //   category: 'food',
    //   title: 'Dolma',
    //   text: 'Vine leaves stuffed with minced meat, rice, herbs, and spices.',
    //   image: 'https://placehold.co/400x250?text=Dolma',
    // },
    // {
    //   id: 7,
    //   created_at: '2025-02-02T09:05:00Z',
    //   user_id: 201,
    //   country: 'Armenia',
    //   category: 'games',
    //   title: 'Nardi (Backgammon)',
    //   text: 'Popular board game in Armenian households, played socially.',
    //   image: 'https://placehold.co/400x250?text=Nardi',
    // },
    // {
    //   id: 8,
    //   created_at: '2025-02-02T09:10:00Z',
    //   user_id: 202,
    //   country: 'Armenia',
    //   category: 'customs',
    //   title: 'Hospitality',
    //   text: 'Guests are offered coffee, fruit, and homemade pastries on arrival.',
    //   image: 'https://placehold.co/400x250?text=Hospitality',
    // },
    // {
    //   id: 9,
    //   created_at: '2025-02-02T09:15:00Z',
    //   user_id: 202,
    //   country: 'Armenia',
    //   category: 'rituals',
    //   title: 'Blessing of the Grapes',
    //   text: 'Annual church ritual blessing the first harvest.',
    //   image: 'https://placehold.co/400x250?text=Grapes',
    // },
    // {
    //   id: 10,
    //   created_at: '2025-02-02T09:20:00Z',
    //   user_id: 203,
    //   country: 'Armenia',
    //   category: 'media',
    //   title: 'Duduk Music Playlist',
    //   text: 'Listen to Armenian duduk for a soulful, traditional sound.',
    //   image: 'https://placehold.co/400x250?text=Duduk',
    // },
    // // MEXICO (5)
    // {
    //   id: 11,
    //   created_at: '2025-02-03T12:00:00Z',
    //   user_id: 301,
    //   country: 'Mexico',
    //   category: 'food',
    //   title: 'Tacos al Pastor',
    //   text: 'Marinated pork, pineapple, and salsa on corn tortillas.',
    //   image: 'https://placehold.co/400x250?text=Tacos',
    // },
    // {
    //   id: 12,
    //   created_at: '2025-02-03T12:05:00Z',
    //   user_id: 301,
    //   country: 'Mexico',
    //   category: 'games',
    //   title: 'Lotería',
    //   text: 'Mexican picture-bingo, great for groups and parties.',
    //   image: 'https://placehold.co/400x250?text=Loteria',
    // },
    // {
    //   id: 13,
    //   created_at: '2025-02-03T12:10:00Z',
    //   user_id: 302,
    //   country: 'Mexico',
    //   category: 'customs',
    //   title: 'Dia de Muertos Altars',
    //   text: 'Create an ofrenda with photos, marigolds, and favorite foods.',
    //   image: 'https://placehold.co/400x250?text=Ofrenda',
    // },
    // {
    //   id: 14,
    //   created_at: '2025-02-03T12:15:00Z',
    //   user_id: 303,
    //   country: 'Mexico',
    //   category: 'rituals',
    //   title: 'Posadas',
    //   text: 'Processions before Christmas reenacting Mary and Joseph’s search for shelter.',
    //   image: 'https://placehold.co/400x250?text=Posadas',
    // },
    // {
    //   id: 15,
    //   created_at: '2025-02-03T12:20:00Z',
    //   user_id: 303,
    //   country: 'Mexico',
    //   category: 'media',
    //   title: 'Golden Age Mexican Cinema',
    //   text: 'Watch classic films to explore Mexico’s film history.',
    //   image: 'https://placehold.co/400x250?text=Mexican+Cinema',
    // },
    // // ITALY (5)
    // {
    //   id: 16,
    //   created_at: '2025-02-04T08:00:00Z',
    //   user_id: 401,
    //   country: 'Italy',
    //   category: 'food',
    //   title: 'Carbonara',
    //   text: 'Roman pasta with eggs, pecorino, guanciale, and black pepper.',
    //   image: 'https://placehold.co/400x250?text=Carbonara',
    // },
    // {
    //   id: 17,
    //   created_at: '2025-02-04T08:05:00Z',
    //   user_id: 401,
    //   country: 'Italy',
    //   category: 'games',
    //   title: 'Scopa',
    //   text: 'Traditional Italian card game played in cafés and at home.',
    //   image: 'https://placehold.co/400x250?text=Scopa',
    // },
    // {
    //   id: 18,
    //   created_at: '2025-02-04T08:10:00Z',
    //   user_id: 402,
    //   country: 'Italy',
    //   category: 'customs',
    //   title: 'Aperitivo Hour',
    //   text: 'Pre-dinner drinks with small bites, a social ritual in many cities.',
    //   image: 'https://placehold.co/400x250?text=Aperitivo',
    // },
    // {
    //   id: 19,
    //   created_at: '2025-02-04T08:15:00Z',
    //   user_id: 402,
    //   country: 'Italy',
    //   category: 'rituals',
    //   title: 'Ferragosto',
    //   text: 'Mid-August holiday, many Italians go on vacation or to the beach.',
    //   image: 'https://placehold.co/400x250?text=Ferragosto',
    // },
    // {
    //   id: 20,
    //   created_at: '2025-02-04T08:20:00Z',
    //   user_id: 403,
    //   country: 'Italy',
    //   category: 'media',
    //   title: 'Italian Neo-Realism',
    //   text: 'Explore films like ‘Bicycle Thieves’ for postwar Italian culture.',
    //   image: 'https://placehold.co/400x250?text=Italian+Film',
    // },
    // // NIGERIA (5)
    // {
    //   id: 21,
    //   created_at: '2025-02-05T14:00:00Z',
    //   user_id: 501,
    //   country: 'Nigeria',
    //   category: 'food',
    //   title: 'Jollof Rice',
    //   text: 'Tomato-based rice dish, often served with fried plantain and chicken.',
    //   image: 'https://placehold.co/400x250?text=Jollof',
    // },
    // {
    //   id: 22,
    //   created_at: '2025-02-05T14:05:00Z',
    //   user_id: 501,
    //   country: 'Nigeria',
    //   category: 'games',
    //   title: 'Ayo (Mancala)',
    //   text: 'Traditional strategy game played with seeds and a wooden board.',
    //   image: 'https://placehold.co/400x250?text=Ayo',
    // },
    // {
    //   id: 23,
    //   created_at: '2025-02-05T14:10:00Z',
    //   user_id: 502,
    //   country: 'Nigeria',
    //   category: 'customs',
    //   title: 'Respectful Greetings',
    //   text: 'Bowing or kneeling (in some cultures) to greet elders.',
    //   image: 'https://placehold.co/400x250?text=Greeting',
    // },
    // {
    //   id: 24,
    //   created_at: '2025-02-05T14:15:00Z',
    //   user_id: 502,
    //   country: 'Nigeria',
    //   category: 'rituals',
    //   title: 'Naming Ceremony',
    //   text: 'Celebration to give a newborn their name, with family and music.',
    //   image: 'https://placehold.co/400x250?text=Naming',
    // },
    // {
    //   id: 25,
    //   created_at: '2025-02-05T14:20:00Z',
    //   user_id: 503,
    //   country: 'Nigeria',
    //   category: 'media',
    //   title: 'Afrobeats Playlist',
    //   text: 'Listen to Burna Boy, Wizkid, and Tiwa Savage to explore modern Nigerian music.',
    //   image: 'https://placehold.co/400x250?text=Afrobeats',
    // },
    // // INDIA (5)
    // {
    //   id: 26,
    //   created_at: '2025-02-06T16:00:00Z',
    //   user_id: 601,
    //   country: 'India',
    //   category: 'food',
    //   title: 'Masala Dosa',
    //   text: 'South Indian fermented crepe with spiced potato filling.',
    //   image: 'https://placehold.co/400x250?text=Masala+Dosa',
    // },
    // {
    //   id: 27,
    //   created_at: '2025-02-06T16:05:00Z',
    //   user_id: 601,
    //   country: 'India',
    //   category: 'games',
    //   title: 'Carrom',
    //   text: 'Strike-and-pocket tabletop game, popular in Indian households.',
    //   image: 'https://placehold.co/400x250?text=Carrom',
    // },
    // {
    //   id: 28,
    //   created_at: '2025-02-06T16:10:00Z',
    //   user_id: 602,
    //   country: 'India',
    //   category: 'customs',
    //   title: 'Namaste Greeting',
    //   text: 'Joining hands and slight bow as a respectful greeting.',
    //   image: 'https://placehold.co/400x250?text=Namaste',
    // },
    // {
    //   id: 29,
    //   created_at: '2025-02-06T16:15:00Z',
    //   user_id: 602,
    //   country: 'India',
    //   category: 'rituals',
    //   title: 'Diwali Diyas',
    //   text: 'Lighting oil lamps to celebrate the festival of lights.',
    //   image: 'https://placehold.co/400x250?text=Diwali',
    // },
    // {
    //   id: 30,
    //   created_at: '2025-02-06T16:20:00Z',
    //   user_id: 603,
    //   country: 'India',
    //   category: 'media',
    //   title: 'Classic Bollywood',
    //   text: 'Watch 90s Bollywood films for music, dance, and cultural vibes.',
    //   image: 'https://placehold.co/400x250?text=Bollywood',
    // },
  ]);
  const [postData, setPostData] = useState();
  const [screen, setScreen] = useState("home");

  useEffect(() => {
    console.log("🍎inside useEffect");
    console.log("🍎inside useEffect");
    const getData = async () => {
      try {
        console.log("inside try🍊");
        const url = "http://localhost:4000/countries";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("there was an error fetching all data");
          throw new Error("there was an error fetching all data");
        }
        const fetchedData = await response.json();
        setAllData(fetchedData);
        console.log("✅", fetchedData);
        console.log("✅", fetchedData);
      } catch (error) {
        throw new Error(`Could not fetch data ${error}`);
      }
    };
    getData();
  }, []);

  console.log("🍎allData", allData);
  console.log("🍎allData", allData);
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

  //onclick handler -> to discover page
  const clickToDiscover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setScreen("discover");
  };
  //onclick handler -> to events page
  const clickToEvents = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setScreen("events");
  };

  //logic for what gets displayed on the screen
  let display;
  if (screen === "home") {
    display = (
      <>
        <h2>Choose your path</h2>
        <button id="disover" onClick={clickToDiscover}>
          Discover activities
        </button>
        <button id="events" onClick={clickToEvents}>
          Find events
        </button>
      </>
    );
  } else if (screen === "discover" && allData) {
    display = (
      <>
        <Discover
          allData={allData}
          screen={screen}
          setScreen={setScreen}
          newPostData={setPostData}
        />
      </>
    );
  }

  return (
    <>
      <h1>Hello World!</h1>
      {allData && <Posts countries={allData} />}
      <header className="homePage">
        <img
          id="logo"
          src="../client/assets/favicon.png"
          width="40px"
          height="40px"></img>
        <h1>Cultour</h1>
      </header>
      <div className="paths">{display}</div>
    </>
  );
}
