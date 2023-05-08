import React from "react";

interface IProps {
	text: string;
	variant: string;
	action?: () => void;
	disabled?: boolean;
	classname?: string;
	size?: string;
}

const Button = ({
	text,
	variant,
	action,
	disabled,
	classname,
	size = "sm",
}: IProps) => {
	return (
		<>
			{variant === "pink" && (
				<button
					className={`${classname} w-full border-solid rounded-full bg-pinkpv border-pinkpv text-lg p-2 font-medium text-white button-gradient hover:text-white hover:border-white ${
						size === "lg" ? "h-[70px] sm:w-60 lg:w-72 lg:px-4" : "sm:w-52"
					}`}
					onClick={action}
				>
					{text}
				</button>
			)}
			{variant === "pinkwhite" && (
				<button
					className="w-full sm:w-52 border-2 border-solid rounded-full bg-transparent border-pinkpv text-lg p-2 font-medium text-pinkpv hover:text-white hover:border-pinkpv hover:bg-pinkpv"
					onClick={action}
				>
					{text}
				</button>
			)}
			{variant === "transparent" && (
				<button
					className="w-full sm:w-52 border-solid border-2 rounded-full text-lg p-2 font-medium text-white hover:bg-white hover:text-pinkpv hover:border-white"
					onClick={action}
				>
					{text}
				</button>
			)}
			{variant === "transparentpink" && (
				<button
					className="w-full sm:w-52 border-solid border-2 rounded-full text-lg p-2 font-medium text-white hover:bg-pinkpv hover:text-white hover:border-pinkpv"
					onClick={action}
				>
					{text}
				</button>
			)}
			{variant === "green" && (
				<button
					className="w-full sm:w-52 border-solid border border-green1 text-lg p-2 font-medium text-green1 hover:bg-green1 hover:text-white hover:border-green1"
					onClick={action}
					disabled={disabled}
				>
					{text}
				</button>
			)}
		</>
	);
};

export default Button;
