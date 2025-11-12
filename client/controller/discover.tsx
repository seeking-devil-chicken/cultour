import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import IndividualPost from '../components/individualPost.tsx';
import Posts from '../components/Posts.tsx';
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

export default function Discover({ allData, newPostData }) {
  if (!allData) {
    return <div>Loading posts...</div>;
  }
  //state that holds a specific country data
  const [country, setCountry] = useState<string>();
  const [selectedPost, SetSelectedPost] = useState<Posts>();
  //array of all the categories
  const categories: string[] = ['Food', 'Games', 'Customs', 'Rituals', 'Media'];
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

  console.log('🐹filterByCatgory', filterByCategory);

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
              copy.splice(random, 1);
              i++;
            }
          }
          return (
            <>
              <div className='galleryHeader text-7xl px-5 py-5'>
                <h2>{category}</h2>
              </div>
              <div className='galleryPosts grid grid-cols-3 gap-7'>
                {randomizedPosts.map((item, index) => {
                  return (
                    <div
                      className='card relative rounded-xl overflow-hidden cursor-pointer group'
                      onClick={(e) => navigate(`/posts/${item.id}`)}
                      key={index}
                    >
                      <div className='card-text absolute inset-0 flex justify-center items-center text-[#f7f7f7] text-3xl z-10'>
                        {item.title}
                      </div>
                      <div className='absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-300'></div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='w-full h-full'
                      />
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
              <div className='galleryHeader text-7xl px-5 py-5'>
                <h2>{category}</h2>
              </div>
              <div className='galleryPosts grid grid-cols-3 gap-7'>
                {randomizedPosts.map((item, index) => {
                  return (
                    <div
                      className='card relative rounded-xl overflow-hidden cursor-pointer group'
                      onClick={(e) => navigate(`/posts/${item.id}`)}
                      key={index}
                    >
                      <div className='card-text absolute inset-0 flex justify-center items-center text-[#f7f7f7] text-3xl z-10'>
                        {item.title}
                      </div>
                      <div className='absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-300'></div>
                      <img
                        src={item.image}
                        alt={item.title}
                        width='300px'
                        height='200px'
                        className='w-full h-full'
                      />
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
  console.log('🐸selectedPost', selectedPost);
  console.log('🐱screen', screen);
  const navigate = useNavigate();

  return (
    <>
      <div className='actionItems flex justify-center flex-col items-center p-3'>
        <header>Post your own!</header>
        {allData && <Posts countries={allData} />}
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
      </div>
      <div className='galleryDisplay'>{display}</div>
    </>
  );
}
