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
  "address": "123 Union Square, New York, NY",
  "description": "A vibrant festival celebrating Vietnamese street food, music, and crafts.",
  "image": "https.example.com/images/event_banner.jpg",
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

### 1\. Get Events by Country and Date Range

`GET /api/events`

Fetches a list of all events for a specific country, with optional filtering by a date range.

#### Query Parameters

| Key         | Type   | Required | Description                                                                           |
| :---------- | :----- | :------- | :------------------------------------------------------------------------------------ |
| `country`   | String | No       | The cultural country to filter by (e.g., `Vietnam`).                                  |
| `startDate` | String | No       | The start of the date range (e.g., `2025-11-30`). Finds events on or after this date. |
| `endDate`   | String | No       | The end of the date range (e.g., `2025-12-31`). Finds events on or before this date.  |

> **Logic:**
>
> - If nothing is provied, return all events that have not been expired (max 50 rows).
> - If only `country` is provided, return all events for that country and have not been expired (max 50 rows).
> - If `country` and `startDate` are provided, return events for that country starting on or after `startDate`.
> - If `country`, `startDate`, and `endDate` are provided, return events for that country within that inclusive date range.

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
    "address": "123 Union Square, New York, NY",
    "image": "https.example.com/images/event_banner.jpg",
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
    "address": "123 Union Square, New York, NY",
    "description": "A vibrant festival celebrating Vietnamese street food, music, and crafts.",
    "image": "https://example.com/images/event_banner.jpg",
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
