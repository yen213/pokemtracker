import React from "react";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import { pokemonData } from "./data/pokemon";
import { PokemonObject } from "./pokemon.type";

// Define the App's main state data and their setters
export type AppContextValue = {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: Dispatch<SetStateAction<boolean>>;
    pokemonList: PokemonObject[];
    setPokemonList: Dispatch<SetStateAction<PokemonObject[]>>;
    filteredPokemonList: PokemonObject[];
    setFilteredPokemonList: Dispatch<SetStateAction<PokemonObject[]>>;
    caughtPokemon: number[];
    setCaughtPokemon: Dispatch<SetStateAction<number[]>>;
};

// Initializes the context provider for the app and function
// retrieve context value from Context Provider
export const createAppContext = (): [Function, React.Provider<AppContextValue>] => {
    const context = createContext<AppContextValue>({
        isUserLoggedIn: false,
        setIsUserLoggedIn: () => {},
        pokemonList: [],
        setPokemonList: () => {},
        filteredPokemonList: [],
        setFilteredPokemonList: () => {},
        caughtPokemon: [],
        setCaughtPokemon: () => {},
    });

    const c = () => useContext(context);

    return [c, context.Provider];
};

// Get the Context and Provider
const [useAppData, CtxProvider] = createAppContext();

// Custom hook to consume the app Context
export { useAppData as useData };

// Creates the Context Provider
export const AppContext = ({ children }: { children: React.ReactNode }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [pokemonList, setPokemonList] = useState(pokemonData);
    const [filteredPokemonList, setFilteredPokemonList] = useState<PokemonObject[]>(pokemonData);
    const [caughtPokemon, setCaughtPokemon] = useState<number[]>([]);

    return (
        <CtxProvider
            value={{
                isUserLoggedIn,
                setIsUserLoggedIn,
                pokemonList,
                setPokemonList,
                filteredPokemonList,
                setFilteredPokemonList,
                caughtPokemon,
                setCaughtPokemon,
            }}
        >
            {children}
        </CtxProvider>
    );
};
