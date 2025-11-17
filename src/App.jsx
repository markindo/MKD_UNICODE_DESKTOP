// import { ipcRenderer } from "electron";

import "./App.css";
// import TopNav from "./frontend/component/Topnav";
// import CardPrinter from "./frontend/component/CardPrinter";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { Dashboard } from "./frontend/dashboard";
import { Home } from "./frontend/Home/Home";
import { Job } from "./frontend/Job";
import TopNav from "./frontend/componentxx/Topnav";
import Footer from "./frontend/componentxx/Footer";
import { Login } from "./frontend/componentxx/Login";
import { useState } from "react";
// import { AddPrinter } from "./component/";
function App() {
  // async function handleLogin() {
  //   const getLogin = window.be.login("admin")
  //   console.log(getLogin)
  //   return true;
  // }
  const [openLogin, setOpenLogin] = useState(true);
  return (
    <Router>
      {/* <Login openLogin={openLogin} setOpenLogin={setOpenLogin}>
      </Login> */}
      <div className={`fixed top-0 left-0 right-0 z-50`}>
        <TopNav login={openLogin} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<Job />} />
        {/* <Route path="/add-printer" element={<AddPrinter />} /> */}
      </Routes>
      <div>
        <br></br>
        <br />
        {/* <Footer></Footer> */}
      </div>

    </Router>

  )
}

export default App;
