import { useEffect } from "react";

import pokemonType from "../styles/pokemon-types.module.css";
import PokeBallIcon from "../icons/PokeBallIcon";

import { AppContextValue, useData } from "../App.context";

type Props = {
    onPokemonClick: Function;
};

// Renders the list of all the Pokemon
const PokemonList = ({ onPokemonClick }: Props) => {
    // App context
    const { isUserLoggedIn, caughtPokemon, filteredPokemonList, setCaughtPokemon }: AppContextValue = useData();

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
     *  Sort each Pokemon object on dex_number (increasing order) and map
     *  the {@link data} to a <li/> element
     */
    const pokemonListItems = filteredPokemonList
        .sort((a, b) => a.dex_number - b.dex_number)
        .map((pokemon) => {
            let isCaught = caughtPokemon.includes(pokemon.dex_number);

            return (
                <li
                    id={`pokemon_list_item_${pokemon.dex_number}`}
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
                        <p className="font-bold">{pokemon.name}</p>
                        <p className="font-bold">#{pokemon.dex_number}</p>
                        <img
                            onClick={() => onPokemonClick(pokemon)}
                            className={`my-1 hover:animate-jump${isUserLoggedIn ? " cursor-pointer" : ""}`}
                            src={pokemon.image_url}
                            alt=""
                        />
                        <div className="my-1">
                            <div className={`${pokemonType["type-icon"]} ${pokemonType[pokemon.type_1]} mr-1`}></div>
                            {pokemon.type_2 != null && (
                                <div className={`${pokemonType["type-icon"]} ${pokemonType[pokemon.type_2]}`}></div>
                            )}
                        </div>
                    </div>
                </li>
            );
        });

    // Animate the list items to fading into and out of view
    useEffect(() => {
        // Get all the <li/> elements
        const targets = document.querySelectorAll('[id^="pokemon_list_item_"]');

        // Add the animation class whenever one of the items are in view
        // Else remove the class
        const observer: IntersectionObserver = new IntersectionObserver(
            (entries, _observer) => {
                entries.forEach((entry) => {
                    const entryID = entry.target.id.startsWith("pokemon_list_item_");

                    if (entryID) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("animate-fadeIn");
                        } else {
                            entry.target.classList.remove("animate-fadeIn");
                        }
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        // Attach the observer to each targeted element
        targets.forEach(function (target) {
            target.classList.add("opacity-0"); // Initially Hide the element
            observer.observe(target);
        });

        return () => observer.disconnect();
    }, [filteredPokemonList]);

    return <ul className="grid grid-cols-1 gap-4 justify-items-center md:grid-cols-3">{pokemonListItems}</ul>;
};

export default PokemonList;
