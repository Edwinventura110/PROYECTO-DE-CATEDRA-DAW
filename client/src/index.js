import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Route as R } from "react-router-dom";
import Registro from "./registro";
import Mainpage from "./mainPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <R path="/" element={<Registro />} />
      <R path="/mainPage" element={<Mainpage />} />
    </Routes>
  </Router>
);
