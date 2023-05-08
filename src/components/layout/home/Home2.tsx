import React, { useContext, useEffect, useState } from "react";
import Button from "../../shared/Button";
import { useInView } from "react-intersection-observer";

import { navigate } from "gatsby";
import HeaderText from "../../shared/HeaderText";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";

const InfoDiv = ({ img, title, resume, button, action }) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	const { baseUrl } = useContext(AppContext);
	const [url, setUrl] = useState("");
	useEffect(() => {
		if (img !== 0)
			axios
				.get(`${baseUrl}/media/${img}`)
				.then((res) => setUrl(res.data.guid.rendered))
				.catch((_error) => {});
	}, [img, baseUrl]);
	return (
		<div
			ref={ref}
			className={`relative mt-8 xl:mt-0 bg-cover h-[425px] w-[339px] flex items-center rounded-3xl`}
			style={{
				backgroundImage: `url("${url}")`,
			}}
		>
			<div
				className={`px-8 md:px-12 z-10 sm:h-[280px] flex flex-col justify-between transition-all duration-1000 ease-in-out ${
					inView ? "opacity-100" : "opacity-0"
				}`}
			>
				<p className="text-yellowpv text-2xl sm:text-4xl mb-6 text-center -mt-12 sm:mt-0">
					{title}
				</p>
				<p className="mb-8 text-white">{resume}</p>
				<div className="text-center items-end">
					<Button
						variant="pink"
						text={button}
						action={() => navigate(action)}
						classname="font-normal"
					/>
				</div>
			</div>
		</div>
	);
};

const Home2 = ({ info }) => {
	return (
		<section>
			<div className="min-h-screen flex items-center">
				<div className="container">
					<HeaderText text="Conoce lo que estamos haciendo" />
					<div className="flex items-center xl:justify-between flex-col xl:flex-row">
						{info.map((item, i) => (
							<InfoDiv
								key={`${item.title}${i}`}
								img={item.img}
								title={item.title}
								resume={item.resume}
								button={item.button}
								action={item.action}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home2;
