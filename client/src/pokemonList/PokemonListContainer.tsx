import { useEffect, useState } from "react";

import LabelInput from "../input/LabelInput";
import PokemonList from "./PokemonList";
import PokemonModal from "../menu/PokemonModal";
import PokemonTypeSelector from "../input/PokemonTypeSelector";

import { AppContextValue, useData } from "../App.context";
import { PokemonObject } from "../pokemon.type";

// Wraps and renders the Pokemon search components, the Pokemon list
// and the Pokemon add, update, and delete modal
export const PokemonListContainer = () => {
    // App context
    const { isUserLoggedIn, pokemonList, caughtPokemon, setFilteredPokemonList }: AppContextValue = useData();

    // Component states
    const [modalData, setModalData] = useState<PokemonObject | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [inputFilter, setInputFilter] = useState("");
    const [type1, setType1] = useState("any");
    const [type2, setType2] = useState("any");
    const [showCaught, setShowCaught] = useState(false);

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

    /**
     * Open the modal with the clicked Pokemon object. Only
     * applicable for logged in Admin users
     *
     * @param pokemon Pokemon object to update/delete from the DB
     */
    const onPokemonClick = (pokemon: PokemonObject) => {
        if (isUserLoggedIn) {
            setModalData(pokemon);
            setShowModal(true);
        }
    };

    // Update the filtered list
    useEffect(() => {
        setFilteredPokemonList(filterPokemonData(type1, type2, inputFilter));
        // Filter to show caught pokemon
        if (caughtPokemon.length > 0 && showCaught) {
            const caughtSet = new Set(caughtPokemon);
            const caughtFilter = pokemonList.filter((p) => caughtSet.has(p.dex_number));

            setFilteredPokemonList(caughtFilter);
        }
    }, [type1, type2, inputFilter, pokemonList, showCaught]);

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
            <div className="flex justify-between w-full mt-5">
                <p className="mb-3">
                    You have caught <strong>{caughtPokemon.length}</strong> out of <strong>{pokemonList.length}</strong>
                    , or
                    <strong>~{((caughtPokemon.length / pokemonList.length) * 100).toFixed(0)}%</strong>
                </p>
                <div className="flex items-center mb-4">
                    <label
                        htmlFor="pokemon-list-show-caught"
                        className="block text-gray-700 text-sm font-semibold mr-2"
                    >
                        Show Caught
                    </label>
                    <input
                        id="pokemon-list-show-caught"
                        onChange={() => setShowCaught(!showCaught)}
                        type="checkbox"
                        className="w-4 h-4 rounded"
                    />
                </div>
            </div>
            <PokemonList onPokemonClick={onPokemonClick} />
            {showModal && (
                <PokemonModal type="UPDATE" data={modalData} showModal={showModal} setShowModal={setShowModal} />
            )}
        </div>
    );
};
