import { useEffect, useState } from "react";
import { pokemonData } from "../data/pokemon";
import PokemonList from "./PokemonList";

type Props = {};

export const PokemonListContainer = (props: Props) => {
    const [pokemonFilter, setPokemonFilter] = useState("");
    const [filteredPokemon, setFilteredPokemon] = useState(pokemonData);
    const [caughtPokemon, setCaughtPokemon] = useState<Array<number>>([]);
    const [type1, setType1] = useState("any");
    const [type2, setType2] = useState("any");

    // I could have sorted this manually but felt a little lazy
    const pokemonTypes = [
        { value: "any", label: "Any" },
        { value: "bug", label: "Bug" },
        { value: "electric", label: "Electric" },
        { value: "fire", label: "Fire" },
        { value: "grass", label: "Grass" },
        { value: "normal", label: "Normal" },
        { value: "rock", label: "Rock" },
        { value: "dark", label: "Dark" },
        { value: "fairy", label: "Fairy" },
        { value: "flying", label: "Flying" },
        { value: "ground", label: "Ground" },
        { value: "poison", label: "Poison" },
        { value: "steel", label: "Steel" },
        { value: "dragon", label: "Dragon" },
        { value: "fighting", label: "Fighting" },
        { value: "ghost", label: "Ghost" },
        { value: "ice", label: "Ice" },
        { value: "psychic", label: "Psychic" },
        { value: "water", label: "Water" },
    ].sort((a, b) => a.value.localeCompare(b.value));

    const pokemonTypesSelector = pokemonTypes.map((type) => (
        <option key={type.value} value={type.value}>
            {type.label}
        </option>
    ));

    /**
     * Filters {@link pokemonData} based on user input and/or their selection of the
     * two type selectors.
     *
     * @param t1 Value of the Type 1 Selector
     * @param t2 Value of the Type 2 Selector
     * @param userInput User input from the input field
     *
     * @returns Array of the filtered pokemon data objects
     */
    const filterPokemonData = (t1: string, t2: string, userInput: string) =>
        pokemonData.filter((pokemon) => {
            let dexString = pokemon.dex_number.toString();
            let matchesInputField = isMatchingNameOrDexNum(userInput, pokemon.name, dexString);

            if (t1 === "any" && t2 === "any" && matchesInputField) {
                return true;
            } else if (t1 === "any" && (pokemon.type_2 === null || pokemon.type_2 === t2) && matchesInputField) {
                return true;
            } else if (t2 === "any" && pokemon.type_1 === t1 && matchesInputField) {
                return true;
            } else if (pokemon.type_1 === t1 && pokemon.type_2 === t2 && matchesInputField) {
                return true;
            }

            return false;
        });

    /**
     * Check if user input is a substring of a pokemon's name or dex number.
     *
     * @param userInput User input from the input field
     * @param pokemonName Pokemon name to check user input against
     * @param pokemonDexNum Pokemon dex number to check user input against
     *
     * @returns True if @param userInput is an empty string or substring
     *          of @param pokemonName or @param pokemonDexNum, false otherwise
     */
    const isMatchingNameOrDexNum = (userInput: string, pokemonName: string, pokemonDexNum: string) =>
        userInput === "" || pokemonName.includes(userInput) || pokemonDexNum.includes(userInput);

    useEffect(() => {
        setFilteredPokemon(filterPokemonData(type1, type2, pokemonFilter));
    }, [type1, type2, pokemonFilter]);

    return (
        <div>
            <div className="grid grid-flow-row grid-cols-3 gap-10 mb-4">
                <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pokemon-list-filter-input">
                        Filter By Name or PokeDex Number
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="pokemon-list-filter-input"
                        type="text"
                        placeholder="Enter name or PokeDex Number..."
                        onChange={(e) => setPokemonFilter(e.target.value)}
                    />
                </div>
                <div className="flex flex-row gap-4 justify-end">
                    <div className="flex flex-col">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="pokemon-list-filter-select1"
                        >
                            Type 1
                        </label>
                        <select
                            value={type1}
                            onChange={(e) => setType1(e.target.value)}
                            className="text-gray-700 text-md rounded grow px-2"
                            id="pokemon-list-filter-select1"
                        >
                            {pokemonTypesSelector}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="pokemon-list-filter-select2"
                        >
                            Type 2
                        </label>
                        <select
                            value={type2}
                            onChange={(e) => setType2(e.target.value)}
                            className="text-gray-700 text-md rounded grow px-2"
                            id="pokemon-list-filter-select2"
                        >
                            {pokemonTypesSelector}
                        </select>
                    </div>
                </div>
            </div>
            <p className="mb-3">
                You have caught <strong>{caughtPokemon.length}</strong> out of <strong>{pokemonData.length}</strong>, or{" "}
                <strong>~{((caughtPokemon.length / pokemonData.length) * 100).toFixed(0)}%</strong>
            </p>
            <PokemonList caughtPokemon={caughtPokemon} setCaughtPokemon={setCaughtPokemon} data={filteredPokemon} />
        </div>
    );
};
