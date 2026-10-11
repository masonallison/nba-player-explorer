# NBA Player Explorer

A full-stack web application for exploring NBA player statistics.

## Technologies Used

* **Frontend:** React, TypeScript, and Vite
* **Backend:** Python and FastAPI
* **Database:** PostgreSQL
* **API:** REST API

## Features

* View NBA players and their points per game (PPG)
* Search for players by name
* Sort players by PPG in ascending or descending order
* Add new players to the database

## Project Structure

* `frontend/` — React and TypeScript application
* `backend/` — Python FastAPI server

## Running the Application

### Backend

1. Navigate to the backend folder.
2. Activate the Python virtual environment.
3. Start the FastAPI server with `uvicorn main:app --reload`.

### Frontend

1. Navigate to the frontend folder.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.

The frontend runs in the browser, and the backend communicates with the PostgreSQL database.

## Database

The application uses PostgreSQL to store player information. Create a database named `nba_players` and configure the `players` table before running the application.
