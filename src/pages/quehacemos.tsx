import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";

import Layout from "../components/layout/Layout";
import HeaderText from "../components/shared/HeaderText";
import Button from "../components/shared/Button";
import Gallery from "../components/shared/Gallery";
import Footer from "../components/layout/Footer";
import VideoContainer from "../components/shared/VideoContainer";

import { navigate } from "gatsby";
import { AppContext } from "../context/AppContext";
import Loader from "../components/shared/Loader";

const HeaderAgenda = ({ text }: { text: string }) => {
  const { ref: refSun, inView: inViewSun } = useInView({ threshold: 0.3 });
  const { ref: refCircle1, inView: inViewCircle1 } = useInView({
    threshold: 0.3,
  });
  const { ref: refCircle2, inView: inViewCircle2 } = useInView({
    threshold: 0.3,
  });
  const { ref: refEllipse, inView: inViewEllipse } = useInView({
    threshold: 0.3,
  });
  const { ref: refCircle3, inView: inViewCircle3 } = useInView({
    threshold: 0.3,
  });

  return (
    <section>
      <div className="min-h-screen relative overflow-hidden gradient-home flex items-center">
        <div className="container absolute sm:relative top-[250px] sm:top-0 z-10">
          <p className="w-[85%] md:w-2/3 font-thin text-xl xs:text-2xl sm:text-3xl md:text-4xl leading-snug text-white z-10 mt-0">
            {text}
          </p>
        </div>
        <div
          ref={refSun}
          className={`circle-home absolute -top-[200px] -left-[65px] sm:top-1/2 sm:-translate-y-1/2 sm:left-1/2 transition-all duration-1000 ease-in-out ${
            inViewSun ? "scale-100" : "scale-0"
          } `}
        ></div>
        <div
          ref={refCircle2}
          className={`absolute w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-pinkpv top-[7rem] sm:top-1/2 sm:-translate-y-1/2 sm:-mt-[10rem] transition-all duration-1000 ease-in-out delay-500 ${
            inViewCircle2 ? "right-[12rem] sm:right-[26rem]" : "right-[2rem]"
          } `}
        ></div>
        <div
          ref={refCircle1}
          className={`absolute w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-white top-[7rem] sm:top-1/2 sm:-translate-y-1/2 sm:-mt-[10rem] transition-all duration-1000 ease-in-out delay-500 ${
            inViewCircle1 ? "right-[7rem] sm:right-[15rem]" : "right-[2rem]"
          }`}
        ></div>
        <div
          className={`absolute w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-yellowpv top-[7rem] sm:top-1/2 sm:-translate-y-1/2 sm:-mt-[10rem] right-[2rem]`}
        ></div>
        <div
          ref={refEllipse}
          className={`absolute w-32 h-16 sm:w-64 sm:h-28 rounded-full bg-pinkpv top-[12rem] sm:top-1/2 sm:-translate-y-1/2 right-[-2rem] sm:right-[2rem] transition-all duration-1000 ease-in-out delay-700 ${
            inViewEllipse ? "scale-y-100" : "scale-y-0"
          }`}
        ></div>
        <div
          ref={refCircle3}
          className={`absolute  w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-white top-[17rem] sm:top-1/2 sm:-translate-y-1/2 sm:mt-[10rem] right-[-2rem] sm:right-[2rem]  transition-all duration-1000 ease-in-out delay-1000 ${
            inViewCircle3 ? "scale-100" : "scale-0"
          }`}
        ></div>
      </div>
    </section>
  );
};

const IndexPage = () => {
  const { baseUrl } = useContext(AppContext);

  const [page, setPage] = useState<any>();

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/pages?slug=que-hacemos&timestamp=${new Date().getTime()}`
      )
      .then((res) => {
        setPage(res.data[0].acf);
      })
      .catch((_error) => {});
  }, [baseUrl]);

  return (
    <Layout title="Home">
      {page ? (
        <>
          <div id="inicio">
            <HeaderAgenda text={(page && page["header-text"]) || ""} />
          </div>
          <div className="container py-4 sm:py-12 text-base sm:text-lg">
            <HeaderText text={(page && page["revista-title"]) || ""} />
            <div className="w-full md:w-2/3 mb-20">
              <div
                className="mb-12"
                dangerouslySetInnerHTML={{
                  __html: (page && page["revista-text"]) || "",
                }}
              ></div>
              <Button
                variant="pink"
                text={(page && page["revista-button"]) || ""}
                action={() => navigate("/revista")}
              />
            </div>
            <div id="talleres" className="pt-2">
              <HeaderText
                text={(page && page["talleres-title"]) || ""}
                className=""
              />
              <div
                className="w-full md:w-2/3 mb-20"
                dangerouslySetInnerHTML={{
                  __html: (page && page["telleres-text"]) || "",
                }}
              ></div>
            </div>
            <Gallery
              imgs={[
                page && page["talleres-gallery-1"],
                page && page["talleres-gallery-2"],
                page && page["talleres-gallery-3"],
                page && page["talleres-gallery-4"],
                page && page["talleres-gallery-5"],
              ]}
            />

            <div className="w-full md:w-2/3 mb-20">
              <div
                className="mb-8"
                dangerouslySetInnerHTML={{
                  __html: (page && page["talleres-subtext"]) || "",
                }}
              ></div>
              <Button
                variant="pinkwhite"
                text={(page && page["talleres-button"]) || ""}
                action={() =>
                  window.open((page && page["talleres-button-url"]) || "")
                }
              />
            </div>
            <div id="foros" className="pt-2">
              <HeaderText text={(page && page["foros-title"]) || ""} />
              <div
                className="w-full md:w-2/3 mb-6"
                dangerouslySetInnerHTML={{
                  __html: (page && page["foros-text"]) || "",
                }}
              ></div>
            </div>
          </div>
          <VideoContainer url={(page && page["foros-video"]) || ""} />
          <div className="container mt-8 text-base sm:text-lg pt-4 pb-12 sm:pt-12 sm:pb-20">
            <div className="w-full md:w-2/3 mb-20">
              <div
                dangerouslySetInnerHTML={{
                  __html: (page && page["foros-subtext"]) || "",
                }}
              ></div>
              <Button
                variant="pinkwhite"
                text={(page && page["foros-button"]) || ""}
                action={() =>
                  window.open((page && page["foros-button-url"]) || "")
                }
              />
            </div>
            <Gallery
              imgs={[
                page && page["foros-gallery-1"],
                page && page["foros-gallery-2"],
                page && page["foros-gallery-3"],
                page && page["foros-gallery-4"],
                page && page["foros-gallery-5"],
              ]}
            />
            <Button
              variant="pink"
              text={(page && page["agenda-button"]) || ""}
              action={() => navigate("/agenda")}
            />
          </div>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default IndexPage;
