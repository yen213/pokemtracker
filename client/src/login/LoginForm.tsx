import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import EyeIcon from "../icons/EyeIcon";
import LockIcon from "../icons/LockIcon";
import LoginIcon from "../icons/LoginIcon";
import Toast from "../toast/Toast";

import { loginUser } from "../axios/user.api";
import { AppContextValue, useData } from "../App.context";

// Renders the form for the login page
const LoginForm = () => {
    // App context
    const { setIsUserLoggedIn }: AppContextValue = useData();

    // Component states
    const [viewPassword, setViewPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    // Router-dom navigator hook
    const navigate = useNavigate();

    // Logs in a user to the app and routes them to the home page
    const login = async (e: React.MouseEvent) => {
        e.preventDefault();

        // Make sure both fields has values
        if (email.trim().length === 0 || password.trim().length === 0) {
            if (email.trim().length === 0) {
                setIsEmailValid(false);
            }

            if (password.trim().length === 0) {
                setIsPasswordValid(false);
            }

            return;
        }

        await loginUser({ username: email.trim(), password: password.trim() }).then(
            () => {
                setIsUserLoggedIn(true);
                navigate("/");
            },
            (err) => {
                setErrorMessage(err.response.data.message);
                setShowError(true);
            }
        );
    };

    return (
        <div className="flex place-items-center antialiased font-open-sans bg-gradient-to-b from-sky-100 to-sky-300 to-sky-400 min-h-screen">
            <div className="flex flex-col mx-auto items-center w-full md:w-3/5 lg:w-4/6">
                <form className="flex flex-col lg:w-1/2 w-8/12">
                    <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded pr-10 mb-5">
                        <div className="flex -mr-px justify-center w-15 p-4">
                            <LoginIcon />
                        </div>
                        <input
                            onChange={(e) => {
                                setIsEmailValid(true);
                                setEmail(e.target.value);
                            }}
                            value={email}
                            type="text"
                            className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative sm:text-lg md:text-xl outline-none"
                            placeholder="Email"
                            autoComplete="username"
                        />
                    </div>
                    {!isEmailValid && <p className="text-red-500 text-sm italic -mt-3 mb-5">Field is required</p>}
                    <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded">
                        <div className="flex -mr-px justify-center w-15 p-4">
                            <LockIcon />
                        </div>
                        <input
                            onChange={(e) => {
                                setIsPasswordValid(true);
                                setPassword(e.target.value);
                            }}
                            value={password}
                            type={`${viewPassword ? "text" : "password"}`}
                            className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center sm:text-lg md:text-xl outline-none"
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                        <div
                            onClick={() => setViewPassword(!viewPassword)}
                            className="flex self-center mr-2 hover:cursor-pointer"
                        >
                            <EyeIcon />
                        </div>
                    </div>
                    {!isPasswordValid && <p className="text-red-500 text-sm italic mt-2">Field is required</p>}
                    <hr className="my-7" />
                    <Link to="/" onClick={(e) => login(e)} type="submit">
                        <p className="bg-neutral-600 text-center py-4 text-gray-50 hover:bg-neutral-700 hover:text-gray-100 active:bg-neutral-700 rounded tracking-wider sm:text-lg md:text-xl">
                            Login
                        </p>
                    </Link>
                </form>
            </div>
            {showError && <Toast type="ERROR" message={errorMessage} closeToast={() => setShowError(false)} />}
        </div>
    );
};

export default LoginForm;
