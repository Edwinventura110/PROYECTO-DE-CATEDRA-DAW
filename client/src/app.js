import React from "react";
import { BrowserRouter as Router, Route, Link, Outlet } from "react-router-dom";
import Registro from "./registro";
import MainPage from "./mainPage";

function App() {
  return (
    

    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/registro">Registro</Link>
          </li>
          <li>
            <Link to="/mainPage">MainPage</Link>
          </li>
        </ul>
      </nav>

      <Route path="/registro" element={<Registro />} />
      <Route path="/mainPage" element={<MainPage />} />
    </Router>
  );
}

export default App;
