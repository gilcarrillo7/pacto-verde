import { navigate } from "gatsby";
import React from "react";
import { useInView } from "react-intersection-observer";

import Button from "./Button";
import ImageApi from "./ImageApi";

export interface IThumbProps {
	image;
	title: string;
	summary?: string;
	subsummary?: string;
	buttonText: string;
	url: string;
	idImage?: number;
}

const ThumbArticle = ({
	image,
	title,
	summary,
	subsummary,
	buttonText,
	url,
	idImage,
}: IThumbProps) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	const clickButton = () => {
		if (url.includes("http")) {
			window.open(url);
			if (typeof window !== "undefined")
				window.gtag("event", "click_button_resource", {
					event_category: "click",
					event_label: title,
					value: title,
				});
		} else {
			navigate(url);
			if (typeof window !== "undefined")
				window.gtag("event", "click_button_article", {
					event_category: "click",
					event_label: title,
					value: title,
				});
		}
	};
	return (
		<div
			ref={ref}
			className={`relative w-full sm:h-full sm:pb-16 mb-12 sm:mb-4 transition duration-500 ease-in-out ${
				inView ? "opacity-100" : "translate-y-20 opacity-0"
			}`}
		>
			{idImage ? (
				<ImageApi id={idImage} alt={"Pacto Verde"} className="w-full" />
			) : (
				<img src={image} alt="Pacto Verde" className="w-full" />
			)}
			<p className="text-green1 text-xl font-light mt-4 mb-8">{title}</p>
			{summary && <p className="text-gray3 text-base font-bold">{summary}</p>}
			{subsummary && (
				<p className="text-gray3 text-base font-medium">{subsummary}</p>
			)}
			<div className="sm:absolute sm:bottom-0 mt-4">
				<Button
					text={buttonText}
					variant="green"
					action={() => clickButton()}
				/>
			</div>
		</div>
	);
};

export default ThumbArticle;
