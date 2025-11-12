import { useState, useEffect } from 'react';
import type { JSX, JSXElementConstructor } from 'react';
import { Routes, Route, useNavigate, NavigateFunction } from 'react-router-dom';
import IndividualEvent from '../components/individualEvent.tsx';

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

//helper functions to filter data
function filterByDateAndCategory(
  allData: Event[],
  categories: string[]
): Event[][] {
  const result: Event[][] = categories.map((category) => {
    return allData
      .filter((event) => event.category === category)
      .sort(
        (a, b) =>
          new Date(a.event_datetime).getTime() -
          new Date(b.event_datetime).getTime()
      );
  });
  return result;
}

function filterByCountry(filteredData: Event[][], country: string) {
  return filteredData.map((event) =>
    event.filter((event) => event.country === country)
  );
}
function getCountries(allData: Event[]): string[] {
  const countries = allData.map((data) => data.country);
  const uniqueCountries = new Set([...countries]);
  return Array.from(uniqueCountries);
}

export default function Events({ allEvents }) {
  const [country, setCountry] = useState<string>('default');
  const [selectedEvent, SetSelectedEvent] = useState<Event>();
  //array of all the categories
  const categories: string[] = ['Food', 'Games', 'Customs', 'Rituals', 'Media'];
  //click handler for countries dropdown
  const selectCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };
  const navigate: NavigateFunction = useNavigate();
  const filteredByDateAndCategory = filterByDateAndCategory(
    allEvents,
    categories
  );
  const filteredByDateCategoryCountry = filterByCountry(
    filteredByDateAndCategory,
    country
  );
  let display: JSX.Element;
  //default display (five randomized posts per category from all countries)
  display = (
    <>
      {categories.map((category, index) => {
        return (
          <>
            <div className='galleryHeader text-7xl px-5 py-5'>
              <h2>{category}</h2>
            </div>
            <div className='galleryPosts grid grid-cols-3 gap-7'>
              {country === 'default'
                ? filteredByDateAndCategory[index].map((item, i) => {
                    return (
                      <div
                        className='card relative rounded-xl overflow-hidden cursor-pointer group'
                        onClick={(e) => navigate(`/eventposts/${item.id}`)}
                        key={i}
                      >
                        <div className='card-text absolute inset-0 flex justify-center items-center text-[#f7f7f7] text-3xl z-10'>
                          {item.event_title}
                        </div>
                        <div className='absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-300'></div>
                        <img
                          src={item.image}
                          alt={item.event_title}
                          className='w-full h-full'
                        />
                      </div>
                    );
                  })
                : filteredByDateCategoryCountry[index].map((item, i) => {
                    return (
                      <div
                        className='card relative rounded-xl overflow-hidden cursor-pointer group'
                        onClick={(e) => navigate(`/eventposts/${item.id}`)}
                        key={i}
                      >
                        <div className='card-text absolute inset-0 flex justify-center items-center text-[#f7f7f7] text-3xl z-10'>
                          {item.event_title}
                        </div>
                        <div className='absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-300'></div>
                        <img
                          src={item.image}
                          alt={item.event_title}
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
  return (
    <>
      <div className='actionItems flex justify-center flex-col items-center p-3'>
        <label className='countries'>Filter posts by country</label>
        <select
          className='countryFilter'
          id='countryFilter'
          onChange={selectCountry}
        >
          <option value='default' key='0'>
            All countries
          </option>
          {getCountries(allEvents).map((country, index) => {
            return (
              <option value={country} key={index}>
                {country}
              </option>
            );
          })}
        </select>
      </div>
      <div className='eventsGalleryDisplay'>{display}</div>
    </>
  );
}
