import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import { BeatLoader } from "react-spinners";

import Layout from "../components/layout/Layout";
import { useInView } from "react-intersection-observer";
import { IThumbProps } from "../components/shared/ThumbArticle";
import ThumbsContainer from "../components/shared/ThumbsContainer";
import Footer from "../components/layout/Footer";
import { AppContext } from "../context/AppContext";

import Button from "../components/shared/Button";
import axios from "axios";

export const Circle = ({ className }: { className: string }) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`${className} flex-none w-[57px] sm:w-[102px] h-[57px] sm:h-[102px] rounded-full transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0"
			}`}
		></div>
	);
};
export const Ellipse = ({ className }: { className: string }) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`${className} flx-none w-[57px] sm:w-[243px] h-[57px] sm:h-[102px] rounded-full transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0"
			}`}
		></div>
	);
};

const HeaderBlog = ({ text, subtext, button }) => {
	return (
		<section>
			<div className="min-h-screen relative gradient-home flex items-center mb-12">
				<div className="container flex flex-col lg:flex-row">
					<div className="w-full lg:w-2/3 md:pr-12 text-white">
						<p className="font-thin text-2xl sm:text-3xl md:text-4xl leading-snug mb-8">
							{text}
						</p>
						<p className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-12">
							{subtext}
						</p>
						<div className="flex lg:block relative">
							<div className="w-1/2 lg:w-full flex items-center h-[190px] lg:h-auto">
								<Button
									variant="transparent"
									text={button}
									action={() => navigate("/#contacto")}
								/>
							</div>
							<div className="flex flex-col lg:hidden absolute -right-12">
								<div className="flex gap-3">
									<Circle className="bg-yellowpv delay-[1000ms]" />
									<Circle className="bg-yellowpv delay-[400ms]" />
								</div>
								<div className="flex gap-3 my-3">
									<Circle className="bg-yellowpv delay-[800ms]" />
									<Circle className="bg-pinkpv delay-[200ms]" />
								</div>
								<div className="flex gap-3">
									<Circle className="bg-pinkpv delay-[600ms]" />
									<Circle className="bg-pinkpv" />
								</div>
							</div>
						</div>
					</div>
					<div className="lg:w-1/3 hidden lg:block">
						<div className="flex justify-between">
							<Circle className="bg-yellowpv delay-[1050ms]" />
							<Circle className="bg-yellowpv delay-[900ms]" />
							<Circle className="bg-white delay-[750ms]" />
						</div>
						<div className="flex justify-between my-4">
							<Circle className="bg-yellowpv delay-[600ms]" />
							<Ellipse className="bg-pinkpv delay-[450ms]" />
						</div>
						<div className="flex justify-between">
							<Circle className="bg-pinkpv delay-[300ms]" />
							<Circle className="bg-pinkpv delay-[150ms]" />
							<Circle className="bg-pinkpv" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const Reflexiones = () => {
	const { baseUrl, categories } = useContext(AppContext);

	const [thumbs, setThumbs] = useState<IThumbProps[]>([]);
	const [page, setPage] = useState<any>();

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/pages?slug=blog&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setPage(res.data[0].acf);
			})
			.catch((_error) => {});
		if (categories.get("reflexiones")) {
			let posts: { id; order; title; summary; buttonText; image }[] = [];
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"reflexiones"
					)}&timestamp=${new Date().getTime()}`
				)
				.then((res) => {
					if (res.data) {
						posts = res.data.map((el) => ({
							id: el.id,
							order: el.acf.order,
							title: el.acf.title,
							summary: el.acf.summary,
							buttonText: el.acf.button,
							image: el.acf.thumb,
						}));
						const requests = posts
							.filter((post) => post.image)
							.map((post) => axios.get(`${baseUrl}/media/${post.image}`));
						axios.all(requests).then((res) => {
							const imgs = res.map((r) => ({
								id: r.data.id,
								img: r.data.guid.rendered,
							}));
							setThumbs(
								posts
									.sort((a, b) => a.order - b.order)
									.map((post) => ({
										url: `/reflexiones/reflexion?id=${post.id}`,
										title: post.title,
										summary: post.summary,
										buttonText: post.buttonText,
										image: imgs.find((img) => img.id === post.image)?.img,
									}))
							);
						});
					}
				})
				.catch((error) => {});
		}
	}, [categories, baseUrl]);

	return (
		<Layout title="Reflexiones">
			{page && (
				<HeaderBlog
					text={page["header-text"]}
					subtext={page["header-subtext"]}
					button={page["header-button"]}
				/>
			)}
			{thumbs.length === 0 ? (
				<div className="container text-center py-8">
					<BeatLoader color="#05472C" />
				</div>
			) : (
				<ThumbsContainer thumbs={thumbs} />
			)}
			<Footer />
		</Layout>
	);
};

export default Reflexiones;
