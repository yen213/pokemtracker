# Welcome to the PokeTracker App!

## Summary

Gotta catch 'em all has been the goal of almost every Trainer since the days of Pokemon Red and Blue.

Your goal is to provide a prototype that will help Trainers keep track of the Pokemon they have already caught.

## Project Requirement

For this project, you will build a web application that allows users to see a list of Pokemon. The user should have the ability to filter this list based on name, Pokedex number, and the Pokemon's primary and secondary types.
In addition, the user should also be able to mark a Pokemon as "caught".

For this prototype, we will assume that a device will only ever have one user so there is no need to create a sign in flow for them.

Provided in the `design` folder is a list of screenshots that contain how the design should look. Feel free to make any modifications to the design that you feel would make for a better UX.

The app will have a need for an admin user that can modify data.
You will need to set up the authentication so that only an admin user can access endpoints that modify Pokemon data.
Please take into consideration access from both the client and from external requests, say from something like Postman.
There are no designs for the admin part of the project.

As part of the seed data a `user` table with an admin user has already been created.

The seed data for the provided `pokemon` table contains a few errors that an admin needs to be able to correct.

1. 3 pokemon have the wrong secondary types
   - Skeledirge #911 should have it's Type 2 be ghost
   - Toedscool #914 image_url should be "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/914.png"
2. Pokemon #1000 is missing. Here is the data that needs to be added
   - name: "gholdengo",
   - dex_number: 1000,
   - type_1: "steel",
   - type_2: "ghost",
   - image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1000.png",
3. Pokemon #1009 has snuck their way onto the list and needs to be removed

<strong>Note:</strong> These are the test cases that will be used to see if functionality is in place. When validating this functionality a new database will be created and seeded with the incorrect data.

Below is a list of these requirements in a easy to parse way.
### Standard user
- As a standard user I should be able to see a list of Pokemon introduced in Pokemon Scarlet/Violet (103 in total)
- As a standard user I should be able to filter the list by typing in the Pokemon's Name or Pokedex number
- As a standard user I should be able to filter the list by selecting the Pokemon's Type 1 or Type 2
- As a standard user I should be able to toggle a Pokemon's status as caught/uncaught
- As a standard user I should be able to see a count how many Pokemon I have as a number and a percent
- As a standard user I should NOT be able to create Pokemon data
- As a standard user I should NOT be able to modify Pokemon data
- As a standard user I should NOT be able to delete Pokemon data

### Admin user
- As an admin user I should be able to create Pokemon data
- As an admin user I should be able to modify Pokemon data
- As an admin user I should be able to delete Pokemon data

## Technical Requirements
The project should have a front end application and a back end application. The front end needs to communicate with the back end to facilitate data management.

The provided code has all of the required packages set up in the `package.json` files.

### Front End
The front end needs to be built with Vite/React 18 using TypeScript. The repo already has the configuration set up.
Tailwind CSS has been configured as well, but feel free to use whatever method of styling you are comfortable with.

### Back End
For the back end server you are required to use Node v18.18 with Express using TypeScript and Prisma ORM for data management.

Express has been configured to deal with CORS but aside from that it is a vanilla setup. Feel free to add any packages you feel would improve the app.
Prisma has also been installed and configured to use a SQLite DB.
A seed file is also provided with the data needed to populate the `pokemon` and `user` tables.
If at any point you wish to reset the database, you can run `npm run seed-db` from the root of the project.

## Project Setup
To set up the project you will first need to have the code locally.

Once you have the code locally you can run `npm run setup`.
This command will install all the project dependencies and create the SQLite database.

After you have the dependencies installed you should be able to run the client and server application separately using the commands provided in the `package.json` files.

## Conclusion
You should now be ready to begin creating the prototype. The design screenshots provided should give you a solid starting point, but feel free to add your own flare to it (or don't)!

Remember this is a prototype and functionality/code will be of more value than how the app looks.

Below is a list of links to various documentation links for the different packages used:
- [React](https://reactjs.org/docs/getting-started.html)
- [Tailwind](https://tailwindcss.com/docs/installation)
- [React Router](https://reactrouter.com/en/main)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Express](https://expressjs.com/en/guide/routing.html)
- [Prisma](https://www.prisma.io/docs)
- [Passport](https://www.passportjs.org/docs/)


