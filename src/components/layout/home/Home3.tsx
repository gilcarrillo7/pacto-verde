import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import HeaderText from "../../shared/HeaderText";

import ImgManos from "../../../images/home/manos.png";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import ImageApi from "../../shared/ImageApi";
import Button from "../../shared/Button";
import { navigate } from "gatsby";

const AlianzaCircle = ({ img, alt, url }) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  return (
    <div
      ref={ref}
      className={`cursor-pointer flex-none bg-pinkpv rounded-full w-24 h-24 m-2 sm:m-3 transition-all duration-1000 ease-in-out ${
        inView ? "opacity-100" : "opacity-0"
      }`}
      onClick={() => window.open(url)}
    >
      <ImageApi className="w-full p-1" id={img} alt={alt} />
    </div>
  );
};

const Home3 = ({ title, content, alianzatitle, conocenostitle }) => {
  const { ref: refImg, inView } = useInView({ threshold: 0.3 });
  const { baseUrl } = useContext(AppContext);

  const [alianzas, setAlianzas] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/posts?categories=6&per_page=100&timestamp=${new Date().getTime()}`
      )
      .then((res) => {
        setAlianzas(res.data.map((item) => item.acf));
      })
      .catch((_error) => {});
  }, [baseUrl]);

  return (
    <section>
      <div className="min-h-screen flex items-center">
        <div className="container">
          <div className="flex flex-col md:flex-row">
            <div className="flex-none px-20 md:pl-12 md:order-2 mb-8 md:mb-0">
              <img
                ref={refImg}
                src={ImgManos}
                alt="pacto verde hands"
                className={`md:w-52 m-auto transition-all duration-1000 ease-in-out ${
                  inView ? "opacity-100" : "opacity-0 translate-y-32"
                }`}
              />
            </div>
            <div className="md:order-1">
              <HeaderText text={title} className="sm:mb-9" />
              <div
                className="mb-16 md:w-3/4 sm:text-lg md:text-xl"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
              <Button
                text={conocenostitle }
                variant={"pinkwhite"}
                action={() => navigate("/quienes_somos")}
              />
              <HeaderText text={alianzatitle} className="sm:mb-9" />
              <div className="my-4 flex flex-wrap md:w-[80%] -mx-2 sm:-mx-3 justify-around sm:justify-normal">
                {alianzas.map((alianza, i) => (
                  <AlianzaCircle
                    key={`${i}${alianza.title}`}
                    img={alianza.image}
                    alt={"Alianza"}
                    url={alianza.url}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home3;
