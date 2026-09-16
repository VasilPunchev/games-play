# I Love Games

I Love Games is a React single-page application for browsing, creating and managing games.

The project demonstrates authentication, protected routes, CRUD operations, owner-based permissions, comments, reusable custom hooks and REST API integration.

## Features

- User registration, login and logout
- Authentication with Context API
- Persistent session with localStorage
- Public game catalog and details pages
- Create, edit and delete games
- Owner-only Edit/Delete actions
- Comments with author email
- Protected routes with UserGuard
- Guest-only routes with GuestGuard
- Reusable `useForm` and `useAuth` hooks
- Delete confirmation
- REST API integration with SoftUni Practice Server

## Tech Stack

- React
- Vite
- React Router
- JavaScript
- HTML
- CSS
- Context API
- REST API
- SoftUni Practice Server

## Main Routes

```text
/                       Home
/catalog                Catalog
/login                  Login
/register               Register
/create                 Create Game
/games/:gameId          Game Details
/games/:gameId/edit     Edit Game
```

## Authentication & Permissions

Authenticated users can create games and access protected routes.

Only the creator of a game can edit or delete it.

Logged-in users who are not the owner can leave comments.

Guests can browse games and view details.

## API

```text
POST   /users/register
POST   /users/login

GET    /data/games
GET    /data/games/:id
POST   /data/games
PUT    /data/games/:id
DELETE /data/games/:id

GET    /data/comments
POST   /data/comments
```

## Run Locally

Start the server:

```bash
cd server
node server.js
```

Start the client:

```bash
cd client
npm install
npm run dev
```

## Project Focus

This project was built to practice and demonstrate:

- React component architecture
- React Router
- Authentication and Context API
- Custom hooks
- Controlled forms
- CRUD operations
- REST API communication
- Route guards
- Ownership-based permissions
