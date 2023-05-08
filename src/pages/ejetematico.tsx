import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";

import Layout from "../components/layout/Layout";

import HeaderText from "../components/shared/HeaderText";
import Footer from "../components/layout/Footer";
import { Link } from "gatsby";
import { AppContext } from "../context/AppContext";
import ImageApi from "../components/shared/ImageApi";
import { BeatLoader } from "react-spinners";

const Border = ({ className }: { className: string }) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={` absolute top-1/2 -translate-y-1/2  sm:right-0 bg-transparent w-[430px] h-[430px] border-[1px] border-pinkpv border-opacity-80 rounded-full transition-all duration-1000 ease-in-out ${
				inView ? `opacity-100 ${className}` : `sm:opacity-0`
			}`}
		></div>
	);
};

const HeaderAgenda = ({ title, img }) => {
	return (
		<section>
			<div className="min-h-screen relative overflow-hidden gradient-home flex items-center">
				<div className="relative container flex">
					<p className="md:w-[55%] font-medium text-2xl sm:text-3xl md:text-5xl leading-snug text-white z-10 mt-72 sm:mt-0">
						{title}
					</p>
					<div className="w-full h-full md:h-auto md:w-[45%] absolute -top-20 md:top-auto -left-1/4 md:left-auto md:relative opacity-80 scale-75 sm:scale-100">
						<ImageApi
							id={img}
							alt=""
							className="absolute top-1/2 left-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2"
						/>
						<Border className="-right-[0rem] sm:right-0" />
						<Border className="-right-[0.5rem] sm:right-[0.5rem]" />
						<Border className="-right-[1rem] sm:right-[1rem]" />
						<Border className="-right-[1.5rem] sm:right-[1.5rem]" />
						<Border className="-right-[2rem] sm:right-[2rem]" />
						<Border className="-right-[2.5rem] sm:right-[2.5rem]" />
						<Border className="-right-[3rem] sm:right-[3rem]" />
						<Border className="-right-[3.5rem] sm:right-[3.5rem]" />
						<Border className="-right-[4rem] sm:right-[4rem]" />
						<Border className="-right-[4.5rem] sm:right-[4.5rem]" />
						<Border className="-right-[5rem] sm:right-[5rem]" />
						<Border className="-right-[5.5rem] sm:right-[5.5rem]" />
						<Border className="-right-[6rem] sm:right-[6rem]" />
						<Border className="-right-[6.5rem] sm:right-[6.5rem]" />
						<Border className="-right-[7rem] sm:right-[7rem]" />
						<Border className="-right-[7.5rem] sm:right-[7.5rem]" />
						<Border className="-right-[8rem] sm:right-[8rem]" />
						<Border className="-right-[8.5rem] sm:right-[8.5rem]" />
						<Border className="-right-[9rem] sm:right-[9rem]" />
					</div>
				</div>
			</div>
		</section>
	);
};

const ArrowDown = () => (
	<svg
		width="47"
		height="26"
		viewBox="0 0 47 26"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="scale-75 sm:scale-100"
	>
		<path
			d="M45 2L23.5 23.5L2 2"
			stroke="#FF2EB6"
			strokeWidth="3"
			strokeLinecap="round"
		/>
	</svg>
);

const ArrowUp = () => (
	<svg
		width="47"
		height="26"
		viewBox="0 0 47 26"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="scale-75 sm:scale-100"
	>
		<path
			d="M2 24.5L23.5 3L45 24.5"
			stroke="#FF2EB6"
			strokeWidth="3"
			strokeLinecap="round"
		/>
	</svg>
);

const Collapsible = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	const [shown, setShown] = useState(false);
	return (
		<div className="">
			<div
				className="relative border-b border-black cursor-pointer py-4 text-xl md:text-4xl font-thin pr-12 sm:pr-14"
				onClick={() => setShown(!shown)}
			>
				<span>{title}</span>
				<div className="absolute right-0 top-1/2 -translate-y-1/2">
					{shown ? <ArrowUp /> : <ArrowDown />}
				</div>
			</div>
			{shown && <div className="md:w-3/4 py-4">{children}</div>}
		</div>
	);
};

const EjePage = ({ location }: { location: any }) => {
	const params = new URLSearchParams(location.search);
	const id = Number(params.get("id"));
	const { baseUrl } = useContext(AppContext);

	const [page, setPage] = useState<any>();
	const [next, setNext] = useState<number>(0);

	useEffect(() => {
		if (id)
			axios
				.get(
					`${baseUrl}/posts?categories=7&per_page=100&timestamp=${new Date().getTime()}`
				)
				.then((res) => {
					const ejes = res.data
						.map((item) => ({
							id: Number(item.id),
							acf: item.acf,
						}))
						.sort((a, b) => a.acf.order - b.acf.order);
					for (let i = 0; i < ejes.length; i++) {
						if (ejes[i].id === id) {
							setPage(ejes[i].acf);
							setNext(ejes[i === ejes.length - 1 ? 0 : i + 1].id);
							break;
						}
					}
				})
				.catch((_error) => {});
		return function () {
			setPage(null);
		};
	}, [baseUrl, id]);

	return (
		<>
			{page ? (
				<Layout title="Home">
					<HeaderAgenda title={page.title} img={page["white-img"]} />

					<div className="container my-16 sm:text-lg md:text-xl">
						<div
							className=" md:w-3/4"
							dangerouslySetInnerHTML={{ __html: page.content }}
						></div>
						<HeaderText
							text={page["prioridades-title"]}
							className="!mt-16 !my-8"
						/>
						<Collapsible title={page["accordion-title-1"]}>
							<div
								dangerouslySetInnerHTML={{
									__html: page["accordion-content-1"],
								}}
							></div>
						</Collapsible>
						<Collapsible title={page["accordion-title-2"]}>
							<div
								dangerouslySetInnerHTML={{
									__html: page["accordion-content-2"],
								}}
							></div>
						</Collapsible>
						<Collapsible title={page["accordion-title-3"]}>
							<div
								dangerouslySetInnerHTML={{
									__html: page["accordion-content-3"],
								}}
							></div>
						</Collapsible>
						<div
							className="mt-16"
							dangerouslySetInnerHTML={{
								__html: page["bottom-text"],
							}}
						></div>
						<Link
							to={`/ejetematico?id=${next}`}
							className={`block text-pinkpv font-thin text-3xl sm:text-4xl lg:text-5xl my-4 sm:my-12`}
						>
							Siguiente eje
						</Link>
						<Link
							to="/agenda#ejes"
							className={`block text-pinkpv font-thin text-3xl sm:text-4xl lg:text-5xl my-4 sm:mt-8 sm:mb-16`}
						>
							Ver todos
						</Link>
					</div>

					<Footer />
				</Layout>
			) : (
				<div className="text-center">
					<BeatLoader color="#ff2eb6" />
				</div>
			)}
		</>
	);
};

export default EjePage;
