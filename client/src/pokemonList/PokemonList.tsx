import { useState } from "react";

import PlusIcon from "../icons/PlusIcon";
import PokeBallIcon from "../icons/PokeBallIcon";

import { PokemonObject } from "../pokemon.type";

import pokemonType from "../styles/pokemon-types.module.css";

type Props = {
    data: Array<PokemonObject>;
    caughtPokemon: Array<number>;
    setCaughtPokemon: React.Dispatch<React.SetStateAction<Array<number>>>;
};

const PokemonList = ({ data, caughtPokemon, setCaughtPokemon }: Props) => {
    // Used to display the delete icon when an Admin user
    // hovers over one of Pokemon cards in the list
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    /**
     * Removes the Pokemon from the {@link caughtPokemon} list if user clicks the
     * Pokeball on an already caught Pokemon. Else adds it to the list.
     *
     * @param isCaught True if the Pokemon with the @param dexNumber exists
     *                 in the {@link caughtPokemon} list. False otherwise
     * @param dexNumber Dex number of the Pokemon
     */
    const updateCaughtPokemon = (isCaught: boolean, dexNumber: number) =>
        setCaughtPokemon((prev) => {
            if (isCaught) {
                return prev.filter((num) => num !== dexNumber);
            }

            return [...prev, dexNumber];
        });

    /**
     *  Map each Pokemon object from the {@link data} to a <li/>
     */
    const pokemonList = data.map((pokemon) => {
        let isCaught = caughtPokemon.includes(pokemon.dex_number);

        return (
            <li
                onMouseEnter={() => setHoveredIndex(pokemon.dex_number)}
                onMouseLeave={() => setHoveredIndex(-1)}
                key={pokemon.dex_number}
                className={`flex place-items-center bg-gray-100 rounded-lg w-full p-2${
                    isCaught ? " bg-green-400" : ""
                }`}
            >
                <div
                    className="w-2/12 flex justify-center items-center"
                    onClick={() => updateCaughtPokemon(isCaught, pokemon.dex_number)}
                >
                    <PokeBallIcon isCaught={isCaught} />
                </div>
                <div className="w-10/12 flex place-items-center flex-col">
                    <p className="font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    <p className="font-bold">#{pokemon.dex_number}</p>
                    <img src={pokemon.image_url} />
                    <div>
                        <div className={`${pokemonType["type-icon"]} ${pokemonType[pokemon.type_1]} mr-1`}></div>
                        {pokemon.type_2 != null && (
                            <div className={`${pokemonType["type-icon"]} ${pokemonType[pokemon.type_2]}`}></div>
                        )}
                    </div>
                </div>
                {hoveredIndex === pokemon.dex_number && (
                    <PlusIcon iconClass="h-5 w-5 self-start text-neutral-600 hover:text-neutral-800 rotate-45 cursor-pointer" />
                )}
            </li>
        );
    });

    return <ul className="grid grid-cols-1 justify-items-center md:grid-cols-3 md:gap-4">{pokemonList}</ul>;
};

export default PokemonList;
