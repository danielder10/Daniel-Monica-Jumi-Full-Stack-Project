# Library Manager Application

## Project Overview

### The Library Manager application is a simple book management system that allows users to add, edit, and delete books in a PostgreSQL database. It provides an intuitive interface for managing a personal or institutional library collection.

## Team Contributions

### Team Members & Tasks

- **[Your Name]** - Backend Development (Node.js, Express.js, PostgreSQL integration, CRUD operations)
- **[Team Member 2]** - Frontend Development (EJS Templating, Bootstrap UI Design, Form Validation)
- **[Team Member 3]** - Database Management & Documentation (PostgreSQL schema design, Query Optimization, Error Handling, README Documentation)

## How to Run the Application Locally

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [PostgreSQL](https://www.postgresql.org/)

### Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/library-manager.git
   cd library-manager

## Install Dependecies
npm install

## Setup the database
- Start PostgreSQL and create a database named library_db.
- Run the following SQL command in the PostgreSQL terminal:

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(255),
  year INT
);

## Configure Environment Variables
- Create a .env file in the root directory and add the following:
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/library_db

- Replace yourpassword with your actual PostgreSQL password.

## Run the Server
- node server.js
or
- npm start


