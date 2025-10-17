Feature 4 – Change Log

Project: ND Ski & Snowboard Club Website
Developer: Connor MacDonald
Date: October 16, 2025

1. Backend – Back4App Parse Database Configuration
Classes Created

Location

Attributes: Name (String), Region (String), Description (String), Cords (GeoPoint), Altitude (Number), Summit (Number), countryFlag (String), websiteUrl (String), Weather (Pointer → Weather)

Description: Represents each ski resort or trip destination.

Relationship: Points to one Weather object (Location → Weather).

Weather

Attributes: Location (String), Condition (String), Temperature (Number), windSpeed (Number), Humidity (Number), iconURL (String), feelsLike (Number), snowDepthFT (Number)

Description: Stores current weather data for each resort.

Relationship: Referenced by Location via Pointer field.

Additional Changes

Added initial records (Banff Sunshine Village → Weather 6iOUj8f23G).

Enabled public read permissions (Find, Get) for both Location and Weather.

2. Frontend Service Layer – Asynchronous Parse Integration
weatherService.js

Replaced static JSON fetching with Parse queries.

Functions implemented:

getWeather() – fetch all Weather records.

getWeatherByLocation(name) – fetch Weather for a specific location.

Uses Parse.Query with async/await and maps results into plain JavaScript objects.

Added error handling and consistent field naming.

locationService.js

Fetches all Location records and includes related Weather pointer.

Converts Parse objects into plain JS objects for React state.

Verified pointer relationship with query.include("Weather") and GeoPoint field Cords.

3. Frontend UI Components – React Implementation
Trips.js

New page component: Our Trips.

Implements:

useEffect and useState for asynchronous Parse data loading.

Dropdown menu for selecting locations.

Two side-by-side cards: Location info (left) and Weather (right).

State management for selected location and loading/error states.

Integration with TripsMap for GeoPoint visualization.

TripsMap.js

Added interactive map using React Leaflet.

Displays markers based on the GeoPoint field Cords.

Fixed Leaflet default marker icons for React builds.

Centers map on selected location and positions below cards.

Trips.module.css

Redesigned layout:

Equal height cards using align-items: stretch.

Box shadow and rounded corners for consistent design.

Added margin and width alignment for the map section.

Restyled dropdown for consistent theme and typography.

Navbar.js

Added "Our Trips" link to main navigation bar.

Confirmed route setup in App.js for /trips.

4. GeoPoint Features

Verified that Cords is stored as a GeoPoint in Parse.

Implemented map markers with weather information popups.

Added fallback handling for undefined GeoPoints.

Adjusted Leaflet map sizing and responsiveness.

5. Build and Deployment Setup

Created custom webpack.config.js:

Bundles React application and supports JSX/ES6 via Babel.

Configured CSS and image loaders.

Added HtmlWebpackPlugin and Webpack Dev Server with historyApiFallback for React Router.

Updated package.json scripts:

"start": "webpack serve --mode development"

"build": "webpack --mode production"

6. Documentation and Diagrams

Created UML class diagram (Location → Weather) in Figma and Mermaid.

Displays all class attributes and one-to-one pointer relationship.

Corrected direction of the association arrow (Location → Weather).

7. Git and Version Control

Created feature branch feature4_cmac.

Committed all Feature 4 changes and merged into main.

Pushed updates to remote (git merge feature4_cmac → git push origin main).

Cleaned up local branch after merge.