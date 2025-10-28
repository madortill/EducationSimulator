import React, { useEffect, useState } from "react";
import "../css/FullScreenButton.css";
import { Maximize2 } from "lucide-react"; // אייקון מודרני

function FullScreenButton() {
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement !== null
  );

  // האזנה ליציאה/כניסה ממסך מלא
  useEffect(() => {
    const handleChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const handleFullScreen = () => {
    const root = document.documentElement;
    if (!document.fullscreenElement) {
      root.requestFullscreen().catch((err) => {
        console.error("לא ניתן להיכנס למסך מלא:", err);
      });
    }
  };

  // אם כבר במסך מלא — אל תציג כלום
  if (isFullScreen) return null;

  return (
    <div className="fullscreen-overlay">
      <div className="fullscreen-card">
        <p className="fullscreen-text">להתחלת סימולציה, עברו למסך מלא</p>
        <button className="fullscreen-btn" onClick={handleFullScreen}>
          <Maximize2 size={28} className="icon" />
          <span>כניסה למסך מלא</span>
        </button>
      </div>
    </div>
  );
}

export default FullScreenButton;
