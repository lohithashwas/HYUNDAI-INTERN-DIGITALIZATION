# Hyundai Digitalization - Development Notes

## Project Structure
This application is built using the **Vite + React** ecosystem to ensure high performance and low latency for the operator interfaces.

### Core Modules
- **Sattva Portal**: Optimized for tablet touch inputs (iPad / Android Tablet).
- **Admin Portal**: Desktop-first design for reporting and printing.

## API Integration Patterns
We utilize a singleton pattern in `src/api.js` to manage Firebase REST endpoints.
- **Authentication**: Bearer token simulation using query parameters.
- **Error Handling**: Centralized try/catch blocks with user-facing alerts.
