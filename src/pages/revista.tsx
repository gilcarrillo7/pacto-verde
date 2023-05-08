import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Footer from "../components/layout/Footer";
import Layout from "../components/layout/Layout";
import Button from "../components/shared/Button";
import ThumbsContainer from "../components/shared/ThumbsContainer";
import { AppContext } from "../context/AppContext";

const Circle = ({ className }: { className: string }) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`${className} w-[77px] sm:w-[150px] h-[77px] sm:h-[150px] rounded-full transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0"
			}`}
		></div>
	);
};

const HeaderRevista = ({ text, subtext }) => {
	return (
		<section>
			<div className="min-h-screen relative gradient-home flex items-center mb-12 sm:pt-[120px]">
				<div className="container">
					<div className="w-full md:w-2/3 text-white">
						<p className="font-thin text-2xl sm:text-3xl md:text-4xl leading-snug mb-8">
							{text}
						</p>
						<p className="text-xl sm:text-2xl md:text-3xl">{subtext}</p>
					</div>

					<div className="flex justify-between w-full mt-20 relative">
						<Circle className="bg-yellowpv delay-[1000ms]" />
						<Circle className="bg-yellowpv delay-[800ms]" />
						<Circle className="bg-yellowpv hidden lg:flex delay-[600ms]" />
						<Circle className="bg-pinkpv  delay-[400ms]" />
						<Circle className="bg-pinkpv hidden lg:flex delay-[200ms]" />
						<Circle className="bg-pinkpv hidden md:flex" />
					</div>
				</div>
			</div>
		</section>
	);
};

const Articulo = () => {
	const { thumbsArticles, baseUrl } = useContext(AppContext);

	const [page, setPage] = useState<any>();
	useEffect(() => {
		axios
			.get(`${baseUrl}/pages?slug=revista&timestamp=${new Date().getTime()}`)
			.then((res) => {
				setPage(res.data[0].acf);
			})
			.catch((_error) => {});
	}, [baseUrl]);

	return (
		<Layout title="Artículos">
			{page && (
				<HeaderRevista
					text={page["header-text"]}
					subtext={page["header-subtext"]}
				/>
			)}
			<ThumbsContainer thumbs={thumbsArticles} />
			{page && (
				<div className="container">
					<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3">
						<div className="border-t pt-16 pb-8 sm:py-16 text-center sm:text-left">
							{page["footer-text"] || ""}
						</div>
						<div className="sm:border-t pb-16 sm:py-16 sm:pl-4">
							<Button
								text={page["download-button"] || ""}
								variant="green"
								action={() => window.open(page["download-button-url"] || "")}
							/>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</Layout>
	);
};

export default Articulo;
