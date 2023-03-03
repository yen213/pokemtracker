import { useState } from "react";
import { Link } from "react-router-dom";

import EyeIcon from "../icons/EyeIcon";
import LockIcon from "../icons/LockIcon";
import LoginIcon from "../icons/LoginIcon";

const LoginForm = () => {
    const [viewPassword, setViewPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex place-items-center antialiased font-open-sans bg-gradient-to-b from-sky-100 to-sky-300 to-sky-400 min-h-screen">
            <div className="flex flex-col mx-auto items-center w-full md:w-3/5 lg:w-4/6">
                <form className="flex flex-col lg:w-1/2 w-8/12">
                    <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg-white items-center rounded mb-6 pr-10">
                        <div className="flex -mr-px justify-center w-15 p-4">
                            <LoginIcon iconColor="text-neutral-600" />
                        </div>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            type="text"
                            className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative sm:text-lg md:text-xl outline-none"
                            placeholder="Username"
                            autoComplete="username"
                        />
                    </div>
                    <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded">
                        <div className="flex -mr-px justify-center w-15 p-4">
                            <LockIcon />
                        </div>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type={`${viewPassword ? "text" : "password"}`}
                            className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center sm:text-lg md:text-xl outline-none"
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                        />
                        <div
                            onClick={() => setViewPassword(!viewPassword)}
                            className="flex self-center mr-2 hover:cursor-pointer"
                        >
                            <EyeIcon />
                        </div>
                    </div>
                    <hr className="my-7" />
                    <Link to="/" onClick={() => console.log(username + password)} type="submit">
                        <p className="bg-neutral-600 text-center py-4 text-white hover:bg-neutral-500 active:bg-neutral-700 rounded tracking-wider sm:text-lg md:text-xl">
                            Login
                        </p>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
