import React, { useEffect, useState } from "react";
import "../css/FullScreenButton.css";
import { Maximize2 } from "lucide-react";

function FullScreenButton() {
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement !== null
  );
  const [skipped, setSkipped] = useState(false);

  // האזנה לשינויים במסך מלא
  useEffect(() => {
    const handleChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const handleFullScreen = async () => {
    const root = document.documentElement;

    // אם הדפדפן לא תומך בכלל במסך מלא
    if (!document.fullscreenEnabled) {
      console.warn("Fullscreen not supported — continuing anyway");
      setSkipped(true);
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await root.requestFullscreen();
      }
    } catch (err) {
      console.warn("Failed to enter fullscreen:", err);
      // לא נתמך או נחסם → ממשיכים בלי מסך מלא
      setSkipped(true);
    }
  };

  // אם כבר במסך מלא או המשתמש דילג — לא מציגים את המסך
  if (isFullScreen || skipped) return null;

  return (
    <div className="fullscreen-overlay">
      <div className="fullscreen-card">
        <p className="fullscreen-text">להתחיל סימולציה, עברו למסך מלא</p>
        <button className="fullscreen-btn" onClick={handleFullScreen}>
          <Maximize2 size={28} className="icon" />
          <span>כניסה למסך מלא</span>
        </button>

        {/* כפתור המשך ללא מסך מלא */}
        <button
          className="fullscreen-skip"
          onClick={() => setSkipped(true)}
        >
          המשך ללא מסך מלא
        </button>
      </div>
    </div>
  );
}

export default FullScreenButton;
