import { useState } from "react";
import { Link } from "react-router-dom";

import LoginIcon from "../icons/LoginIcon";
import LogoutIcon from "../icons/LogoutIcon";
import PlusIcon from "../icons/PlusIcon";
import PokemonModal from "./PokemonModal";
import Toast from "../toast/Toast";

import { logoutUser } from "../axios/user.api";
import { AppContextValue, useData } from "../App.context";

// Component for rendering the floating menu icon on the home page of the app
const FloatingMenu = () => {
    // App context
    const { isUserLoggedIn, setIsUserLoggedIn }: AppContextValue = useData();

    // Component state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAPiMessage, setShowAPiMessage] = useState(false);
    const [apiMessage, setApiMessage] = useState("");
    const [apiMessageType, setApiMessageType] = useState<"SUCCESS" | "ERROR">("SUCCESS");

    // Logs out the user and deletes their session
    const logout = async () => {
        await logoutUser().then(
            (res) => {
                setIsUserLoggedIn(false);
                setApiMessage(res.data.message);
                setShowAPiMessage(true);
                setApiMessageType("SUCCESS");
            },
            (err) => {
                setApiMessage(err.response.data.message);
                setShowAPiMessage(true);
                setApiMessageType("ERROR");
            }
        );
    };

    return (
        <div className="group fixed bottom-0 right-0 p-5 flex items-end justify-end w-24 h-24 cursor-pointer">
            <div className="flex items-center justify-center p-3 rounded-full bg-neutral-600 group-hover:bg-neutral-700 z-50 absolute">
                <PlusIcon iconClass="h-8 w-8 text-gray-50 group-hover:text-gray-300 group-hover:rotate-45 transition-all duration-[0.3s]" />
            </div>
            <div className="absolute rounded-full transition-all duration-[0.2s] ease scale-y-0 group-hover:scale-y-100 group-hover:-translate-y-32 flex p-2 hover:p-3 bg-gray-50 scale-100 hover:bg-gray-50">
                {isUserLoggedIn && <LogoutIcon onClick={logout} />}
                {!isUserLoggedIn && (
                    <Link to="/login">
                        <LoginIcon isMenuIcon={true} />
                    </Link>
                )}
            </div>
            <div
                onClick={() => setShowAddModal(true)}
                className="absolute rounded-full transition-all duration-[0.2s] ease scale-y-0 group-hover:scale-y-100 group-hover:-translate-y-16 flex p-2 hover:p-3 bg-gray-50 scale-100 hover:bg-gray-50"
            >
                <PlusIcon iconClass="h-8 w-8 text-neutral-600 hover:text-neutral-800" />
            </div>
            {showAddModal && <PokemonModal type="ADD" showModal={showAddModal} setShowModal={setShowAddModal} />}
            {showAPiMessage && (
                <Toast type={apiMessageType} message={apiMessage} closeToast={() => setShowAPiMessage(false)} />
            )}
        </div>
    );
};

export default FloatingMenu;
