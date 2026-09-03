Games Play

Games Play is a React single-page application for browsing, viewing, creating, editing, and managing games.

The project is built as part of the SoftUni React course exercises and uses React Router for client-side navigation and the SoftUni Practice Server as a backend.

Technologies

React

Vite

React Router DOM

JavaScript

CSS

SoftUni Practice Server

Fetch API

AbortController

Local Storage

Project Structure

games-play/
├── client/
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── components/
│       │   ├── home/
│       │   ├── catalog/
│       │   ├── details/
│       │   ├── login/
│       │   ├── register/
│       │   ├── creategame/
│       │   ├── edit/
│       │   ├── header/
│       │   └── footer/
│       ├── services/
│       │   ├── authService.js
│       │   └── gameService.js
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
├── server/
└── README.md

Implemented Features

Routing

The application uses React Router with static, dynamic, and nested routes.

Current routes:

/ - Home

/catalog - Game Catalog

/games/:gameId - Game Details

/games/:gameId/edit - Edit Game

/login - Login

/register - Register

/create - Add Game

Navigation is implemented with React Router Link.

Home Page

The Home page loads all games sorted by creation date and displays the three most recently added games.

If there are no games, the page displays:

No games yet

Catalog

The Catalog page loads and displays all available games.

Each game shows:

title

genre

image

Details link

If there are no games, the page displays:

No Added Games Yet

Game Details

The Details page uses the dynamic gameId route parameter to load a single game.

It displays:

title

genre

active players

release date

image

summary

The page also contains links/actions for Edit and Delete.

Request Management

AbortController is used when loading games in components such as Home, Catalog, and Details.

When a component is unmounted before a request is completed, the request can be cancelled using the controller signal.

Authentication

Login and Register forms are implemented as controlled React forms.

Login

The Login form:

manages email and password with React state

validates that fields are not empty

sends a login request to /users/login

stores the returned accessToken

stores the user id

redirects to Home after successful login

displays errors using window.alert

Register

The Register form:

manages email, password, and confirm password with React state

validates that all fields are filled

validates that both passwords match

sends a register request to /users/register

stores the returned accessToken

stores the user id

redirects to Home after successful registration

displays errors using window.alert

Authentication data is currently stored in localStorage.

Add Game

The Add Game page is implemented as a controlled form.

The form manages:

game title

genre

active players

release date

image URL

summary

Before submitting, the component checks that all fields are filled.

A logged-in user sends a POST request to:

/jsonstore/games

The request body has the following shape:

{
  title,
  genre,
  players,
  date,
  imageUrl,
  summary
}

Authenticated requests include the X-Authorization header.

After a successful game creation, the user is redirected to the Home page.

Delete Game

The project contains a Delete service and handler.

Delete sends an authenticated DELETE request to:

/jsonstore/games/:gameId

After successful deletion, the user is redirected to Home.

Services

authService.js

Contains authentication requests such as:

login(email, password)

register(email, password)

gameService.js

Contains game-related requests such as:

getAll(signal)

getOne(gameId, signal)

addGame(gameData, token)

deleteGame(gameId, token)

The game collection returned by the Practice Server is converted with Object.entries() so that every game receives its record id as _id.

Running the Project

Client

Open a terminal in the client directory:

cd client
npm install
npm run dev

Vite will normally start the application at:

http://localhost:5173/

Practice Server

Open a second terminal in the server directory:

cd server
node server.js

The server runs at:

http://localhost:3030/

The admin panel is available at:

http://localhost:3030/admin

Current Progress

Completed:

React project setup

component separation

client-side routing

nested routes

Home page

Catalog page

Details page

AbortController request management

Login form and authentication

Register form and authentication

Add Game form and create request

Delete Game request

favicon setup

Still to implement:

Edit Game form handling and update request

Comments form handling and comment functionality

Notes

The project currently uses localStorage for the access token and user id.

Game images can be provided either as local paths from public/images, for example:

/images/witcher.png

or as direct image URLs.
