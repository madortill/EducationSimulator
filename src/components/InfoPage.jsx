import React, { useState } from "react";
import data from "../data.json";
import "../css/InfoPage.css";
import homeIcon from "../assets/images/icons/home.svg";
import InfoCarousel from "./InfoCarousel";

function InfoPage({ chosenRole, setChosenRole }) {
  function backToOpenPage() {
    setChosenRole(-1);
  }
  return (
    <div className="info-page">
      <div className="head-container">
        <img
          src={homeIcon}
          alt="homeIcon"
          className="home-icon"
          onClick={backToOpenPage}
        />
        <p className="role-name">{data.roles[chosenRole][0]}</p>
      </div>
<InfoCarousel chosenRole={chosenRole}/>

    </div>
  );
}

export default InfoPage;
