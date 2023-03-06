import { useEffect } from "react";

import FloatingMenu from "./menu/FloatingMenu";

import { getLoggedInUser } from "./axios/user.api";
import { getPokemonList } from "./axios/pokemon.api";
import { AppContextValue, useData } from "./App.context";
import { AppHeader } from "./AppHeader";
import { PokemonListContainer } from "./pokemonList/PokemonListContainer";

// Renders the main page of the application
const HomePage = () => {
    // App context
    const { setPokemonList, setFilteredPokemonList, setIsUserLoggedIn }: AppContextValue = useData();

    // Load the list of Pokemon from the database and check session
    // to see if a user is logged in
    useEffect(() => {
        const getList = async () => {
            await getPokemonList().then(
                (res) => {
                    const list = res.data.list;

                    if (list.length > 0) {
                        setPokemonList(list);
                        setFilteredPokemonList(list);
                    }
                },
                (err) => console.log(err)
            );
        };

        const getUser = async () => {
            await getLoggedInUser().then(
                () => setIsUserLoggedIn(true),
                (err) => console.log(err)
            );
        };

        getList();
        getUser();
    }, []);

    return (
        <div className="antialiased font-open-sans bg-gradient-to-b from-sky-100 to-sky-300 to-sky-400 min-h-screen">
            <AppHeader />
            <div className="mx-auto py-5 flex flex-col gap-3 w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 text-sm md:text-base">
                <h2 className="font-bold text-xl md:text-2xl">Welcome to the PokeTracker!</h2>
                <p>
                    Here is where you will be able to see which Pokemon you have left to catch on your way to completing
                    the dex!
                </p>
                <p>All you have to do is click the Poke Ball icon to set a Pokemon as caught or uncaught.</p>
                <p>Use the search box below to search by a Pokemon's name or dex number.</p>
                <PokemonListContainer />
                <FloatingMenu />
            </div>
        </div>
    );
};

export default HomePage;
