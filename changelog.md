# Changelog

## [0.2.0] – 2025-10-16
### Added
- Implemented Feature 4 (Trips page, Location ↔ Weather integration)
- Added `Location` and `Weather` Parse models
- Added `Team` model for static team.json data
- Added interactive map with Leaflet
- Configured Webpack build pipeline

### Changed
- Moved all Parse queries into model files
- Refactored components to use model-level data loaders
- Improved layout and styling for Trips cards and map

### Fixed
- Leaflet marker icon path bug
- Incorrect pointer direction in UML diagram

### Notes
Feature 4 completes the necessary requirements

## [0.3.0] – 2025-11-06
### Added
- Implemented Feature 5 (Authentication, Navbar/Logout, Footer, and Calendar integration)
- Added AuthLogin and AuthRegister pages with modernized styling and validation
- Added ProtectedRoute component for authenticated-only routes
- Added Calendar page with embedded Google Calendar and restricted access for logged-in users
- Added Footer component with LinkedIn, Instagram, and email links using Lucide icons
- Added @nd.edu email domain validation in registration
- Added password requirements (min. 6 chars, one uppercase, one number)
- Added automatic login and redirect to home upon successful registration
- Added profile icon to Navbar with dynamic state (Login/Register vs. Profile/Logout)

### Notes
Feature 5 completes the necessary requirements
