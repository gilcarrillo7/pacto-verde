import React, { useContext } from "react";
import { Link } from "gatsby";

import Menu from "./Menu";

import { AppContext } from "../../context/AppContext";
import ImageApi from "../shared/ImageApi";

interface IProps {}

const Header = (props: IProps) => {
  const { logos } = useContext(AppContext);
  return (
    <header>
      <div className="absolute w-screen z-10">
        <div className="container pt-5 pb-2">
          {logos.length ? (
            <Link className="inline-flex" to="/">
              <ImageApi
                id={logos[0]}
                alt={"Logo Pacto Verde"}
                className={"w-40"}
              />
            </Link>
          ) : ""}
        </div>
      </div>
      <Menu />
    </header>
  );
};

export default Header;
