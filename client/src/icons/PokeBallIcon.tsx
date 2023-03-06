import { useState } from "react";

type Props = {
    isCaught: boolean;
};

export default function PokeBallIcon({ isCaught }: Props) {
    const [isHovered, setIsHovered] = useState(false); // Draws the red color on top part of caught Pokeballs

    return (
        <svg
            onClick={(e) => {
                if (isCaught) {
                    e.currentTarget.classList.add("hover:animate-catching-rotate");
                    e.currentTarget.classList.remove("animate-jump");
                } else {
                    e.currentTarget.classList.add("animate-jump");
                    e.currentTarget.classList.remove("hover:animate-catching-rotate");
                }
            }}
            onMouseEnter={(e) => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`hover:animate-catching-rotate`}
            version="1.1"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            aria-labelledby="title001 desc001"
            role="button"
        >
            <path
                className="fill-gray-50"
                stroke="#000"
                strokeWidth="2"
                strokeMiterlimit="10"
                d="M24 12.5C24 18.85 18.85 24 12.5 24c-4.92 0-9.11-3.09-10.75-7.42l8.57-3.29c.31.9 1.17 1.54 2.18 1.54 1.28 0 2.33-1.05 2.33-2.33 0-.31-.061-.6-.17-.88l8.55-3.3c.51 1.3.79 2.7.79 4.18z"
            ></path>
            <path
                className={`${isCaught ? "fill-red-500" : "fill-gray-50"}${isHovered ? " fill-red-500 " : ""}`}
                stroke="#000"
                strokeWidth="2"
                strokeMiterlimit="10"
                d="M23.21 8.32l-8.55 3.3a2.349 2.349 0 0 0-2.16-1.45c-1.28 0-2.33 1.05-2.33 2.33 0 .28.05.54.15.79l-8.57 3.29C1.26 15.31 1 13.94 1 12.5 1 6.15 6.15 1 12.5 1c4.88 0 9.05 3.04 10.71 7.32z"
            ></path>
            <path
                className="fill-gray-50"
                d="M14.83 12.5c0 1.28-1.05 2.33-2.33 2.33-1.01 0-1.87-.64-2.18-1.54-.1-.25-.15-.51-.15-.79 0-1.28 1.05-2.33 2.33-2.33.98 0 1.81.61 2.16 1.45.11.28.17.57.17.88z"
            ></path>
        </svg>
    );
}
