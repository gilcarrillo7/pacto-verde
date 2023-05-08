import React from "react";
import { useInView } from "react-intersection-observer";

const HeaderText = ({
	text,
	className,
}: {
	text: string;
	className?: string;
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<h1
			ref={ref}
			className={`${className} text-pinkpv text-3xl sm:text-4xl lg:text-5xl my-4 sm:mt-8 sm:mb-16 transition-all duration-1000 ease-in-out ${
				inView ? "" : "-translate-x-12"
			}`}
		>
			{text}
		</h1>
	);
};

export default HeaderText;
