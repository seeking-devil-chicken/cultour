# Cultural App - Database Schema

This document outlines the database schema for the Cultural App, consisting of two primary tables: `posts` and `events`.

---

## 1\. Schema Design

### 1\. `posts` Table

Stores all user-generated content about cultural activities, food, customs, etc. This is the core "knowledge base" of the app.

| Column       | Type               | Description                                             |
| :----------- | :----------------- | :------------------------------------------------------ |
| `post_id`    | SERIAL PRIMARY KEY | Unique identifier for the post.                         |
| `user_id`    | INTEGER            | A simple numeric ID for the author (not a foreign key). |
| `country`    | VARCHAR(100)       | The country this post is about (e.g., "Vietnam").       |
| `category`   | VARCHAR(100)       | The post category (e.g., "Food", "Games", "Customs").   |
| `title`      | VARCHAR(255)       | The title of the post.                                  |
| `text`       | TEXT               | The main body content of the post.                      |
| `image`      | VARCHAR(255)       | A URL link to an image for the post.                    |
| `created_at` | TIMESTAMP          | Automatically records when the post was created.        |

### 2\. `events` Table

Stores cultural events, intended to be populated from an external API (like Eventbrite). This data is then served to users via the app's own API.

| Column           | Type                     | Description                                                   |
| :--------------- | :----------------------- | :------------------------------------------------------------ |
| `id`             | SERIAL PRIMARY KEY       | Unique identifier for the event.                              |
| `event_city`     | VARCHAR(100)             | The city where the event is held (e.g., "New York").          |
| `event_title`    | VARCHAR(255)             | The name of the event.                                        |
| `event_datetime` | TIMESTAMP WITH TIME ZONE | The start date and time of the event (with timezone).         |
| `address`        | VARCHAR(255)             | The name or address of the event location.                    |
| `description`    | TEXT                     | A brief description of the event.                             |
| `image`          | VARCHAR(255)             | A URL link to a banner image for the event.                   |
| `ticket_price`   | VARCHAR(100)             | Price of the event (stored as text like "Free" or "$25").     |
| `website_url`    | VARCHAR(255)             | A URL link for event details or tickets.                      |
| `country`        | VARCHAR(100)             | The "cultural country" this event relates to (e.g., "Japan"). |
| `category`       | VARCHAR(100)             | The event category (e.g., "Food", "Festival").                |

---

## 2\. Full SQL Setup Script

Run this script in your PostgreSQL database to create both tables.

```sql
-- =================================================================
-- Table 1: posts
-- Stores user-generated posts about cultural items.
-- =================================================================

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    country VARCHAR(100),
    category VARCHAR(100),
    title VARCHAR(255),
    text TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =================================================================
-- Table 2: events
-- Stores cultural events fetched from third-party APIs.
-- (UPDATED SCHEMA)
-- =================================================================

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_city VARCHAR(100) NOT NULL,
    event_title VARCHAR(255) NOT NULL,
    event_datetime TIMESTAMP WITH TIME ZONE,
    address VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    ticket_price VARCHAR(100),
    website_url VARCHAR(255),
    country VARCHAR(100),
    category VARCHAR(100)
);
```
