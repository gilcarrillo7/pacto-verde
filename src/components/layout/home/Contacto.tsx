import React, { useState, useRef } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";

import Button from "../../shared/Button";
import Footer from "../Footer";

const convertJsontoUrlencoded = (obj) => {
	let str = [];
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
		}
	}
	return str.join("&");
};

const Contacto = (props) => {
	const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.3 });
	const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.3 });
	const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.3 });
	const [form, setForm] = useState({ name: "", email: "" });
	const [errorFormName, setErrorFormName] = useState("");
	const [errorFormMail, setErrorFormMail] = useState("");
	const [errorFormMsj, setErrorFormMsj] = useState("");
	const [loading, setLoading] = useState(false);
	const [formMessage, setFormMessage] = useState("");
	const comment = useRef(null);
	const TOKEN =
		typeof window !== "undefined" &&
		window.btoa(`daniela.castro:P4ct0V3rd32022`);

	const handleChanges = (e) => {
		e.preventDefault();
		setErrorFormName("");
		setErrorFormMail("");
		setErrorFormMsj("");
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const sendForm = async (e) => {
		let errors = 0;
		e.preventDefault();

		if (typeof window !== "undefined")
			window.gtag("event", "click_button", {
				event_category: "click",
				event_label: "contact_click",
				value: "contact_click",
			});

		if (form.name.trim() === "") {
			setErrorFormName("Ingresa tu nombre");
			errors++;
		}
		if (form.email.trim() === "") {
			setErrorFormMail("Ingresa tu email");
			errors++;
		} else if (
			!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
		) {
			setErrorFormMail("Ingresa un email correcto");
			errors++;
		}
		if (comment.current.innerText.trim() === "") {
			setErrorFormMsj("Ingresa tu mensaje");
			errors++;
		}
		if (errors === 0) {
			setLoading(true);

			if (typeof window !== "undefined")
				window.gtag("event", "click_button", {
					event_category: "click",
					event_label: "contact_sent",
					value: "contact_sent",
				});
			try {
				await axios({
					url: `https://pactoverde.mx/wp/wp-json/contact-form-7/v1/contact-forms/5/feedback`,
					headers: {
						Authorization: `Basic ${TOKEN}`,
						"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
					},
					method: "POST",
					data: convertJsontoUrlencoded({
						["your-subject"]: "Contacto",
						["your-name"]: form.name,
						["your-email"]: form.email,
						["your-message"]: comment.current.innerText,
					}),
				});
				setLoading(false);
				setFormMessage("Tu mensaje ha sido enviado");
				setForm({ name: "", email: "" });
				comment.current.innerText = "";
			} catch (error) {
				setLoading(false);
				setFormMessage("Ocurrió un error");
			}
		}
	};

	return (
		<div className="min-h-screen flex flex-col gradient-home pt-12 sm:pt-4">
			<div className="text-white flex grow justify-center relative items-center">
				<div className="container">
					<h2
						className={`inline-block text-white text-2xl sm:text-5xl lg:w-1/2`}
					>
						Escríbenos si te interesa colaborar con nosotrxs
					</h2>
					<form
						className="w-full text-black mt-12 my-4"
						onSubmit={(e) => sendForm(e)}
					>
						<div className="sm:grid sm:grid-cols-2 sm:gap-12 ">
							<div className="relative flex flex-col items-center py-2 mt-4 sm:mt-0 sm:w-4/5">
								<input
									name="name"
									className="appearance-none bg-transparent w-full mr-3 pb-6 px-2 focus:outline-none text-lg sm:text-2xl text-white placeholder:text-white"
									type="text"
									placeholder="Nombre"
									aria-label="Name"
									value={form.name}
									onChange={(e) => handleChanges(e)}
								/>
								<div
									ref={ref1}
									className={`absolute h-px border-b border-white left-0 bottom-0 transition-all duration-1000 ease-in-out ${
										inView1 ? "visible w-full" : "invisible w-0"
									}`}
								></div>
								{errorFormName !== "" && (
									<div className="absolute left-0 -bottom-6 text-sm text-white">
										{errorFormName}
									</div>
								)}
							</div>
							<div className="relative flex flex-col items-center py-2 mt-4 sm:mt-0 sm:w-4/5">
								<input
									name="email"
									className="appearance-none bg-transparent w-full mr-3 pb-6 px-2 focus:outline-none text-lg sm:text-2xl text-white placeholder:text-white"
									type="mail"
									placeholder="Email"
									aria-label="Email"
									value={form.email}
									onChange={(e) => handleChanges(e)}
								/>
								<div
									ref={ref2}
									className={`absolute h-px border-b border-white left-0 bottom-0 transition-all duration-1000 ease-in-out delay-500 ${
										inView2 ? "visible w-full" : "invisible w-0"
									}`}
								></div>
								{errorFormMail !== "" && (
									<div className="absolute left-0 -bottom-6 text-sm text-white">
										{errorFormMail}
									</div>
								)}
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-2 sm:gap-12 sm:mt-16 ">
							<div className="relative flex flex-col items-center py-2 mt-4 sm:mt-0 sm:w-4/5">
								<span
									ref={comment}
									contentEditable="true"
									className="outline-none w-full mr-3 pb-6 px-2 focus:outline-none text-lg sm:text-2xl text-white"
									placeholder="Mensaje"
									onChange={() => setErrorFormMsj("")}
									onClick={() => setErrorFormMsj("")}
								></span>
								{/*<input
									name="message"
									className="appearance-none bg-transparent w-full mr-3 pb-6 px-2 focus:outline-none text-lg sm:text-2xl"
									type="tel"
									placeholder="Mensaje"
									aria-label="Mensaje"
									value={form.message}
									onChange={(e) => handleChanges(e)}
								/>*/}
								<div
									ref={ref3}
									className={`absolute h-px border-b border-white left-0 bottom-0 transition-all duration-1000 ease-in-out delay-1000 ${
										inView3 ? "visible w-full" : "invisible w-0"
									}`}
								></div>
								{errorFormMsj !== "" && (
									<div className="absolute left-0 -bottom-6 text-sm text-white">
										{errorFormMsj}
									</div>
								)}
							</div>
							<div className="text-center sm:text-left mt-8 sm:mt-4">
								{loading ? (
									<BeatLoader color="#FFFFFF" />
								) : formMessage === "" ? (
									<Button text="Enviar" variant="transparentpink" />
								) : (
									<p className="text-base text-white text-xl">{formMessage}</p>
								)}
							</div>
						</div>
					</form>
					<div className="text-white text-xl sm:text-2xl my-12">
						<p className="">O escríbenos a:</p>
						<a href="mailto:contacto@pactoverde.mx" className="underline">
							contacto@pactoverde.mx
						</a>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Contacto;
