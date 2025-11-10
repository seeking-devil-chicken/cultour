# 🌍 Cultour

Cultour is an app designed to broaden your understanding of cultures around the world through diverse experiences you can enjoy alone or with others — from food and games to customs, rituals, and media. It’s a space for discovery, connection, and community building.

## 👥 Who It’s For

- Individuals who want to diversify their knowledge of different cultures through interactive experiences and connect with others who share those interests.
- Cultural event makers who want to promote their events, share traditions, and bring people together through cultural exchange.

## ✨ Features

- **Discovery Page**  
  Browse cultural posts in five categories — **food, games, customs, rituals, and media** — each offering a unique entry point into different cultures. Users can filter by country, like and comment on posts, and share their own cultural experiences by creating and managing posts.

- **Events Page**  
  A dedicated space where businesses and organizations can post and manage cultural events. Users can discover events near them and attend together with others they connect with on the platform.

- **Full CRUD Functionality**  
  Both the Discovery and Events pages allow users and organizers to **create, read, update, and delete** posts and events.

## 👩‍💻 About the Developers

Cultour was conceived by **Mari** and **Avo** during their Codesmith residency. They are two developers passionate about sharing and celebrating their cultures — **Japan** and **Armenia** — in fun, creative, and inclusive ways. Through this project, they combined their love for technology and cultural storytelling to create a platform that fosters discovery, connection, and community.

## 🛠 Tech Stack

- **Frontend:** React + Vite, TypeScript  
- **Styling:** Tailwind CSS  
- **Backend:** Express.js  
- **Database / Auth:** Supabase (hosted Postgres)

## 🚀 Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Team-GoblinShark/Cultural-app.git
   cd Cultural-app

2. **Install dependencies**

   ```bash
   npm install


3. **Connect to Supabase**
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   # (optional for server)
   SUPABASE_SERVICE_ROLE=your-service-role-key



4. **(If needed) install Supabase client**
   ```bash
   npm install @supabase/supabase-js

5. **Run the frontend**
   ```bash
   npm run dev

6. **Run the backend (Express)**
   ```bash
   npm run start

