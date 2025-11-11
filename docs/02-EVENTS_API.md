# API Specification: Events

All endpoints are prefixed with `/api`.

## 📦 Data Models

### 1\. Event (from `events` table)

This is the primary data model for an event, based on your table structure.

```json
{
  "id": 1,
  "event_city": "New York",
  "event_title": "Vietnam Food Festival",
  "event_datetime": "2025-12-01T18:00:00Z",
  "event_venue": "Union Square",
  "ticket_price": "Free",
  "website_url": "https://example.com/fest",
  "country": "Vietnam",
  "category": "Food"
}
```

### 2\. Post (from `posts` table)

This is the data model for related posts that will be attached to an event query.

```json
{
  "post_id": 1,
  "user_id": 1,
  "country": "Vietnam",
  "category": "Food",
  "title": "Phở Bò",
  "text": "A classic Vietnamese noodle soup with rich beef broth...",
  "image": "https://upload.wikimedia.org/.../Ph%E1%BB%9F_b%C3%B2.jpg",
  "created_at": "2025-11-10T10:00:00Z"
}
```

---

## 🚀 Endpoints

### 1\. Get Events by City

`GET /api/events`

Fetches a list of all events for a specific city.

#### Query Parameters

| Key    | Type   | Required | Description                                                                        |
| :----- | :----- | :------- | :--------------------------------------------------------------------------------- |
| `city` | String | **Yes**  | The name of the city (e.g., `New York`). Must be URL-encoded (e.g., `New%20York`). |

#### ✅ Success Response (200 OK)

Returns an array of `Event` objects. Returns an empty array `[]` if no events are found.

```json
[
  {
    "id": 1,
    "event_city": "New York",
    "event_title": "Vietnam Food Festival",
    "event_datetime": "2025-12-01T18:00:00Z",
    "country": "Vietnam",
    "category": "Food",
    "...": "..."
  },
  {
    "id": 5,
    "event_city": "New York",
    "event_title": "Japan Cherry Blossom Picnic",
    "event_datetime": "2026-04-10T12:00:00Z",
    "country": "Japan",
    "category": "Customs",
    "...": "..."
  }
]
```

---

### 2\. Get Event Details & Related Posts

`GET /api/events/{id}`

Fetches the full details for a **single** event, and includes an array of related posts from the `posts` table that match the event's `country`.

#### Path Parameters

| Key  | Type    | Description                                                |
| :--- | :------ | :--------------------------------------------------------- |
| `id` | Integer | The primary key `id` of the event from the `events` table. |

#### ✅ Success Response (200 OK)

Returns a single object containing `eventDetails` and an array of `relatedPosts`.

```json
{
  "eventDetails": {
    "id": 1,
    "event_city": "New York",
    "event_title": "Vietnam Food Festival",
    "event_datetime": "2025-12-01T18:00:00Z",
    "event_venue": "Union Square",
    "ticket_price": "Free",
    "website_url": "https://example.com/fest",
    "country": "Vietnam",
    "category": "Food"
  },
  "relatedPosts": [
    {
      "post_id": 1,
      "country": "Vietnam",
      "title": "Phở Bò",
      "text": "A classic Vietnamese noodle soup...",
      "image": "https.link.to.image.jpg"
    },
    {
      "post_id": 2,
      "country": "Vietnam",
      "title": "Đá Cầu",
      "text": "A traditional game played by kicking...",
      "image": "https.link.to.image2.jpg"
    }
  ]
}
```

#### ❌ Error Response (404 Not Found)

Sent when the event `id` does not exist.

```json
{
  "error": "Event not found"
}
```
