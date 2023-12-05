import * as React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <ClipLoader color="#FF2EB6" />
    </div>
  );
};

export default Loader;
