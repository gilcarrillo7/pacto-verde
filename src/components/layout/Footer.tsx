import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import ImageApi from "../shared/ImageApi";

const Footer = () => {
  const { baseUrl } = useContext(AppContext);
  const [redes, setRedes] = useState<any[]>([]);
  const clickSocial = (sn) => {
    if (typeof window !== "undefined")
      window.gtag("event", "click_social", {
        event_category: "click",
        event_label: sn,
        value: sn,
      });
  };

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/posts?categories=10&per_page=100&timestamp=${new Date().getTime()}`
      )
      .then((res) => {
        setRedes(
          res.data
            .map((item) => ({
              img: item.acf.image,
              url: item.acf.url,
            }))
            .reverse()
        );
      })
      .catch((_error) => {});
  }, [baseUrl]);

  return (
    <div className="bg-black mt-auto flex p-2 sm:p-6">
      <div className="w-screen py-4 text-white text-sm flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 flex justify-center order-1 sm:order-2">
          {redes.map((red) => (
            <a
              key={red.url}
              href={red.url}
              className="mx-2"
              target="_blank"
              onClick={() => clickSocial("twitter")}
            >
              <ImageApi id={red.img} alt={""} className={""} />
            </a>
          ))}
        </div>
        <div className="w-full sm:w-1/3 pt-4 sm:pt-0 order-2 sm:order-1 text-center sm:text-left">
          © Pacto Socio Ambiental {new Date().getFullYear()}. Todos los derechos
          reservados.
        </div>
        <div className="w-full sm:w-1/3 text-center sm:text-right pt-2 sm:pt-0 order-3 sm:order-3">
          Diseño y desarollo web por{" "}
          <a
            className="underline"
            href="https://www.trazovivo.com"
            target="_blank"
          >
            Trazo Vivo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
