import { useEffect, useState } from "react";

import LabelInput from "../input/LabelInput";
import PokemonList from "./PokemonList";
import PokemonTypeSelector from "../input/PokemonTypeSelector";

import { getPokemonList } from "../axios/pokemon.api";
import { pokemonData } from "../data/pokemon";

// Wraps and renders the Pokemon search components and the Pokemon list
export const PokemonListContainer = () => {
    const [pokemonList, setPokemonList] = useState(pokemonData); // DB list
    const [filteredList, setFilteredList] = useState(pokemonData); // Filtered list
    const [inputFilter, setInputFilter] = useState("");
    const [caughtPokemon, setCaughtPokemon] = useState<Array<number>>([]);
    const [type1, setType1] = useState("any");
    const [type2, setType2] = useState("any");

    // Load the list of Pokemon from the database
    useEffect(() => {
        const getList = async () => {
            const res = await getPokemonList();
            const list = res.data.list;

            if (res.status === 200 && list != null && list.length > 0) {
                console.log(list);
                setPokemonList(list);
            }
        };

        getList();
    }, []);

    /**
     * Filters {@link pokemonList} based on user input and/or their selection of the
     * two type selectors.
     *
     * @param t1 Value of the Type 1 Selector
     * @param t2 Value of the Type 2 Selector
     * @param userInput User input from the name/dex_number input field
     */
    const filterPokemonData = (t1: string, t2: string, userInput: string) =>
        pokemonList.filter((pokemon) => {
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
        setFilteredList(filterPokemonData(type1, type2, inputFilter));
    }, [type1, type2, inputFilter]);

    return (
        <div>
            <div className="flex gap-10 mb-4 justify-between">
                <div className="w-2/4">
                    <LabelInput
                        id="pokemon-list-filter-input"
                        label="Filter By Name or PokeDex Number"
                        value={inputFilter}
                        setValue={setInputFilter}
                        placeholder="Enter name or PokeDex Number..."
                    />
                </div>
                <div className="flex flex-row gap-4">
                    <PokemonTypeSelector
                        label="Type 1"
                        id="pokemon-list-filter-select1"
                        value={type1}
                        setValue={setType1}
                    />
                    <PokemonTypeSelector
                        label="Type 2"
                        id="pokemon-list-filter-select2"
                        value={type2}
                        setValue={setType2}
                    />
                </div>
            </div>
            <p className="mb-3">
                You have caught <strong>{caughtPokemon.length}</strong> out of <strong>{pokemonList.length}</strong>, or{" "}
                <strong>~{((caughtPokemon.length / pokemonList.length) * 100).toFixed(0)}%</strong>
            </p>
            <PokemonList caughtPokemon={caughtPokemon} setCaughtPokemon={setCaughtPokemon} data={filteredList} />
        </div>
    );
};
