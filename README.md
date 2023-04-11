# PokeTracker App

A web application that allows users to see a list of Pokemon introduced in Pokemon Scarlet/Violet (103 in total).

An user has the ability to filter this list based on name, Pokedex number, and the Pokemon's primary and secondary types.
Users can also toggle a Pokemon as caught/uncaught.

There is a backend which allows authenticated users to create, modify and update the Pokemon list data. Users can log in using the login page.
To make changes to the Pokemon list data, logged in users can click on a Pokemon in the list, which will open a modal with the Pokemon
information that can be modified.

The front end is built using Vite/React 18 with TypeScript and styled using Tailwind.
The back end server is built using Node v18.18 with Express, TypeScript, Prisma ORM for data management, and Passport for authentication.

## Technical Requirements

[Node v18.18](https://nodejs.org/en/) needs to be installed to use and start the server.

## Project Setup

To use the client: `npm run setup:client` to install packages, then run `npm run start:client` to run the dev server for the front end.
To use the server: `npm run setup:server` to install packages, then run `npm run start:server` to run the dev server for the back end.

### Technologies

-   [Typescript](https://www.typescriptlang.org/docs/)
-   [React](https://reactjs.org/docs/getting-started.html)
-   [React Router](https://reactrouter.com/en/main)
-   [Tailwind](https://tailwindcss.com/docs/installation)
-   [Express](https://expressjs.com/en/guide/routing.html)
-   [Prisma](https://www.prisma.io/docs)
-   [Prisma Studio](https://www.prisma.io/studio)
-   [Passport](https://www.passportjs.org/docs/)
