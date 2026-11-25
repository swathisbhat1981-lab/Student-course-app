*Student & Course Manager*

A React app for managing students and courses with full CRUD (Create, Read, Update, Delete), using JSON Server as a mock backend.

## Features
- Dashboard with navbar and student and course count cards
- Add, view, edit and delete students
- Add, view, edit and delete courses
- Confirmation popup before deleting a record
- Data saved to `db.json` through a REST API

## Technologies
React (Vite), React Router, Bootstrap, Axios, JSON Server

## Prerequisites
Node.js 24 LTS and npm

## Setup
1. Clone the repository and go into the folder:
```
   git clone https://github.com/swathisbhat1981-lab/student-course-app.git
   cd student-course-app
```
2. Install dependencies:
```
   npm install
```
3. Start the mock API (runs at http://localhost:3001):
```
   npm run server
```
4. In a second terminal, start the app (runs at http://localhost:5173):
```
   npm run dev
```