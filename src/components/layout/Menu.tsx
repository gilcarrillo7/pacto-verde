import React, { useContext } from "react";
import { Link } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import Helmet from "react-helmet";

import { AppContext } from "../../context/AppContext";
import HamburgerMenu from "./HamburgerMenu";

import ImageApi from "../shared/ImageApi";

const Option = ({
	text,
	onClick,
	linkAnchor,
	link,
}: {
	text: string;
	onClick: React.Dispatch<React.SetStateAction<boolean>>;
	linkAnchor?: string;
	link?: string;
}) =>
	linkAnchor ? (
		<div className="py-4 sm:py-4 border-b border-white">
			<AnchorLink
				to={linkAnchor}
				title={text}
				onAnchorLinkClick={() => onClick(false)}
				className="cursor-pointer text-2xl sm:text-5xl text-white font-thin hover:font-medium"
			/>
		</div>
	) : link ? (
		<div className="py-4 sm:py-4 border-b border-white">
			<Link
				to={link}
				onClick={() => onClick(false)}
				className="cursor-pointer text-2xl sm:text-5xl text-white font-thin hover:font-medium"
			>
				{text}
			</Link>
		</div>
	) : (
		<div className="cursor-pointer text-2xl sm:text-5xl text-white font-thin hover:font-medium py-4 sm:py-4 border-b border-white">
			{text}
		</div>
	);

const Menu = () => {
	const { menuOpen, setMenuOpen, logos } = useContext(AppContext);
	return (
		<>
			<Helmet
				htmlAttributes={{
					class: `${menuOpen ? "overflow-y-hidden" : ""}`,
				}}
			/>
			<HamburgerMenu />
			<nav
				className={`w-screen h-screen absolute sm:fixed top-0 left-0 z-30 transition duration-500 ease-in-out bg-pinkpv ${
					menuOpen ? "visible opacity-1 !fixed" : "invisible opacity-0"
				}`}
			>
				<div className="container pt-5">
					{logos.length && (
						<ImageApi
							id={logos[1]}
							alt={"Logo Pacto Verde"}
							className={"ml-[60px]"}
						/>
					)}
				</div>
				<div className="relative -mt-20 flex h-full w-full items-center justify-center text-left font-thin overflow-hidden">
					<div className="circle-menu absolute top-[55%] left-1/2 -translate-x-1/2 sm:-translate-y-1/2 z-0"></div>
					<div className="flex flex-col sm:flex-row sm:justify-between sm:w-2/3 sm:h-2/3 sm:mt-32 z-10">
						<div className="flex flex-col sm:gap-4">
							<Option
								text="Inicio"
								onClick={() => setMenuOpen(false)}
								linkAnchor="/#inicio"
							/>
							<Option
								text="Qué hacemos"
								link="/quehacemos"
								onClick={() => setMenuOpen(false)}
							/>
							<Option
								text="Agenda"
								onClick={() => setMenuOpen(false)}
								linkAnchor="/agenda"
							/>
							<Option
								text="Pactos verdes mundiales"
								link="/pactosverdes"
								onClick={() => setMenuOpen(false)}
							/>
						</div>
						<div className="flex flex-col sm:gap-4">
							<Option
								text="Revista"
								link="/revista"
								onClick={() => setMenuOpen(false)}
							/>
							<Option
								text="Blog"
								onClick={() => setMenuOpen(false)}
								linkAnchor="/blog"
							/>
							<Option
								text="Contacto"
								onClick={() => setMenuOpen(false)}
								linkAnchor="/#contacto"
							/>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Menu;
