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

## Security Protocols
- **Data Protection**: SSL/TLS encryption for all data in transit.
- **Access Control**: Role-based views separated by URL routing and local auth gates.

## Deployment Strategy
- **CI/CD**: Manual trigger via Admin Console.
- **Environment**: Staging (Localhost) -> Production (Vercel/Firebase Hosting).
