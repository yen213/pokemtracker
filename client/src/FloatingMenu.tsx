import { useState } from "react";
import { Link } from "react-router-dom";

import AddPokemonModal from "./AddPokemonModal";
import LoginIcon from "./icons/LoginIcon";
import PlusIcon from "./icons/PlusIcon";

// Component for rendering the floating menu icon on the home page of the app
const FloatingMenu = () => {
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="group fixed bottom-0 right-0 p-5 flex items-end justify-end w-24 h-24 cursor-pointer">
            <div className="flex items-center justify-center p-3 rounded-full bg-neutral-600 group-hover:bg-neutral-700 z-50 absolute">
                <PlusIcon iconClass="h-8 w-8 text-gray-50 group-hover:text-gray-300 group-hover:rotate-45 transition-all duration-[0.3s]" />
            </div>
            <Link
                className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-y-0 group-hover:scale-y-100 group-hover:-translate-y-32 flex p-2 hover:p-3 bg-gray-50 scale-100 hover:bg-gray-50"
                to="/login"
            >
                <LoginIcon isMenuIcon={true} />
            </Link>
            <div
                onClick={() => setShowAddModal(true)}
                className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-y-0 group-hover:scale-y-100 group-hover:-translate-y-16 flex p-2 hover:p-3 bg-gray-50 scale-100 hover:bg-gray-50"
            >
                <PlusIcon iconClass="h-8 w-8 text-neutral-600 hover:text-neutral-800" />
            </div>
            {showAddModal && <AddPokemonModal showModal={showAddModal} setShowModal={setShowAddModal} />}
        </div>
    );
};

export default FloatingMenu;
