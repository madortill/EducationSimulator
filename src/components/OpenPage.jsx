import React, { useState } from "react";
import Button from "./Button.jsx";
import data from "../data.json";
import "../css/OpenPage.css";
import GradientText from "./GradientText.jsx";
import InfoPage from "./InfoPage.jsx";
import LomdaInfo from './LomdaInfo.jsx';

function OpenPage() {
  const [chosenRole, setChosenRole] = useState(-1);
  function handleClick(event) {
    const indexRole = Number(event.currentTarget.id);
    setChosenRole(indexRole);
  }
  return (
    <div id="open-page">
      {/* <p className='main-headline'>סימולטור חיל חינוך</p> */}
      {chosenRole === -1 && (
        <>
        <LomdaInfo/>
          <GradientText>סימולטור חיל חינוך</GradientText>
          <p className="instruct-open-page">- בחרו בתפקיד -</p>
          <div className="role-btns-container" >
            {data.roles.map((name, index) => (
              <Button text={name} onClick={() => setChosenRole(index)}  key={index} />
            ))}
          </div>
        </>
      )}
      {chosenRole !== -1 &&
      <InfoPage chosenRole={chosenRole} setChosenRole={setChosenRole}/>
      }
    </div>
  );
}

export default OpenPage;
