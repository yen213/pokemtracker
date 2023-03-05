import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import passport from "passport";
import session from "express-session";

import { pokemonRouter } from "./pokemon/pokemon.router";

const app = express();
const port = 3001;

// --------------------- MIDDLEWARE ---------------------
app.use(
    cors({
        credentials: true,
        allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
        origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    })
);

app.use(express.json());

// Authentication and session
app.use(
    session({
        secret: "pokemon",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cookieParser("pokemon"));
app.use(passport.initialize());
app.use(passport.session());

// Reuse same passport instance
const authRouter = require("./auth/auth.router")(passport);
require("./passport.config")(passport);

// --------------------- ROUTES ---------------------
app.use("/pokemon", pokemonRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
    console.log(`PokeTracker server listening on port ${port}`);
});
