import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/layout/Layout";

import Home1 from "../components/layout/home/Home1";
import Home2 from "../components/layout/home/Home2";
import Home3 from "../components/layout/home/Home3";
import Home4 from "../components/layout/home/Home4";
import Contacto from "../components/layout/home/Contacto";
import { AppContext } from "../context/AppContext";

const IndexPage = () => {
	const { baseUrl } = useContext(AppContext);

	const [page, setPage] = useState<any>();

	useEffect(() => {
		axios
			.get(`${baseUrl}/pages?slug=home&timestamp=${new Date().getTime()}`)
			.then((res) => {
				setPage(res.data[0].acf);
			})
			.catch((_error) => {});
	}, [baseUrl]);

	return (
		<Layout title="Home">
			<div id="inicio">
				<Home1
					head={(page && page["header-text"]) || ""}
					button={(page && page["header-button"]) || ""}
				/>
			</div>
			<div className="">
				<Home2
					info={
						page
							? [
									{
										title: page["conoce-thumb-title-1"] || "",
										resume: page["conoce-thumb-text-1"] || "",
										img: page["conoce-thumb-img-1"] || "",
										button: "Más información",
										action: "/revista",
									},
									{
										title: page["conoce-thumb-title-2"] || "",
										resume: page["conoce-thumb-text-2"] || "",
										img: page["conoce-thumb-img-2"] || "",
										button: "Más información",
										action: "/quehacemos#talleres",
									},
									{
										title: page["conoce-thumb-title-3"] || "",
										resume: page["conoce-thumb-text-3"] || "",
										img: page["conoce-thumb-img-3"] || "",
										button: "Más información",
										action: "/quehacemos#foros",
									},
							  ]
							: []
					}
				/>
			</div>
			<div className="mt-12 md:mt-0">
				<Home3
					title={(page && page["quienes-comos-title"]) || ""}
					content={(page && page["quienes-somos-text"]) || ""}
					alianzatitle={(page && page["alianzas-title"]) || ""}
				/>
			</div>
			<div className="">
				<Home4 title={(page && page["recursos-title"]) || ""} />
			</div>
			<div id="contacto" className="">
				<Contacto />
			</div>
		</Layout>
	);
};

export default IndexPage;
