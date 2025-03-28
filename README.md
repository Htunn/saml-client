# SAML Client Test Application

A lightweight SAML client built with Node.js and TypeScript to facilitate end-to-end testing of SAML authentication flows between a Service Provider (SP) and an Identity Provider (IdP).

## Features
- SP-initiated SAML authentication flow
- SAML Assertion Consumer Service (ACS) endpoint
- SAML metadata endpoint
- SAML logout functionality
- User attribute extraction (e.g., `mail`, `groups`, `displayName`)
- Docker containerization support
- Comprehensive logging for debugging and analysis

## Prerequisites
- Node.js 20.x or higher
- TypeScript
- A SAML Identity Provider (e.g., Keycloak) for testing

## Installation
Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd saml-client
npm install
```

## Configuration
1. **Create an environment variables file**:
  - Define the required environment variables in a `.env` file.

2. **Generate SP certificates**:
  - Generate the necessary certificates for the Service Provider.

3. **Add IdP certificate**:
  - Import the Identity Provider's certificate for secure communication.

## Running the Application
### Development Mode
Start the application in development mode:
```bash
npm run dev
```

### Production Mode
Build and run the application in production mode:
```bash
npm run build
npm start
```

### Docker
Build and run the application using Docker:
```bash
docker build -t saml-client .
docker run -p 3000:3000 saml-client
```

## SAML Endpoints
- **Login**: `/login` - Initiates SP-initiated SAML login flow.
- **Assertion Consumer Service**: `/acs` - Processes SAML assertions from the IdP.
- **Metadata**: `/metadata` - Provides SP SAML metadata for IdP configuration.
- **Logout**: `/logout` - Initiates SAML logout flow.

## API Documentation
API documentation is available at `/openapi` when the service is running.

## Testing
Run the test suite:
```bash
npm test
```

## Project Structure
The project is organized to ensure clarity and maintainability. Refer to the source code for detailed structure and comments.

## Identity Provider Configuration
A sample Keycloak client configuration is provided in the `kc_metadata.xml.json` file. Use this as a reference when setting up your IdP.

## License
This project is licensed under the [MIT License](LICENSE).