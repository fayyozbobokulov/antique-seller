# Express TypeScript Server with SSE Support

A professional-grade Express.js server built with TypeScript, featuring Server-Sent Events (SSE) support, robust error handling, and enterprise-level architecture.

## Features

- Express.js 5.0 with TypeScript support
- Server-Sent Events (SSE) implementation
- Robust error handling and logging
- CORS configuration
- Security middleware (helmet)
- Response compression
- Environment configuration
- Professional logging system
- Health check endpoint

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
4. Modify the `.env` file with your configuration

## Development

Start the development server:
```bash
npm run dev
```

## Building for Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
src/
├── controllers/     # Controller logic
├── middleware/      # Express middleware
├── routes/         # Route definitions
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── index.ts        # Application entry point
```

## API Endpoints

- `GET /api/events` - SSE endpoint for real-time updates
- `GET /api/health` - Health check endpoint

## Error Handling

The application includes a centralized error handling system with:
- Custom error classes
- Operational vs Programming error distinction
- Detailed error logging
- Client-safe error responses

## Logging

Winston logger is configured with:
- Console output for development
- File-based logging for production
- Error-specific log file
- JSON formatting for machine parsing
- Timestamp inclusion

## License

MIT
