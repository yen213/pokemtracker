import { useEffect, useState } from "react";

import FloatingMenu from "./menu/FloatingMenu";

import { getPokemonList } from "./axios/pokemon.api";
import { pokemonData } from "./data/pokemon";
import { AppHeader } from "./AppHeader";
import { PokemonListContainer } from "./pokemonList/PokemonListContainer";

// Renders the main page of the application
const HomePage = () => {
    const [pokemonList, setPokemonList] = useState(pokemonData); // DB list

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

    return (
        <div className="antialiased font-open-sans bg-gradient-to-b from-sky-100 to-sky-300 to-sky-400 min-h-screen">
            <AppHeader />
            <div className="mx-auto py-5 w-3/6 flex flex-col gap-3">
                <h2 className="font-bold text-2xl">Welcome to the PokeTracker!</h2>
                <p>
                    Here is where you will be able to see which Pokemon you have left to catch on your way to completing
                    the dex!
                </p>
                <p>All you have to do is click the Poke Ball icon to set a Pokemon as caught or uncaught.</p>
                <p>Use the search box below to search by a Pokemon's name or dex number.</p>
                <PokemonListContainer pokemonList={pokemonList} setPokemonList={setPokemonList} />
                <FloatingMenu setPokemonList={setPokemonList} />
            </div>
        </div>
    );
};

export default HomePage;
