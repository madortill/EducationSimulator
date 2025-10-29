import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import logo from "./assets/images/logos/bahadEducation.png";
import tillLogo from "./assets/images/logos/til.png";
import OpenPage from "./components/OpenPage";


function App() {
  return (
    <div className="app">
        {/* <img src={logo} className="logo" alt="logo" /> */}
<OpenPage/>
<img src={tillLogo} className="till-logo" alt="logo" />

    </div>
  );
}

export default App;
