import { navigate } from "gatsby";
import React from "react";
import { useInView } from "react-intersection-observer";

import Img1 from "../../../images/home/fig1.png";
import Button from "../../shared/Button";

import "./home1.scss";

const Home1 = ({ head, button }) => {
	const { ref: refSun, inView: inViewSun } = useInView({ threshold: 0.3 });
	const { ref: refImg1, inView: inViewImg1 } = useInView({
		threshold: 0.3,
	});

	return (
		<section>
			<div className="min-h-screen relative overflow-hidden gradient-home flex items-center">
				<div className="container">
					<div className="absolute px-4 sm:px-0 left-0 top-[24rem] sm:top-0 sm:relative md:w-[45%] leading-snug text-white w-full z-10">
						<p className="mb-12 font-thin text-2xl sm:text-3xl lg:text-4xl">
							{head}
						</p>
						<Button
							text={button}
							variant={"transparent"}
							action={() => navigate("/agenda")}
						/>
					</div>
					<div
						ref={refSun}
						className={`circle-home absolute -top-[200px] -left-[65px] sm:top-1/2 sm:-translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 transition-all duration-1000 ease-in-out ${
							inViewSun ? "scale-100" : "scale-0"
						} `}
					></div>
					<img
						ref={refImg1}
						src={Img1}
						alt=""
						className={`absolute scale-[0.65] sm:scale-100 top-16 sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-1/2 transition-all duration-1000 ease-in-out ${
							inViewImg1 ? "opacity-100" : "opacity-0"
						}`}
					/>
				</div>
			</div>
		</section>
	);
};

export default Home1;
