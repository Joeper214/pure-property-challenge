# Property Management System

This project is a take-home coding test that includes a backend API and a frontend client for managing property agents.

## Project Structure

- `/backend`: Node.js, Express, TypeScript API for agent management.
- `/frontend`: Vue 3, Vite, TypeScript client with a form for creating/updating agents, styled with Tailwind CSS.
- `/docs`: Contains the ER diagram and a Postman collection.

## Prerequisites

- Node.js (v16 or higher)
- npm

## Setup and Running the Application

### 1. Install Dependencies

First, install the dependencies for both the backend and frontend.

Run this command from the root directory:
```bash
npm install
```
This will install dependencies for the root, backend, and frontend concurrently.

### 2. Run the Development Servers

To run both the backend and frontend servers in development mode with hot-reloading, use the following command from the root directory:

```bash
npm run dev
```

- The **Backend API** will be running at `http://localhost:3000`.
- The **Frontend Client** will be available at `http://localhost:5173`.

The frontend is configured to proxy API requests to the backend, so you can interact with the form without CORS issues.

## API Endpoints

The backend exposes the following REST endpoints for `agents`:

- `GET /agents`: Get a list of all agents.
- `GET /agents/:id`: Get a single agent by their ID.
- `POST /agents`: Create a new agent. If an `id` is provided in the body and exists, it will update the agent (upsert).
- `PUT /agents/:id`: Update an existing agent.
- `DELETE /agents/:id`: Delete an agent by their ID.

You can use the provided Postman collection in the `/docs` folder to test the `GET /agents` and `DELETE /agents/:id` endpoints.

## Stretch Goal

The implemented stretch goal is an **email uniqueness check**. The API prevents creating or updating an agent with an email that is already in use by another agent.
