import React from "react";
import '../css/GradientText.css';


function GradientText({
  children,
  className = "",
  colors = ["#4ADEFF", "white", "#4ADEFF", "white", "#4ADEFF"],
  animationSpeed = 10,
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };
  return (
    <div className={`animated-gradient-text ${className}`}>
      {showBorder && (
        <div className="gradient-overlay" style={gradientStyle}></div>
      )}
      <div className="text-content" style={gradientStyle}>
        {children}
      </div>
    </div>
  );
}

export default GradientText;
