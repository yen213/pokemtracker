import { MouseEventHandler, useEffect } from "react";

import PlusIcon from "../icons/PlusIcon";

type Props = {
    message: string;
    type: "SUCCESS" | "ERROR";
    closeToast: MouseEventHandler;
};

// Renders a Toast message. Currently used to display API response/error message
const Toast = ({ message, type, closeToast }: Props) => {
    // Automatically close modal for success types
    useEffect(() => {
        let timer: number | null | undefined = null;

        if (type === "SUCCESS") {
            timer = setTimeout(closeToast, 2 * 1000);
        }

        return () => {
            if (timer != null) {
                clearTimeout(timer);
            }
        };
    }, []);

    return (
        <div
            className={`${
                type === "SUCCESS" ? "text-green-500" : "text-red-300"
            } flex justify-between items-center ease-in-out duration-300 z-50 fixed m-auto bottom-20 left-0 right-0 max-w-lg p-4 bg-gray-700 rounded-lg shadow`}
            role="alert"
        >
            <p className="mr-6 text-md font-semibold tracking-wider leading-6 break-all cursor-default">{message}</p>
            <button
                onClick={closeToast}
                type="button"
                className="bg-gray-50 hover:bg-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5"
            >
                <PlusIcon iconClass="w-5 h-5 rotate-45 text-red-500 hover:text-red-700" />
            </button>
        </div>
    );
};

export default Toast;
