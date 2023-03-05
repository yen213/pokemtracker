import express from "express";

import { createPokemon, deletePokemon, getPokemonList, updatePokemon } from "./pokemon.controller";
import { pokemonValidator, pokemonValidatorResult } from "./pokemon.validation";

export const pokemonRouter = express.Router();

// Pokemon router endpoints
pokemonRouter.get("/list", getPokemonList);
pokemonRouter.post("/add", pokemonValidator, pokemonValidatorResult, createPokemon);
pokemonRouter.put("/update", pokemonValidator, pokemonValidatorResult, updatePokemon);
pokemonRouter.delete("/delete", deletePokemon);
