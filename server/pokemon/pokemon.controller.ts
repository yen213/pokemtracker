import type { Request, Response } from "express";

import * as PokemonService from "./pokemon.service";

/**
 * API to get all entries in the Pokemon table
 *
 * @returns Array of Pokemon objects
 */
export const getPokemonList = async (req: Request, res: Response) => {
    try {
        const pokemonList = await PokemonService.list();

        return res
            .status(200)
            .json({ status: 200, message: "Successfully retrieved list of pokemon", data: pokemonList });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * API to create a new entry in the Pokemon Table
 *
 * @param req Required: Pokemon object with the required fields
 *
 * @returns Pokemon object representing the new DB entry
 */
export const createPokemon = async (req: Request, res: Response) => {
    try {
        const newPokemon = await PokemonService.create(req.body);

        return res
            .status(200)
            .json({ status: 200, message: "Successfully created new Pokemon entry", data: newPokemon });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * API to update an existing entry in the Pokemon Table
 *
 * @param req Required: Pokemon object with the required fields
 *
 * @returns Pokemon object representing the updated DB entry
 */
export const updatePokemon = async (req: Request, res: Response) => {
    try {
        const updatedPokemon = await PokemonService.update(req.body);

        return res
            .status(200)
            .json({ status: 200, message: "Successfully updated existing Pokemon entry", data: updatedPokemon });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * API to delete an entry from the Pokemon table
 *
 * @param req Required: ID of Pokemon table entry to delete
 *
 * @returns Pokemon object representing the deleted DB entry
 */
export const deletePokemon = async (req: Request, res: Response) => {
    try {
        const dex_number = req.body.dex_number;

        if (dex_number == null) {
            throw new Error("Field 'dex_number' is required");
        } else if (typeof dex_number !== "number") {
            throw new Error("Field 'dex_number' must be a number");
        }

        const deletedPokemon = await PokemonService.deleteEntry(dex_number);

        return res
            .status(200)
            .json({ status: 200, message: "Successfully deleted the Pokemon entry", data: deletedPokemon });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};
