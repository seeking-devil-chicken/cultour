# Action Plan: "Events" Feature Integration

**Objective:** Integrate third-party cultural events from Eventbrite into the application. This involves refactoring the existing server to TypeScript, building a new API to serve event data, and building a parallel frontend interface for users to discover events and related cultural posts.

**Team:**

- **Nam:** Backend (TypeScript, Node.js, Express, PostgreSQL)
- **Mari:** Frontend (TypeScript, React, Vite)

**Key Principle (Parallel Development):** Mari (Frontend) will not be blocked by backend development. She will create a mock data service that adheres to the `EVENTS_API.md` spec, allowing her to build the complete UI concurrently while Nam builds the API.

---

## Phase 1: Foundation, Refactor & Setup

**Goal:** Install all dependencies into the root `node_modules`, prepare the `events` table, refactor the _existing_ server to TypeScript, and set up Vitest for _both_ environments.

### Nam & Mari (Shared Root Setup):

- `[x]` **Task 1.1: Install All Dependencies (Root)**

  - **Owner:** Nam
  - **Task:** From the root directory, run `npm install` for all new dev dependencies needed for this feature.
  <!-- end list -->

  ```bash
  # Install TS dependencies for server
  npm install -D typescript ts-node nodemon @types/node @types/express @types/cors @types/pg

  # Install Vitest and React Testing Library
  npm install -D vitest jsdom @testing-library/react
  ```

### Nam (Backend):

- `[x]` **Task 1.2: Database Migration**
  - **Task:** Run the updated `CREATE TABLE events (...)` script (from `DATABASE_SCHEMA.md`) on the development database. (This now includes `address`, `description`, and `image`).
- `[x]` **Task 1.3: Environment Setup**
  - **Task:** Register for an Eventbrite Developer account, get a private API key, and add it to the root `.env` file (e.g., `EVENTBRITE_API_KEY=...`).
- `[x]` **Task 1.4: Server JS-to-TS Refactor**
  - **Task:**
    - Create `server/tsconfig.json` (using `NodeNext` for module resolution).
    - Rename all existing `.js` files in `server/` (e.g., `server.js`, `postcontroller.js`, `database.js`) to `.ts`.
    - Fix all imports (remove `.js` extensions) and add explicit types (e.g., `Request`, `Response`, `NextFunction` in controllers).
- `[x]` **Task 1.5: Vitest Setup (Backend)**
  - **Task:** Create a `server/vitest.config.ts` file to configure Vitest for the Node.js environment.

### Mari (Frontend):

- `[x]` **Task 1.6: Vitest Setup (Frontend)**
  - **Task:** Update `client/vite.config.ts` (or create `client/vitest.config.ts`) to configure Vitest for React/JSDOM testing.

---

## Phase 2.1: Parallel Development - Backend API (Nam)

**Goal:** Create services to fetch data from Eventbrite, populate the database, and build the two new API endpoints as defined in `EVENTS_API.md`. All new code must be in TypeScript.

- `[ ]` **Task 2.1.1: Eventbrite Service**
  - **Task:**
    - Create a new service (`server/services/eventbriteService.ts`).
    - Implement a function (e.g., `fetchEventsByLocation(...)`) that calls the Eventbrite API.
    - This function must **transform** the complex JSON response from Eventbrite into the `events` table structure (including `address`, `description`, `image`, `country`, etc.).
- `[ ]` **Task 2.1.2: Data Population Script**
  - **Task:**
    - Create a standalone script (`server/scripts/seedEvents.ts`).
    - This script will import the `eventbriteService`, call it for target cities/countries, and perform `INSERT` queries to populate the `events` table.
    - Run this script once to populate the dev database.
- `[ ]` **Task 2.1.3: API Endpoint - `GET /api/events`**
  - **Task:**
    - Create a new controller (`server/controllers/eventsController.ts`).
    - Create a new route (`GET /api/events`) in `server.ts`.
    - The controller must read `country` (required), `startDate` (optional), and `endDate` (optional) from `req.query`.
    - It must build a dynamic SQL query to filter by `country` and optionally by the date range (`event_datetime`).
- `[ ]` **Task 2.1.4: API Endpoint - `GET /api/events/:id`**
  - **Task:**
    - Create a new route (`GET /api/events/:id`) in `server.ts`.
    - Implement the join logic in `eventsController.ts`:
      1.  `await` a query for the event: `SELECT * FROM events WHERE id = $1`.
      2.  If not found, return 404.
      3.  If found, get the event's `country`.
      4.  `await` a second query for posts: `SELECT * FROM posts WHERE country = $1`.
      5.  Combine both results into the specified JSON structure: `{ eventDetails: {...}, relatedPosts: [...] }`.

---

## Phase 2.2: Parallel Development - Frontend UI (Mari)

**Goal:** Build the new "Events" pages _without_ waiting for Nam, using local mock data that perfectly matches the _new_ API specification.

- `[ ]` **Task 2.2.1: Create Mock Data**
  - **Task:**
    - Create a new file: `client/src/mocks/mockData.ts`.
    - In this file, export dummy data for `Event` objects that **include `address`, `description`, and `image`** (and remove `event_venue`).
    - Create a mock service (`client/src/mocks/mockApiService.ts`) with functions like `getEvents(params: { country, startDate?, endDate? })` and `getEventById(id)` that return your mock data (as a Promise).
- `[ ]` **Task 2.2.2: Setup Routes & Navigation**
  - **Task:**
    - In `App.tsx`, wire the "Find events" button to `Maps('/events')`.
    - Add two new `<Route>` components to the `<Routes>` block in `App.tsx`:
      - `<Route path="/events" element={<EventsPage />} />`
      - `<Route path="/events/:id" element={<EventDetailPage />} />`
- `[ ]` **Task 2.2.3: New Page - Event List (`/events`)**
  - **Task:**
    - Create a new component (`client/src/pages/EventsPage.tsx`).
    - Add filters for `country` (dropdown/select) and optionally two date pickers (`startDate`, `endDate`).
    - On search/filter, call your `mockApiService.getEvents(...)` function.
    - Map over the returned array and render "Event Cards" (showing `image`, `event_title`, `event_datetime`).
    - Each card must be a `<Link>` that navigates to `/events/{event.id}`.
- `[ ]` **Task 2.2.4: New Page - Event Detail (`/events/:id`)**
  - **Task:**
    - Create a new component (`client/src/pages/EventDetailPage.tsx`).
    - Use the `useParams()` hook to get the event `:id` from the URL.
    - Call your `mockApiService.getEventById(id)` function.
    - Render the `eventDetails` (including the new `image`, `description`, and `address` fields).
    - Render the `relatedPosts` array in a separate "Related Posts" section.

---

## Phase 3: Integration & Full-Project Testing

**Goal:** Connect the frontend to the real backend API and write comprehensive Vitest tests for _all_ features, new and old.

### Mari (Frontend):

- `[ ]` **Task 3.1: API Integration**
  - **Task:**
    - Once Nam confirms the API is ready, modify your API service.
    - Remove the mock logic and replace it with real `fetch` calls (e.g., `fetch('http://localhost:4000/api/events?country=Vietnam&startDate=...')`).
    - Your components should update automatically with real data.
- `[ ]` **Task 3.2: Frontend Testing (Vitest)**
  - **Task:**
    - **Existing:** Write component tests for `Discover.tsx`, `Posts.tsx`, and `IndividualPost.tsx`.
    - **New:** Write component tests for `EventsPage.tsx` and `EventDetailPage.tsx` (testing the new filters and data fields).
    - All tests should mock `fetch` calls.
  - **Key Result:** `npm run test:client` (or similar script) passes.

### Nam (Backend):

- `[ ]` **Task 3.3: Backend Testing (Vitest)**
  - **Task:**
    - **Existing:** Write unit/integration tests for `postsController.ts` and `queryController.ts`.
    - **New:** Write unit tests for the **new** `eventsController.ts` (testing the `country` and date range logic).
    - **New:** Write an integration test for `GET /api/events/:id` to ensure the correct data (including new fields) is returned.
  - **Key Result:** `npm run test:server` (or similar script) passes.

### Both (Manual E2E Test):

- `[ ]` **Task 3.4: Manual End-to-End Test**
  - **Task:**
    1.  (Nam) Run the server (`npm run dev:server`).
    2.  (Mari) Run the client (`npm run dev:client` or `vite`).
    3.  Test the **existing** flow: View posts, create a post.
    4.  Test the **new** flow: Navigate to "Events", filter by `country` and `date`.
    5.  Verify event cards load from `GET /api/events`.
    6.  Click an event. Verify the `EventDetailPage` loads.
    7.  Verify `image`, `description`, `address`, and "Related Posts" are displayed correctly.
  - **Key Result:** The entire application works seamlessly from frontend to backend.

---

## Phase 4: Polish

**Goal:** Finalize all features and remove debugging code.

### Nam (Backend):

- `[ ]` Add server-side validation (e.g., ensure `country` is provided, dates are valid).
- `[ ]` Finalize all error handling in the global error handler (`server.ts`).
- `[ ]` Remove all `console.log`s.

### Mari (Frontend):

- `[ ]` Add "Loading" states (spinners) for all `fetch` calls.
- `[ ]` Add user-facing error handling (e.g., "No events found for this country," "Event not found").
- `[ ]` Check responsiveness: Ensure the new event pages (and images) look good on mobile.
- `[ ]` Remove all `console.log`s.
