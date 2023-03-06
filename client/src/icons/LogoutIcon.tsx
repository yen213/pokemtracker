type Props = {
    onClick: React.MouseEventHandler;
};

const LogoutIcon = ({ onClick }: Props) => {
    return (
        <svg
            onClick={onClick}
            className="h-8 w-8 text-neutral-500 cursor-pointer hover:text-neutral-800"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" /> <path d="M7 6a7.75 7.75 0 1 0 10 0" />{" "}
            <line x1="12" y1="4" x2="12" y2="12" />
        </svg>
    );
};

export default LogoutIcon;
