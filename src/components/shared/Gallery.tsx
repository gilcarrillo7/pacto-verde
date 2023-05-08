import React, { useState, useEffect } from "react";
import ImageApi from "./ImageApi";

const Gallery = ({ imgs }: { imgs: number[] }) => {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setActive((active) => (active === imgs.length - 1 ? 0 : active + 1));
		}, 3000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="">
			<div className="">
				<ImageApi
					id={imgs[active]}
					alt={""}
					className={"max-h-[48px] sm:max-h-none w-full sm:h-auto"}
				/>
			</div>
			<div className="mt-4 sm:mt-8 mb-8 flex flex-nowrap justify-between -ml-1 -mr-1">
				{imgs.map((img, i) => (
					<div
						key={`${i}${img}`}
						className={`${
							i === active ? "border-2" : ""
						} flex border-pinkpv border-solid cursor-pointer m-1`}
					>
						<ImageApi
							id={img}
							alt={""}
							className={"max-h-[48px] sm:max-h-none w-full sm:h-auto"}
							onClick={() => setActive(i)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Gallery;
