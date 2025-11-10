import { useState, useEffect } from 'react';
import type { JSX } from 'react';

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

export default function Discover({ allData, screen, setScreen, newPostData }) {
  //state that holds a specific country data
  const [country, setCountry] = useState<string>();
  //array of all the categories
  const categories: string[] = ['food', 'games', 'customs', 'rituals', 'media'];
  //array of all data by category (array of arrays, corresponds to index of category array)
  const filterByCategory: [][] = categories.map((category) => {
    return allData.filter((data) => data.category === category);
  });
  //array of all data by country and category
  const filterByCountryAndCategory: [][] = categories.map((category) => {
    return allData.filter(
      (data) => data.country === country && data.category === category
    );
  });

  //unique set of countries from all data to be used in the dropdown
  const allCountries = allData.map((data) => data.country);
  console.log('all countries', allCountries);
  const uniqueCountries = new Set([...allCountries]);
  console.log('unique countries', uniqueCountries);

  //click handler for countries dropdown
  const selectCountry = (e) => {
    setCountry(e.target.value);
  };

  let display;

  //default display (five randomized posts per category from all countries)
  if (!country || country === 'default') {
    display = (
      <>
        {categories.map((category, index) => {
          const randomizedPosts: Posts[] = [];
          const currentCategoryArr: Posts[] | null = filterByCategory[index];
          const copy = [...currentCategoryArr];
          let i = 0;
          if (copy.length >= 5) {
            while (i < 5) {
              let random = Math.floor(Math.random() * copy.length);
              randomizedPosts.push(copy[random]);
              copy.splice(random, 1);
              i++;
            }
          } else {
            while (i < copy.length) {
              let random = Math.floor(Math.random() * copy.length);
              randomizedPosts.push(copy[random]);
              i++;
            }
          }
          return (
            <>
              <div className='galleryHeader'>
                <h2>{category}</h2>
              </div>
              <div className='galleryPosts'>
                {randomizedPosts.map((item) => {
                  return (
                    <div className='card'>
                      <img
                        src={item.image}
                        alt={item.title}
                        width='300px'
                        height='200px'
                      />
                      <div className='card-text'>{item.title}</div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </>
    );
  } else {
    //display when filtered by country (up to five randomized posts per category)
    display = (
      <>
        {categories.map((category, index) => {
          const randomizedPosts: Posts[] = [];
          const currentCategoryArr: Posts[] | null =
            filterByCountryAndCategory[index];
          const copy = [...currentCategoryArr];
          let i = 0;
          if (copy.length >= 5) {
            while (i < 5) {
              let random = Math.floor(Math.random() * copy.length);
              randomizedPosts.push(copy[random]);
              copy.splice(random, 1);
              i++;
            }
          } else {
            while (i < copy.length) {
              let random = Math.floor(Math.random() * copy.length);
              randomizedPosts.push(copy[random]);
              copy.splice(random, 1);
              i++;
            }
          }
          return (
            <>
              <div className='galleryHeader'>
                <h2>{category}</h2>
              </div>
              <div className='galleryPosts'>
                {randomizedPosts.map((item) => {
                  return (
                    <div className='card'>
                      <img
                        src={item.image}
                        alt={item.title}
                        width='300px'
                        height='200px'
                      />
                      <div className='card-text'>{item.title}</div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </>
    );
  }

  console.log('🏳️‍🌈country', country);

  return (
    <>
      <label className='countries'>Filter posts by country</label>
      <select
        className='countryFilter'
        id='countryFilter'
        onChange={selectCountry}
      >
        <option value='default' key='0'>
          All countries
        </option>
        {[...uniqueCountries].map((country, index) => {
          return (
            <option value={country} key={index}>
              {country}
            </option>
          );
        })}
      </select>
      <div className='galleryDisplay'>{display}</div>
    </>
  );
}
