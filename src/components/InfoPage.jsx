// InfoPage.jsx
import React, { useState, useEffect } from "react";
import data from "../data.json";
import "../css/InfoPage.css";
import homeIcon from "../assets/images/icons/home.svg";
import InfoCarousel from "./InfoCarousel";
import VideosContainer from "./VideosContainer";

function InfoPage({ chosenRole, setChosenRole, stopAudio, startAudio, setShowMuteButton }) {
  const [showVideos, setShowVideos] = useState(false);
  const [introInfoIndex, setIntroInfoIndex] = useState(0);
  const [isIndexTwo, setIsIndexTwo] = useState(false);

  useEffect(() => {
    if (introInfoIndex === 2) {
      setIsIndexTwo(true);
    }
  }, [introInfoIndex]);

  // ✅ עוצר מוזיקה כשנכנסים לסרטונים
  useEffect(() => {
    if (showVideos) {
      stopAudio?.();
      setShowMuteButton(false); // מסתיר את כפתור הסאונד
    } else {
      setShowMuteButton(true); // מחזיר את הכפתור
    }
  }, [showVideos]);

  function backToOpenPage() {
    setChosenRole(-1);
    startAudio?.();
    setShowMuteButton(true);
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
      {!showVideos && (
        <>
          <InfoCarousel
            chosenRole={chosenRole}
            activeIndex={introInfoIndex}
            setActiveIndex={setIntroInfoIndex}
          />
          {isIndexTwo && (
            <div className="arrow" onClick={() => setShowVideos(true)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </>
      )}
      {showVideos && <VideosContainer chosenRole={chosenRole} />}
    </div>
  );
}

export default InfoPage;
