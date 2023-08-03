import React from "react";
import Leadinfo from "./Leadinfo";

const Leadmanage = (prop) => {
  console.log("abhishek")
  return (
    <div>
      <Leadinfo data={prop.data} />
    </div>
  );
};

export default Leadmanage;
