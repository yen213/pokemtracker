import axiosClient from "./axios.client";
import { AxiosResponse } from "axios";

import { PokemonObject } from "../pokemon.type";

// Gets a list of Pokemon from the DB
export const getPokemonList = (): Promise<AxiosResponse<any, any>> => axiosClient.get("/pokemon/list");

// Adds a new Pokemon to the DB
export const addNewPokemon = (pokemon: PokemonObject): Promise<AxiosResponse<any, any>> =>
    axiosClient.post("/pokemon/add", { ...pokemon });

// Updates an existing Pokemon from the DB
export const updatePokemon = (pokemon: PokemonObject): Promise<AxiosResponse<any, any>> =>
    axiosClient.put("/pokemon/update", { ...pokemon });

// Deletes an existing Pokemon from the DB
export const deletePokemon = (dex_number: number): Promise<AxiosResponse<any, any>> =>
    axiosClient.post("/pokemon/delete", { dex_number });
