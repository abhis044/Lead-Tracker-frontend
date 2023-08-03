import React from "react";
import Leadinfo from "../Leadinfo";

let getcontactedLeads;

const Contacted = (prop) => {
  return (
    <div>
      <Leadinfo data={prop.data} />
    </div>
  );
};

export default Contacted;
