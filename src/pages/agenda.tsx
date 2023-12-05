import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";

import Layout from "../components/layout/Layout";

import HeaderText from "../components/shared/HeaderText";
import Button from "../components/shared/Button";
import VideoContainer from "../components/shared/VideoContainer";
import Footer from "../components/layout/Footer";
import { Circle } from "./blog";
import { navigate } from "gatsby";
import { AppContext } from "../context/AppContext";
import ImageApi from "../components/shared/ImageApi";
import Loader from "../components/shared/Loader";

const CircleHead = ({ className }: { className: string }) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  return (
    <div
      ref={ref}
      className={`${className} flex-none w-[127px] sm:w-[206px] h-[127px] sm:h-[206px] rounded-full transition-all duration-1000 ease-in-out ${
        inView ? "opacity-100" : "sm:opacity-0"
      }`}
    ></div>
  );
};

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

const HeaderAgenda = ({ text }: { text: string }) => {
  return (
    <section>
      <div className="min-h-screen relative overflow-hidden gradient-home flex items-center">
        <div className="relative container flex">
          <p className="w-4/5 md:w-[55%] font-thin text-xl xs:text-2xl sm:text-3xl md:text-3xl leading-snug text-white z-10 mt-16 sm:mt-0">
            {text}
          </p>
          <div className="w-full h-full md:h-auto md:w-[45%] absolute -top-20 md:top-auto left-1/4 md:left-auto md:relative opacity-80 scale-75 sm:scale-100">
            <CircleHead className="bg-yellowpv absolute top-1/2 left-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2" />
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

const Eje = ({
  text,
  img,
  index,
  id,
}: {
  text: string;
  img: any;
  index: number;
  id: number;
}) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  return (
    <div
      ref={ref}
      className={`flex justify-center ${
        index % 3 === 0
          ? "lg:justify-start"
          : index % 3 === 1
          ? "lg:justify-center"
          : "lg:justify-end"
      } mb-12 sm:mb-20 transition-all duration-1000 ease-in-out ${
        inView ? "opacity-100" : "opacity-0 translate-y-30"
      }`}
    >
      <div className="flex flex-col items-center w-full sm:w-auto">
        <ImageApi id={img} alt="Eje Tematico" className="mb-6 my-auto" />
        <Button
          variant="pink"
          text={text}
          classname="lg:!text-lg !font-normal"
          size="lg"
          action={() => navigate(`/ejetematico?id=${id}`)}
        />
      </div>
    </div>
  );
};

const IndexPage = () => {
  const { baseUrl } = useContext(AppContext);

  const [page, setPage] = useState<any>();
  const [ejes, setEjes] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/pages?slug=agenda&timestamp=${new Date().getTime()}`)
      .then((res) => {
        setPage(res.data[0].acf);
      })
      .catch((_error) => {});
  }, [baseUrl]);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/posts?categories=7&per_page=100&timestamp=${new Date().getTime()}`
      )
      .then((res) => {
        setEjes(
          res.data
            .map((item) => ({
              id: item.id,
              order: item.acf.order,
              img: item.acf["color-img"],
              text: item.acf.title,
            }))
            .sort((a, b) => a.order - b.order)
        );
      })
      .catch((_error) => {});
  }, [baseUrl]);

  return (
    <Layout title="Home">
      {page ? (
        <>
          <HeaderAgenda text={page["header-text"] || ""} />

          <div id="ejes" className="container">
            <HeaderText text={page["eje-title"] || ""} />
            <div className="py-6 sm:py-12 md:grid md:grid-cols-3 justify-between">
              {ejes.map((eje, i) => (
                <Eje
                  key={`${i}${eje.id}`}
                  text={eje.text}
                  img={eje.img}
                  index={i}
                  id={eje.id}
                />
              ))}
            </div>
          </div>
          <VideoContainer url={page["video-url"] || ""} youtube />
          <div className="container">
            <HeaderText text={page["sumate-title"] || ""} />
            <div className="mb-20 sm:flex">
              <ImageApi
                id={page["sumate-img"] || ""}
                alt="Agenda"
                className="sm:w-[322px] sm:h-[462px]"
              />
              <div className="mt-6 sm:mt-0 relative sm:pl-16">
                <div className="hidden sm:flex absolute z-[-1] left-1/2 -translate-x-1/2 -top-16 gap-16">
                  <Circle className="bg-yellowpv " />
                  <Circle className="bg-yellowpv" />
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: page["sumate-content"] || "",
                  }}
                ></div>
                <Button
                  variant="pinkwhite"
                  text={page["download-button"] || ""}
                  action={() => window.open(page["download-button-url"] || "")}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}

      <Footer />
    </Layout>
  );
};

export default IndexPage;
