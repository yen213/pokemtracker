import FloatingMenu from "./menu/FloatingMenu";

import { AppHeader } from "./AppHeader";
import { PokemonListContainer } from "./pokemonList/PokemonListContainer";

// Renders the main page of the application
const HomePage = () => {
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
                <PokemonListContainer />
                <FloatingMenu />
            </div>
        </div>
    );
};

export default HomePage;
