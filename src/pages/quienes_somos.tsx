import React, { useContext, useEffect, useMemo, useState } from "react";
import { Carousel } from "react-responsive-carousel";

import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";

import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useInView } from "react-intersection-observer";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Button from "../components/shared/Button";
import ImageApi from "../components/shared/ImageApi";
import Loader from "../components/shared/Loader";

export const Circle = ({ className }: { className: string }) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  return (
    <div
      ref={ref}
      className={`${className} flex-none w-[102px] h-[102px] rounded-full transition-all duration-1000 ease-in-out ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    ></div>
  );
};

const Border = ({ className }: { className: string }) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  return (
    <div
      ref={ref}
      className={`absolute -translate-y-1/2 bg-transparent w-[102px] h-[102px] border-[1px] border-opacity-80 rounded-full transition-all duration-1000 ease-in-out ${
        inView ? `opacity-100 ${className}` : `opacity-0 top-0 `
      }`}
    ></div>
  );
};

const HeaderPactos = ({ text, subtext }) => {
  return (
    <section>
      <div className="min-h-screen relative overflow-hidden gradient-home flex items-center sm:pt-[120px] pb-12">
        <div className="container md:flex mt-32 md:mt-0">
          <div className="w-full md:w-2/3 md:pr-8 xl:pr-20">
            <div className="text-white">
              <p className="font-light text-3xl sm:text-4xl md:text-6xl leading-snug mb-8">
                {text}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl">{subtext}</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex gap-12 justify-center mt-20 md:mt-0">
            <div className="flex flex-col justify-between">
              <div className="relative mt-12">
                <Border className="top-0 border-yellowpv" />
                <Border className="top-[0.8rem] border-yellowpv" />
                <Border className="top-[1.6rem] border-yellowpv" />
                <Border className="top-[2.4rem] border-yellowpv" />
                <Border className="top-[3.2rem] border-yellowpv" />
                <Border className="top-[4rem] border-yellowpv" />
                <Border className="top-[4.8rem] border-white" />
                <Border className="top-[5.6rem] border-white" />
                <Border className="top-[6.4rem] border-white" />
                <Border className="top-[7.2rem] border-white" />
                <Border className="top-[8rem] border-white" />
              </div>
              <Circle className="bg-yellowpv delay-[600ms]" />
            </div>
            <div className="flex flex-col gap-8 justify-between">
              <Circle className="bg-white delay-[400ms]" />
              <Circle className="bg-pinkpv delay-[600ms]" />
              <Circle className="bg-pinkpv delay-[800ms]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Member = ({ img, title, content }) => {
  const [show, setShow] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <div
      ref={ref}
      className={`px-12 sm:px-4 mb-12 transition-all duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      {show ? (
        <div className={`top-0 bg-white `}>
          <p className="font-regular text-center text-pinkpv underline font-medium text-lg sm:text-xl">
            {title}
          </p>
          <p className="font-normal text-left mt-4 text-sm leading-4">
            {content}
          </p>
          <button
            className="mt-4 w-full flex justify-center"
            onClick={() => setShow(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
              fill="#FF2EB6"
            >
              <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          className={`px-2 w-full h-full`}
          onClick={() => setShow(true)}
          role="button"
        >
          <ImageApi id={img} alt={""} className={"mx-auto"} />
          <p className="text-pinkpv font-medium text-xl my-6 text-center underline">
            {title}
          </p>
        </div>
      )}
    </div>
  );
};

const QuienesSomos = () => {
  const { baseUrl } = useContext(AppContext);
  const [page, setPage] = useState<any>();
  const [loadAll, setLoadAll] = useState(false);
  const [members, setMembers] = useState([]);

  const slides = useMemo(
    () => Array.from(Array(Math.ceil(members.length / 10)).keys()),
    [members]
  );

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/pages?slug=quienes-somos&timestamp=${new Date().getTime()}`
      )
      .then((res) => {
        setPage(res.data[0].acf);
      })
      .catch((_error) => {});
  }, [baseUrl]);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/posts?categories=9&per_page=100&timestamp=${new Date().getTime()}`
      )
      .then((res) => {
        setMembers(
          res.data
            .map((item) => ({
              title: item.acf.title,
              content: item.acf.content,
              image: item.acf.image,
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
        <>
          <HeaderPactos text={page?.title} subtext={page?.content} />
          <div className="container py-20 hidden sm:block">
            <Carousel
              showThumbs={false}
              showArrows={true}
              showStatus={false}
              showIndicators={false}
              preventMovementUntilSwipeScrollTolerance={true}
              swipeScrollTolerance={50}
              className=""
              infiniteLoop={false}
              autoPlay={false}
            >
              {slides.map((slide, i) => (
                <div
                  key={`slide${i}`}
                  className="grid sm:grid-cols-3 lg:grid-cols-5"
                >
                  {members
                    .slice(slide * 10, slide * 10 + 10)
                    .map((member, j) => (
                      <Member
                        key={`member${j}`}
                        img={member?.image}
                        content={member?.content}
                        title={member?.title}
                        index={j}
                      />
                    ))}
                </div>
              ))}
            </Carousel>
          </div>
          <div className="container py-20 block sm:hidden">
            {members
              .slice(0, loadAll ? members.length : 10)
              .map((member, j) => (
                <div key={`member${j}`} className="mb-16">
                  <Member
                    img={member?.image}
                    content={member?.content}
                    title={member?.title}
                  />
                </div>
              ))}
            {!loadAll && page && (
              <Button
                text={page["more-text"]}
                variant={"pinkwhite"}
                action={() => setLoadAll(true)}
              />
            )}
          </div>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default QuienesSomos;
