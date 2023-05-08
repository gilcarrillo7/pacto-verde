import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import ArticleLayout from "../../components/articles/ArticleLayout";
import Footer from "../../components/layout/Footer";
import Layout from "../../components/layout/Layout";
import HeaderPage from "../../components/pages/HeaderPage";
import { AppContext } from "../../context/AppContext";

const createMarkup = (html) => {
	return {
		__html: html,
	};
};

const Pactoverde = (props) => {
	const { baseUrl, categories } = useContext(AppContext);

	const {
		location: { search },
	} = props;

	const [reflexion, setReflexion] = useState<null | {
		id;
		title;
		author;
		subtext;
		image;
		content;
	}>(null);

	useEffect(() => {
		const postId = search.split("=")[1];
		let post: { title; author; subtext; image; content };
		axios
			.get(
				`${baseUrl}/posts?include=${postId}&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				if (res.data[0]) {
					post = {
						title: res.data[0].acf.title,
						author: res.data[0].acf.author,
						subtext: res.data[0].acf.subtext,
						image: res.data[0].acf.image,
						content: res.data[0].acf.content,
					};
					axios
						.get(
							`${baseUrl}/media/${post.image}?timestamp=${new Date().getTime()}`
						)
						.then((res) => {
							setReflexion({
								id: postId,
								title: post.title,
								author: post.author,
								subtext: post.subtext,
								image: res.data.guid.rendered,
								content: post.content,
							});
						})
						.catch((error) =>
							setReflexion({
								id: postId,
								title: post.title,
								author: post.author,
								subtext: post.subtext,
								image: null,
								content: post.content,
							})
						);
				}
			})
			.catch((error) => {});
	}, [search, baseUrl]);

	return (
		<>
			{reflexion ? (
				<Layout title={`Reflexión - ${reflexion.title}`}>
					<HeaderPage
						bgcolor="bg-green5"
						title={reflexion.title}
						titleColor="text-white"
					>
						<p className="text-white font-light text-2xl">
							{reflexion.author}
							<br /> <span className="font-medium">{reflexion.subtext}</span>
						</p>
					</HeaderPage>
					<ArticleLayout
						isArticle={false}
						header={reflexion.title}
						url={`reflexiones/reflexion?id=${reflexion.id}`}
						reflexion={true}
					>
						<div className="relative pb-4 sm:pb-24">
							<div
								className={`hidden sm:block absolute -right-12 top-0 w-px border-l border-gray2 transition-all duration-1000 ease-in-out h-full`}
							></div>
							{reflexion.image && (
								<img
									src={reflexion.image}
									alt="Pacto Verde"
									className="w-full mb-16"
								/>
							)}

							<div
								className="child-style:mb-4"
								dangerouslySetInnerHTML={createMarkup(reflexion.content)}
								style={{ whiteSpace: "pre-wrap" }}
							></div>
						</div>
					</ArticleLayout>

					<Footer />
				</Layout>
			) : (
				<div className="min-h-screen flex items-center justify-center">
					<BeatLoader color="#05472C" />
				</div>
			)}
		</>
	);
};

export default Pactoverde;
