import React from "react";
import ThumbArticle, { IThumbProps } from "./ThumbArticle";

interface IProps {
	thumbs: IThumbProps[];
}

const ThumbsContainer = ({ thumbs }: IProps) => {
	return (
		<div className="pb-20 mt-12 sm:mt-4">
			<div className="container">
				<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-16">
					{thumbs.map((thumb, i) => (
						<ThumbArticle
							key={`${i}${thumb.title}`}
							image={thumb.image}
							title={thumb.title}
							summary={thumb.summary}
							subsummary={thumb.subsummary}
							buttonText={thumb.buttonText}
							url={thumb.url}
							idImage={thumb.idImage}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ThumbsContainer;
