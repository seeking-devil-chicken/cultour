import { useState } from 'react';
import type { JSX } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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

interface EventsProps {
  allEvents: Event[] | undefined;
}

interface CurrentPage {
  Food: number;
  Games: number;
  Customs: number;
  Rituals: number;
  Media: number;
}
//helper functions to filter data
function filterByDateAndCategory(
  allData: Event[],
  categories: string[]
): Event[][] {
  // Add a check for null or undefined allData
  if (!allData) {
    return categories.map(() => []);
  }
  const result: Event[][] = categories.map((category) => {
    const today = Date.now();
    return allData
      .filter(
        (event) =>
          event.category === category &&
          new Date(event.event_datetime).getTime() >= today
      )
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
  // Add a check for null or undefined allData
  if (!allData) {
    return [];
  }
  const countries = allData.map((data) => data.country);
  const uniqueCountries = new Set([...countries]);
  return Array.from(uniqueCountries);
}

// formats dates to: "November 12, 2025 | 6:30 PM"
function formatEventDateTime(isoString: string): string {
  const date = new Date(isoString);

  const datePart = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${datePart} | ${timePart}`;
}

export default function Events({ allEvents }: EventsProps) {
  const [country, setCountry] = useState<string>('default');
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [pageByCategory, setPageByCategory] = useState<CurrentPage>({
    Food: 0,
    Games: 0,
    Customs: 0,
    Rituals: 0,
    Media: 0,
  });
  //array of all the categories
  const categories: string[] = ['Food', 'Games', 'Customs', 'Rituals', 'Media'];
  //click handler for countries dropdown
  const selectCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };
  const navigate: NavigateFunction = useNavigate();

  if (!allEvents) {
    return <div>Loading events...</div>;
  }

  const filteredByDateAndCategory = filterByDateAndCategory(
    allEvents,
    categories
  );
  const filteredByDateCategoryCountry = filterByCountry(
    filteredByDateAndCategory,
    country
  );
  const isMobile = window.innerWidth < 768;
  const VISIBLE = isMobile ? 1 : 3;

  let display: JSX.Element;

  // Add a loading state if allEvents is not yet loaded
  if (!allEvents) {
    return <div>Loading events...</div>;
  }

  //default display (three posts per category for PC, one post for mobile)
  display = (
    <>
      {categories.map((category, index) => {
        const defaultEventsCategory = filteredByDateAndCategory[index];
        const filteredEventsCategory = filteredByDateCategoryCountry[index];
        const page = pageByCategory![category] ?? 0;
        const start = page * VISIBLE;
        const end = start + VISIBLE;
        const currentRow =
          country === 'default'
            ? defaultEventsCategory
            : filteredEventsCategory;
        const visibleEvents = currentRow.slice(start, end);
        //click handler for next arrow
        const handleNext = () => {
          const current = pageByCategory[category] ?? 0;
          const lastPage = Math.max(
            Math.ceil(currentRow.length / VISIBLE) - 1,
            0
          );
          const next = current + 1 > lastPage ? lastPage : current + 1;

          setPageByCategory({
            ...pageByCategory,
            [category]: next,
          });
        };
        //click handler for previous arrow
        const handlePrev = () => {
          const current = pageByCategory[category] ?? 0;
          const prevPage = current - 1 < 0 ? 0 : current - 1;

          setPageByCategory({
            ...pageByCategory,
            [category]: prevPage,
          });
        };
        return (
          <>
            <div className='galleryHeader text-7xl pt-12 py-5'>
              <h2>{category.toUpperCase()}</h2>
            </div>
            <div className='galleryPosts relative flex flex-nowrap justify-start items-center overflow-x-auto gap-4 '>
              <IoIosArrowBack
                className='absolute text-3xl hover:cursor-pointer left-2 top-1/2 -translate-y-1/2 z-20'
                onClick={handlePrev}
              />
              {visibleEvents.map((item, i) => {
                return (
                  <div
                    className='card relative snap-start rounded-xl shadow-[0px_0px_7px_rgba(0,0,0,0.25)] overflow-hidden cursor-pointer group shrink-0 w-[400px] h-[300px]'
                    onClick={(e) => navigate(`/events/${item.id}`)}
                    key={i}
                  >
                    <div className='absolute inset-0 flex justify-start items-center pl-7 pr-7 z-10'>
                      <div className='flex flex-col items-start text-left gap-1 px-3'>
                        <div className='card-date text-[#f7f7f7] text-1xl z-10'>
                          {formatEventDateTime(item.event_datetime)}
                        </div>
                        <div className='card-text text-[#f7f7f7] text-1xl z-10'>
                          {item.event_title}
                        </div>
                      </div>
                    </div>
                    <div className='absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300'></div>
                    <img
                      src={item.image}
                      alt={item.event_title}
                      className='w-full h-full object-cover object-center block'
                    />
                  </div>
                );
              })}
              <IoIosArrowForward
                className='absolute text-3xl hover:cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10'
                onClick={handleNext}
              />
            </div>
          </>
        );
      })}
    </>
  );
  return (
    <>
      <div className='actionItems flex flex-col items-center p-3 border-t border-b border-[#c59560] '>
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
