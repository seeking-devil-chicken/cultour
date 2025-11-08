🌍 Cultour
Cultour is an app designed to broaden your understanding of cultures around the world through diverse experiences you can enjoy alone or with others — from food and games to customs, rituals, and media. It’s a space for discovery, connection, and community building.
Who It’s For:
Individuals who want to diversify their knowledge of different cultures through interactive experiences and connect with others who share those interests.


Cultural event makers who want to promote their events, share traditions, and bring people together through cultural exchange.
Features:
Discovery Page: Browse cultural posts in five categories — food, games, customs, rituals, and media — each offering a unique entry point into different cultures. Users can filter by country, like and comment on posts, and share their own cultural experiences by creating and managing posts. 


Events Page: A dedicated space where businesses and organizations can post and manage cultural events. Users can discover events near them and attend together with others they connect with on the platform.
Full CRUD Functionality: Both the Discovery and Events pages allow users and organizers to create, read, update, and delete posts and events.
👩‍💻 About the Developers
Cultour was conceived by Mari and Avo during their Codesmith residency. They are two developers passionate about sharing and celebrating their cultures — Japan and Armenia — in fun, creative, and inclusive ways. Through this project, they combined their love for technology and cultural storytelling to create a platform that fosters discovery, connection, and community.
Tech Stack
Frontend: React + Vite, TypeScript


Styling: Tailwind CSS


Backend: Express.js


Database: PostgreSQL



Installation & Setup
Clone the repo

 git clone https://github.com/Team-GoblinShark/Cultural-app.git
cd Cultural-app


Install dependencies

 npm install


Connect to Supabase
 Create a .env file in the project root and add your Supabase credentials (you can get these from your Supabase project → Project Settings → API):

 VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-public-anon-key


use the VITE_ prefix for anything the React app needs


if your Express server also talks to Supabase with the service role key, you can add (server-side only):

 SUPABASE_SERVICE_ROLE=your-service-role-key


(If not installed yet) install the Supabase JS client

 npm install @supabase/supabase-js
 In your frontend you can then do:

 import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);


Run the frontend

 npm run dev
 Open the URL it prints (usually http://localhost:5173/).


Run the backend (Express)

 npm run start
 This will start your API server (e.g. for protected routes, extra logic, or to keep your service key off the client).

