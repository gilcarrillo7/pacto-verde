import React, { useContext, useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";
import ThumbsContainer from "../components/shared/ThumbsContainer";
import { IThumbProps } from "../components/shared/ThumbArticle";

import thumb1 from "../images/recursos/thumb1.png";
import thumb2 from "../images/recursos/thumb2.png";
import thumb3 from "../images/recursos/thumb3.png";
import thumb4 from "../images/recursos/thumb4.png";
import thumb5 from "../images/recursos/thumb5.png";
import thumb6 from "../images/recursos/thumb6.png";
import thumb7 from "../images/recursos/thumb7.png";
import thumb8 from "../images/recursos/thumb8.png";
import thumb9 from "../images/recursos/thumb9.png";
import thumb10 from "../images/recursos/thumb10.png";
import thumb11 from "../images/recursos/thumb11.png";
import thumb12 from "../images/recursos/thumb12.png";
import thumb13 from "../images/recursos/thumb13.png";
import thumb14 from "../images/recursos/thumb14.png";
import thumb15 from "../images/recursos/thumb15.png";
import thumb16 from "../images/recursos/thumb16.png";
import thumb17 from "../images/recursos/thumb17.png";
import { Circle, Ellipse } from "./blog";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Loader from "../components/shared/Loader";

const HeaderPactos = ({ text, subtext }) => {
  return (
    <section>
      <div className="min-h-screen relative overflow-hidden gradient-home flex items-center sm:pt-[120px]">
        <div className="container flex">
          <div className="w-full md:w-2/3 md:pr-8 xl:pr-20">
            <div className="text-white">
              <p className="font-thin text-2xl sm:text-3xl md:text-4xl leading-snug mb-8">
                {text}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl">{subtext}</p>
            </div>
            <div className="flex mt-12 gap-4 md:gap-6 justify-between sm:justify-normal">
              <Circle className="bg-yellowpv delay-[1200ms]" />
              <Circle className="bg-yellowpv delay-[1000ms]" />
              <Circle className="bg-yellowpv delay-[800ms]" />
            </div>
          </div>
          <div className="hidden md:flex md:w-1/3 flex-col">
            <div className="flex justify-end gap-10 mb-8">
              <Circle className="bg-pinkpv delay-[600ms]" />
              <Circle className="bg-white delay-[400ms]" />
            </div>
            <div className="flex justify-between">
              <Circle className="bg-yellowpv delay-[200ms] hidden xl:flex" />
              <Ellipse className="bg-pinkpv" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Recursos = () => {
  const { baseUrl } = useContext(AppContext);

  const [page, setPage] = useState<any>();
  const [thumbs, setThumbs] = useState<IThumbProps[]>([]);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/pages?slug=pactos-verdes&timestamp=${new Date().getTime()}`
      )
      .then((res) => {
        setPage(res.data[0].acf);
      })
      .catch((_error) => {});
  }, [baseUrl]);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/posts?categories=8&per_page=100&timestamp=${new Date().getTime()}`
      )
      .then((res) => {
        setThumbs(
          res.data
            .map((item) => ({
              idImage: item.acf.image,
              buttonText: item.acf.buttontext,
              title: item.acf.title,
              subsummary: item.acf.summary,
              url: item.acf.url,
              order: item.acf.order,
            }))
            .sort((a, b) => a.order - b.order)
        );
      })
      .catch((_error) => {});
  }, [baseUrl]);

  return (
    <Layout title="Recursos">
      {page ? (
        <HeaderPactos
          text={page["header-text"] || ""}
          subtext={page["header-subtext"] || ""}
        />
      ) : (
        <Loader />
      )}
      <ThumbsContainer thumbs={thumbs} />
      <Footer />
    </Layout>
  );
};

export default Recursos;
