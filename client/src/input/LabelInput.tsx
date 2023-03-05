import { Dispatch, SetStateAction } from "react";

type Props = {
    label: string;
    id: string;
    inputType?: string;
    placeholder?: string;
    value: string | number | null;
    setValue: Dispatch<SetStateAction<any>>;
};

// Component for rendering an input element with a label
const LabelInput = ({ label, id, inputType = "text", placeholder, value, setValue }: Props) => {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                onChange={(e) => {
                    if (inputType === "number") {
                        if (e.target.value === "") {
                            setValue(0);
                        } else {
                            setValue(e.target.valueAsNumber);
                        }
                    } else {
                        setValue(e.target.value);
                    }
                }}
                value={value === null ? "" : value}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={id}
                type={inputType}
                placeholder={placeholder}
            />
        </div>
    );
};

export default LabelInput;
