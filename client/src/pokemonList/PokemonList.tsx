import PokeBallIcon from "../icons/PokeBallIcon";
import pokemonType from "../styles/pokemon-types.module.css";

// Custom type for the list of Pokemon objects
type PokemonData = {
    name: string;
    dex_number: number;
    type_1: string;
    type_2: string | null;
    image_url: string;
};

type Props = {
    data: Array<PokemonData>;
    caughtPokemon: Array<number>;
    setCaughtPokemon: React.Dispatch<React.SetStateAction<Array<number>>>;
};

const PokemonList = ({ data, caughtPokemon, setCaughtPokemon }: Props) => {
    const pokemon = data.map((p) => {
        let isCaught = caughtPokemon.includes(p.dex_number);

        return (
            <li
                key={p.dex_number}
                className={`flex place-items-center bg-gray-100 rounded-lg w-full p-2${
                    isCaught ? " bg-green-500" : ""
                }`}
            >
                <div
                    className="w-2/12 flex justify-center items-center"
                    onClick={() =>
                        setCaughtPokemon((prev) => {
                            if (isCaught) {
                                return prev.filter((num) => num !== p.dex_number);
                            }

                            return [...prev, p.dex_number];
                        })
                    }
                >
                    <PokeBallIcon isCaught={isCaught} />
                </div>
                <div className="w-10/12 flex place-items-center flex-col">
                    <p className="font-bold">{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</p>
                    <p className="font-bold">#{p.dex_number}</p>
                    <img src={p.image_url} />
                    <div>
                        <div className={`${pokemonType["type-icon"]} ${pokemonType[p.type_1]} mr-1`}></div>
                        {p.type_2 != null && (
                            <div className={`${pokemonType["type-icon"]} ${pokemonType[p.type_2]}`}></div>
                        )}
                    </div>
                </div>
            </li>
        );
    });

    return <ul className="grid grid-cols-1 justify-items-center md:grid-cols-3 md:gap-4">{pokemon}</ul>;
};

export default PokemonList;
