import React, { useState, useEffect, useRef } from "react";
import Button from "./Button.jsx";
import data from "../data.json";
import "../css/OpenPage.css";
import GradientText from "./GradientText.jsx";
import InfoPage from "./InfoPage.jsx";
import LomdaInfo from "./LomdaInfo.jsx";
import FullScreenButton from "./FullScreenButton.jsx";
import Aurora from "./Aurora.jsx";
import startSound from "../assets/sounds/bryaks.wav";
import { Volume2, VolumeX } from "lucide-react";
import logo from "../assets/images/logos/bahadEducation.png";


function OpenPage() {
  const [chosenRole, setChosenRole] = useState(-1);
  const [isMuted, setIsMuted] = useState(false);
  const [showMuteButton, setShowMuteButton] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(startSound);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    audioRef.current.preload = "auto";
    audioRef.current.load();

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const startAudio = () => {
    if (!audioRef.current) return;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("הדפדפן חסם הפעלה אוטומטית של סאונד:", error);
      });
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  };

  return (
    <div id="open-page">
      <FullScreenButton onStart={startAudio} />
      <Aurora
        colorStops={["#66FEE6", "#2BA5F3", "#004EEB"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
<div className="logo-btn-container">

<img src={logo} className="logo" alt="logo" />
      {showMuteButton && (
        <button className="mute-toggle" onClick={toggleMute}>
          {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </button>
      )}
</div>


      {chosenRole === -1 && (
        <>
          <LomdaInfo />
          <GradientText>סימולטור חיל החינוך והנוער</GradientText>
          <p className="instruct-open-page">- בחרו בתפקיד -</p>
          <div className="role-btns-container">
            {data.roles.map((name, index) => (
              <Button
                text={name}
                onClick={() => setChosenRole(index)}
                key={index}
              />
            ))}
          </div>
        </>
      )}
      {chosenRole !== -1 && (
        <InfoPage
          chosenRole={chosenRole}
          setChosenRole={setChosenRole}
          stopAudio={stopAudio}
          startAudio={startAudio}
          setShowMuteButton={setShowMuteButton}
        />
      )}
    </div>
  );
}

export default OpenPage;
