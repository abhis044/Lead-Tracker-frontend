import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Addlead from "./Component/Addlead";
import Editlead from "./Component/Editlead";
import Managelead from "./Component/Managelead";
import Navbar from "./Component/Navbar";
import ViewComm from "./Component/Viewcomm";
import ViewFollowup from "./Component/ViewFollowup";
import Addcomm from "./Component/Addcomm";
import axios from "axios";
import Addfollowup from "./Component/Addfollowup";
import Editcomm from "./Component/Editcomm";
import Editfollowup from "./Component/Editfollowup";

let deleteLead;
function App() {
  const [leads, setLeads] = useState([]);
  const [user, setUser] = useState();
  const getLeads = async () => {
    let { data } = await axios.get("/api");
    setLeads(data.leadinfos);
  };
  useEffect(() => {
    getLeads();
  }, []);
  deleteLead = async (leadid) => {
    await axios.delete(`/api/${leadid}`);
    getLeads();
  };
  // console.log(user.email);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
  }, []);

  return (
    <>
      <BrowserRouter>
        {user && <Navbar user={user} />}
        <Routes>
          {!user && <Route exact path="/" element={<Home />} />}
          <Route exact path="/addlead" element={<Addlead />} />
          <Route exact path="/editlead/:leadId" element={<Editlead />} />
          <Route exact path="/Leads" element={<Managelead leads={leads} />} />
          <Route exact path="/viewcomm/:leadId" element={<ViewComm />} />
          <Route exact path="/viewfollowup/:leadId" element={<ViewFollowup />} />
          <Route exact path="/addcomm" element={<Addcomm/>}/>
          <Route exact path="/addfollowup" element={<Addfollowup/>}/>
          <Route exact path="/editcomm/:commId" element={<Editcomm/>}/>
          <Route exact path="/editfollowup/:followid" element={<Editfollowup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
export { deleteLead };
