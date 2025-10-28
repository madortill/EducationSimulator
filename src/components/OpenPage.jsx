import React, { useState } from "react";
import Button from "./Button.jsx";
import data from "../data.json";
import "../css/OpenPage.css";
import GradientText from "./GradientText.jsx";
import InfoPage from "./InfoPage.jsx";
import LomdaInfo from "./LomdaInfo.jsx";
import FullScreenButton from "./FullScreenButton.jsx";
import Aurora from "./Aurora.jsx";

function OpenPage() {
  const [chosenRole, setChosenRole] = useState(-1);
  function handleClick(event) {
    const indexRole = Number(event.currentTarget.id);
    setChosenRole(indexRole);
  }
  return (
    <div id="open-page">
      {/* ✅ כפתור המסך המלא */}
      <FullScreenButton />
      <Aurora
        colorStops={["#66FEE6", "#2BA5F3", "#004EEB"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
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
        <InfoPage chosenRole={chosenRole} setChosenRole={setChosenRole} />
      )}
    </div>
  );
}

export default OpenPage;
