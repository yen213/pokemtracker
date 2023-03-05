import { Dispatch, SetStateAction, useState } from "react";

import LabelInput from "../input/LabelInput";
import PokemonTypeSelector from "../input/PokemonTypeSelector";

type Props = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

/**
 * Component to render a modal for admins to add a Pokemon to the DB.
 * Can be slightly refactored to be reuseable but for the purpose of
 * this assignment, it is fine like this.
 */
const AddPokemonModal = ({ showModal, setShowModal }: Props) => {
    const [pokemonName, setPokemonName] = useState("");
    const [dexNumber, setDexNumber] = useState(null);
    const [type1, setType1] = useState("any");
    const [type2, setType2] = useState("any");
    const [imageUrl, setImageUrl] = useState("");

    // TODO: Calls API to add pokemon to the DB
    const addPokemonToDB = () => {
        const pokemon = {
            name: pokemonName,
            dex_number: dexNumber,
            type_1: type1,
            type_2: type2 === "any" ? null : type2,
            image_url: imageUrl,
        };

        console.log(pokemon);
    };

    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-gray-300 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-gray-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                                <div className="flex flex-row gap-4 justify-center px-2 mb-3">
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
                                <div className="px-2">
                                    <LabelInput
                                        id="new_pokemon_image_url"
                                        label="Image URL"
                                        value={imageUrl}
                                        setValue={setImageUrl}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex rounded-md shadow-sm bg-gray-50 justify-center w-full py-4 gap-3 btn-group">
                            <button
                                onClick={addPokemonToDB}
                                type="button"
                                className="btn w-1/4 px-4 py-2 text-sm font-semibold text-neutral-600 bg-transparent border border-neutral-600 rounded-md hover:bg-neutral-600 hover:text-gray-50 focus:z-10 focus:ring-2 focus:ring-text-gray-50 focus:bg-text-gray-50 focus:text-text-gray-50"
                            >
                                ADD
                            </button>
                            <button
                                onClick={() => setShowModal(!showModal)}
                                type="button"
                                className="btn w-1/4 px-4 py-2 text-sm font-semibold text-neutral-600 bg-transparent border border-neutral-600 rounded-md hover:bg-neutral-600 hover:text-gray-50 focus:z-10 focus:ring-2 focus:ring-text-gray-50 focus:bg-text-gray-50 focus:text-text-gray-50"
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

export default AddPokemonModal;
