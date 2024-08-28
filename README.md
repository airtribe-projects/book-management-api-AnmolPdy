
# Books Management API

This project is a RESTful API built with Express.js and MongoDB for managing a collection of books. It includes features for creating, retrieving, updating, and deleting books, with JWT-based authentication for secure access.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)


## Project Overview

The Books API allows you to manage a collection of books through a simple RESTful interface. The API supports basic CRUD operations (Create, Read, Update, Delete) and includes JWT-based authentication to secure the endpoints.

## Features

- JWT Authentication
- Pagination and filtering for book listings
- CRUD operations for books
- Error handling for common issues

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/airtribe-projects/book-management-api-AnmolPdy.git
   

2. **Install dependencies:**

    ```bash
    npm install

2. **Set up environment variables:**

    Create a .env file in the root directory and add the following:

    ```bash
    PORT=3000
    MONGO_URL=your_mongo_url
    JWT_SECRET=your_jwt_secret_key

- JWT_SECRET: A secret key for signing JWT tokens.
- MONGO_URI: The MongoDB connection string.

4. **Start the server:**

    ```bash
    npm run dev

The API will be accessible at http://localhost:3000.




## API Endpoints

### User Authentication Endpoints

- **POST /api/register**: Register a new user.
  - **Request Body**:
    - `username`: The user's username.
    - `email`: The user's email address.
    - `password`: The user's password.

- **POST /api/login**: Login an existing user and obtain a JWT token.
  - **Request Body**:
    - `username`: The user's username.
    - `password`: The user's password.
  - **Response**:
    - `200 OK`: Returns a JWT token if login is successful.
    - `401 Unauthorized`: Invalid password.
    - `400 Bad Request`: Incorrect login details.

### Books Endpoints

- **GET /api/books**: Retrieve a paginated list of books. Supports filtering by genre.
  - Example: `/api/books?page=2` (Go to the next page)
  - Example: `/api/books?genre=Novel` (Filter books by the genre "Novel")
  - Example: `/api/books?page=3&genre=Novel` (Go to page 3 and filter by genre "Novel")
  - Example: `/api/books?page=3&limit=5&genre=Novel` (Go to page 3, limit results to 5 per page, and filter by genre "Novel")

- **GET /api/books/:id**: Retrieve a single book by its ID.

- **POST /api/books**: Create a new book.

- **PUT /api/books/:id**: Update an existing book by its ID.

- **DELETE /api/books/:id**: Delete a book by its ID.

## Usage

- Use an API client like [Postman](https://www.postman.com/) to test the endpoints.
- Include the JWT token in the `Authorization` header as `Bearer <token>` to access the routes.

### Example

To fetch books from a specific genre with pagination:

  GET /api/books?page=2&limit=5&genre=Science%20Fiction
  Authorization: Bearer <your_jwt_token>


##Live Link:
https://book-management-api-anmolpdy.onrender.com/