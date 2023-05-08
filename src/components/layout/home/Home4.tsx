import { navigate } from "gatsby";
import React from "react";
import { useInView } from "react-intersection-observer";
import HeaderText from "../../shared/HeaderText";

const Circle = ({ className }: { className: string }) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`${className} w-[118px] sm:w-[150px] h-[118px] sm:h-[150px] rounded-full transition-all duration-1000 ease-in-out ${
				inView ? "opacity-100" : "opacity-0 translate-y-16"
			}`}
		></div>
	);
};

const Ellipse = ({
	className,
	text,
	link,
}: {
	className: string;
	text: string;
	link: string;
}) => {
	const { ref, inView } = useInView({ threshold: 0.3 });
	return (
		<div
			ref={ref}
			className={`${className} button-gradient cursor-pointer w-full sm:w-[356px] h-[118px] sm:h-[150px] rounded-full text-white flex items-center justify-center text-lg md:text-2xl transition-all duration-500 ease-in-out ${
				inView ? "opacity-100" : "opacity-0 translate-y-16"
			}`}
			onClick={() => navigate(link)}
		>
			{text}
		</div>
	);
};

const Home4 = ({ title }) => {
	return (
		<section>
			<div className="min-h-screen flex items-center">
				<div className="container">
					<HeaderText text={title} className="mb-9 sm:mb-9" />
					<div className="flex justify-between mb-6">
						<Circle className="bg-yellowpv hidden lg:flex" />
						<Circle className="bg-pinkpv hidden sm:flex delay-100" />
						<Ellipse
							className="bg-pinkpv delay-150"
							text="Pactos Verdes en el mundo"
							link="/pactosverdes"
						/>
						<Circle className="bg-yellowpv hidden sm:flex delay-200" />
						<Circle className="bg-yellowpv hidden lg:flex delay-300" />
					</div>
					<div className="flex justify-between mb-6 sm:hidden">
						<Circle className="bg-pinkpv hover:bg-yellowpv" />
						<Circle className="bg-yellowpv delay-100" />
					</div>
					<div className="flex justify-between mb-6 flex-wrap sm:flex-nowrap">
						<Ellipse
							className="bg-pinkpv mb-6 sm:mb-0"
							text="Revista Pacto Verde"
							link="/revista"
						/>
						<Circle className="bg-pinkpv hidden lg:flex delay-100" />
						<Circle className="bg-yellowpv hidden lg:flex delay-200" />
						<Ellipse
							className="bg-pinkpv hidden sm:flex delay-300"
							text="Blog"
							link="/blog"
						/>
					</div>
					<div className="flex justify-between mb-6 sm:hidden">
						<Circle className="bg-yellowpv" />
						<Circle className="bg-yellowpv delay-100" />
					</div>
					<div className="mb-6">
						<Ellipse className="bg-pinkpv sm:hidden" text="Blog" link="/blog" />
					</div>
					<div className="hidden sm:flex justify-between mb-6">
						<Circle className="bg-yellowpv hidden lg:flex" />
						<Circle className="bg-yellowpv delay-100" />
						<Circle className="bg-yellowpv delay-200" />
						<Circle className="bg-pinkpv hidden lg:flex delay-300" />
						<Circle className="bg-pinkpv delay-500" />
						<Circle className="bg-pinkpv delay-700" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home4;
