import { Dispatch, SetStateAction } from "react";

type Props = {
    label: string;
    id: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
};

// Component to render the selector for selecting Pokemon types
const PokemonTypeSelector = ({ label, id, value, setValue }: Props) => {
    // I could have sorted this manually but felt a little lazy
    const PokemonTypes = [
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

    // Map the Pokemon types to the selector options
    const pokemonTypesSelector = PokemonTypes.map((type) => (
        <option className="cursor-pointer" key={type.value} value={type.value}>
            {type.label}
        </option>
    ));

    return (
        <div className="flex flex-col w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="text-gray-700 text-md rounded px-2 py-2 focus:outline-none focus:shadow-outline cursor-pointer"
                id={id}
            >
                {pokemonTypesSelector}
            </select>
        </div>
    );
};

export default PokemonTypeSelector;
