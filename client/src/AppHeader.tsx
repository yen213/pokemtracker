import React from "react";
import logoUrl from "./images/poketracker-title.png";

type Props = {};

export const AppHeader = (props: Props) => {
    return (
        <div className="flex justify-center w-full py-1 bg-gradient-to-b from-red-700 to-red-600 shadow-inner shadow-black border-b border-gray-400">
            <img className="w-2/6 py-3 md:py-1 lg:w-1/6" src={logoUrl} alt="" />
        </div>
    );
};
