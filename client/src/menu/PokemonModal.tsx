import { Dispatch, SetStateAction, useState } from "react";
import { addNewPokemon, deletePokemon, updatePokemon } from "../axios/pokemon.api";

import LabelInput from "../input/LabelInput";
import PokemonTypeSelector from "../input/PokemonTypeSelector";

import { PokemonObject } from "../pokemon.type";

type Props = {
    showModal: boolean;
    type: "ADD" | "UPDATE";
    data?: PokemonObject | null;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setPokemonList: Dispatch<SetStateAction<Array<PokemonObject>>>;
};

/**
 * Component to render a modal for admins to add, update, or delete a
 * Pokemon from the database
 */
const PokemonModal = ({ showModal, type, data, setShowModal, setPokemonList }: Props) => {
    const [pokemonName, setPokemonName] = useState(data?.name || "");
    const [dexNumber, setDexNumber] = useState(data?.dex_number || null);
    const [type1, setType1] = useState(data?.type_1 || "any");
    const [type2, setType2] = useState(data?.type_2 || "any");
    const [imageUrl, setImageUrl] = useState(data?.image_url || "");

    /**
     * Since the Update/Add button are conditionally rendered, we
     * use this to make sure we are calling the right API with the
     * right button
     */
    const callTypeFunction = () => {
        if (type === "ADD") {
            addPokemonToDB();
        } else {
            updatePokemonFromDB();
        }
    };

    // Calls API to add Pokemon to the DB and update the list state
    const addPokemonToDB = async () => {
        if (dexNumber === null) {
            return;
        }

        const pokemon: PokemonObject = {
            name: pokemonName,
            dex_number: dexNumber,
            type_1: type1,
            type_2: type2 === "any" ? null : type2,
            image_url: imageUrl,
        };

        const res = await addNewPokemon(pokemon);
        const newPokemon: PokemonObject = res.data.pokemon;

        if (res.status == 200 && newPokemon != null) {
            setPokemonList((prev) => [...prev, newPokemon]);
            setShowModal(false);
        }
    };

    // Calls API to update Pokemon from the DB and update the list state
    const updatePokemonFromDB = async () => {
        if (dexNumber === null) {
            return;
        }

        const pokemon: PokemonObject = {
            name: pokemonName,
            dex_number: dexNumber,
            type_1: type1,
            type_2: type2 === "any" ? null : type2,
            image_url: imageUrl,
        };

        const res = await updatePokemon(pokemon);
        const updatedPokemon: PokemonObject = res.data.pokemon;

        if (res.status == 200 && updatedPokemon != null) {
            setPokemonList((prev) =>
                prev.map((p) => {
                    if (p.id === updatedPokemon.id) {
                        return updatedPokemon;
                    }

                    return p;
                })
            );
            setShowModal(false);
        }
    };

    // Calls API to delete Pokemon from the DB and update the list state
    const deletePokemonFromDB = async () => {
        if (dexNumber !== null) {
            const res = await deletePokemon(dexNumber);
            const deletedPokemon: PokemonObject = res.data.pokemon;

            if (res.status == 200 && deletedPokemon != null) {
                setPokemonList((prev) => prev.filter((p) => p.dex_number !== deletedPokemon.dex_number));
                setShowModal(false);
            }
        }
    };

    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 items-center">
                    <div className="relative transform overflow-hidden rounded-lg bg-gray-300 shadow-xl transition-all my-8 max-w-lg">
                        <div className="bg-gray-300 px-6 pt-4 pb-6">
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-4 mb-3 justify-center">
                                    <LabelInput
                                        id="new_pokemon_name"
                                        label="Pokemon Name"
                                        value={pokemonName}
                                        setValue={setPokemonName}
                                    />
                                    <LabelInput
                                        id="new_pokemon_dex_number"
                                        label="Dex Number"
                                        inputType="number"
                                        value={dexNumber}
                                        setValue={setDexNumber}
                                    />
                                </div>
                                <div className="flex flex-row gap-4 justify-center mb-3">
                                    <PokemonTypeSelector
                                        id="new_pokemon_type1"
                                        label="Type 1"
                                        value={type1}
                                        setValue={setType1}
                                    />
                                    <PokemonTypeSelector
                                        id="new_pokemon_type2"
                                        label="Type 2"
                                        value={type2}
                                        setValue={setType2}
                                    />
                                </div>
                                <div>
                                    <LabelInput
                                        id="new_pokemon_image_url"
                                        label="Image URL"
                                        value={imageUrl}
                                        setValue={setImageUrl}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex rounded-md bg-gray-50 justify-center w-full py-5 gap-3 btn-group">
                            <button
                                onClick={callTypeFunction}
                                type="button"
                                className="btn w-1/4 px-4 py-2 text-sm font-semibold text-neutral-600 bg-cyan-400 rounded-md hover:bg-cyan-500 hover:text-neutral-800 focus:text-neutral-800"
                            >
                                {type}
                            </button>
                            {type !== "ADD" && (
                                <button
                                    onClick={deletePokemonFromDB}
                                    type="button"
                                    className="btn w-1/4 px-4 py-2 text-sm font-semibold text-gray-50 bg-red-600 rounded-md hover:bg-red-700 hover:text-neutral-700 focus:text-neutral-700"
                                >
                                    DELETE
                                </button>
                            )}
                            <button
                                onClick={() => setShowModal(!showModal)}
                                type="button"
                                className="btn w-1/4 px-4 py-2 text-sm font-semibold text-neutral-700 bg-amber-400 rounded-md hover:bg-amber-500 hover:text-neutral-900 focus:text-neutral-900"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonModal;
