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
Feature 4 completes the requirement:
> “All Parse queries outside of controllers/components and inside of Parse Models.”
