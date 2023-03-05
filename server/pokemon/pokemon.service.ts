import { Pokemon } from "@prisma/client";
import { db } from "../prisma/db";

/**
 * Retrieves all the entries from the Pokemon table
 *
 * @returns Array of Pokemon objects
 */
export const list = async (): Promise<Pokemon[]> => {
    return db.pokemon.findMany({
        select: {
            id: true,
            name: true,
            dex_number: true,
            type_1: true,
            type_2: true,
            image_url: true,
        },
    });
};

/**
 * Adds a new entry to the Pokemon table
 *
 * @param pokemon Pokemon object with the required fields
 *
 * @returns Pokemon object representing the saved DB entry
 */
export const create = async (pokemon: Omit<Pokemon, "id">): Promise<Pokemon> => {
    return db.pokemon.create({
        data: { ...pokemon },
        select: { id: true, name: true, dex_number: true, type_1: true, type_2: true, image_url: true },
    });
};

/**
 * Updates an existing Pokemon entry in the DB
 *
 * @param pokemon Pokemon object with the required fields
 *
 * @returns Pokemon object representing the updated DB entry
 */
export const update = async (pokemon: Pokemon): Promise<Pokemon> => {
    return db.pokemon.update({
        where: {
            dex_number: pokemon.dex_number,
        },
        data: { ...pokemon },
        select: { id: true, name: true, dex_number: true, type_1: true, type_2: true, image_url: true },
    });
};

/**
 * Deletes an existing Pokemon entry from the DB
 *
 * @param id ID of the Pokemon table entry to delete
 *
 * @returns Pokemon object representing the deleted DB entry
 */
export const deleteEntry = async (dex_number: number): Promise<Pokemon> => {
    return db.pokemon.delete({
        where: { dex_number },
        select: { id: true, name: true, dex_number: true, type_1: true, type_2: true, image_url: true },
    });
};
