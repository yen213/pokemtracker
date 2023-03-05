import express from "express";

import { createPokemon, deletePokemon, getPokemonList, updatePokemon } from "./pokemon.controller";
import { isValidUser } from "../auth/validate.user";
import { pokemonValidator, pokemonValidatorResult } from "./pokemon.validation";

export const pokemonRouter = express.Router();

// Pokemon router endpoints
pokemonRouter.get("/list", getPokemonList);
pokemonRouter.post("/add", isValidUser, pokemonValidator, pokemonValidatorResult, createPokemon);
pokemonRouter.put("/update", isValidUser, pokemonValidator, pokemonValidatorResult, updatePokemon);
pokemonRouter.delete("/delete", isValidUser, deletePokemon);
