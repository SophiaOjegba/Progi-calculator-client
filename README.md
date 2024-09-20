# Bid Calculation Tool

This project is a full-stack bid calculation tool that helps users calculate various fees for different types of vehicles. The project is divided into two parts: a Vue.js frontend and a Symfony backend.

## Table of Contents
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Technologies](#technologies)
- [Features](#features)
- [Tests](#tests)
- [Contributing](#contributing)

---

## Frontend Setup

The frontend is built using Vue.js. It communicates with the backend API to calculate fees for different vehicle types based on a base price.

### Prerequisites

Make sure you have Node.js and npm installed.

Node.js: Download and install Node.js from [here](https://nodejs.org/).

Vue CLI: Install Vue CLI globally using:
  ```bash
  npm install -g @vue/cli
  
  git clone <repository-url>
  
  cd bid-calculation-client 

  npm install

  npm run serve

  ```
## Backend Setup
The backend is built using Symfony and provides an API for calculating the total fees based on vehicle type and base price.

### Prerequisites
Make sure you have the following installed:

PHP: Version 8.2 or higher
Composer: Dependency manager for PHP Installation

  ```bash
  git clone

  cd bid-calculation-backend

  composer install

php bin/console server:run
  ```

## Technologies

### Frontend:
- Vue.js 3.x
- Axios for API requests
- Jest for testing

### Backend:
- Symfony
- PHP 8.x
- PHPUnit for testing

---

## Features
- Calculate fees based on vehicle type and base price.
- Responsive UI with a clean, well-structured design.
- Unit tests for both frontend and backend.
- Error handling for missing or incorrect API routes.

---

## Tests

### Running Frontend Tests

To run unit tests for the frontend:

1. Install Jest and Vue test utilities if not already installed:
   ```bash
   npm install --save-dev @vue/test-utils jest babel-jest vue-jest


   ```

## Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.
