import React, { useEffect, useState } from "react";
import "../css/FullScreenButton.css";
import { Maximize2 } from "lucide-react";

function FullScreenButton({ onStart }) {
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement !== null
  );
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const handleFullScreen = async () => {
    const root = document.documentElement;

    if (!document.fullscreenEnabled) {
      console.warn("Fullscreen not supported — continuing anyway");
      setHidden(true);
      onStart?.(); // מנגן סאונד
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await root.requestFullscreen();
      }
      setHidden(true);
      onStart?.(); // מנגן סאונד
    } catch (err) {
      console.warn("Failed to enter fullscreen:", err);
      setHidden(true);
      onStart?.();
    }
  };

  const handleSkip = () => {
    setHidden(true);
    onStart?.(); // גם כאן נגן סאונד
  };

  if (isFullScreen || hidden) return null;

  return (
    <div className="fullscreen-overlay">
      <div className="fullscreen-card">
        <p className="fullscreen-text">להתחיל סימולציה, עברו למסך מלא</p>
        <button className="fullscreen-btn" onClick={handleFullScreen}>
          <Maximize2 size={28} className="icon" />
          <span>כניסה למסך מלא</span>
        </button>

        <button className="fullscreen-skip" onClick={handleSkip}>
          המשך ללא מסך מלא
        </button>
      </div>
    </div>
  );
}

export default FullScreenButton;
