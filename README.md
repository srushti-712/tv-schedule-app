# TV Schedule App

## Overview

The **TV Schedule App** is a React-based web application that fetches and displays TV schedules based on the selected date and country. It leverages IndexedDB for caching data to enhance performance and reduce redundant API calls.

## Features

- Fetch TV schedules from an API.
- Cache schedules in **IndexedDB** for offline support and faster load times.
- Navigate between **SchedulePage**, **ShowDetails**, and **Episode** pages.
- Handles API errors gracefully.

## Technologies Used

- **React** (Frontend framework)
- **Axios** (HTTP requests)
- **React Router** (Navigation)
- **IndexedDB (idb library)** (Client-side storage)
- **Context API** (State management)

## Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-repo/tv-schedule-app.git
   cd tv-schedule-app
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:

   ```env
   VITE_APP_CURRENT_DATE="2020-05-29"
   VITE_APP_BASE_URL="https://api.tvmaze.com"
   ```

4. **Run the application**
   ```sh
   npm run dev
   ```

## Folder Structure

```
📂 src
 ├── 📂 components  # Reusable components like ScheduleGrid
 ├── 📂 context     # App-wide state management (AppContext)
 ├── 📂 pages       # Main pages (SchedulePage, ShowDetails, Episode)
 ├── main.jsx       # React entry point
 ├── App.jsx        # Main App component
```

## Usage

1. Select a **date** and **country** to fetch schedules.
2. Click on a **show** to view details.
3. Navigate between different pages seamlessly.

## Troubleshooting

- **Schedule data not loading?**
  - Check the browser console for errors.
  - Ensure the API endpoint is correct in `.env`.
  - Clear IndexedDB storage and refresh.

## Contributing

Feel free to fork and contribute!

## License

[MIT](LICENSE)
