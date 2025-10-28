import React, { useState } from "react";
import "../css/LomdaInfo.css"; 
import tillLogo from '../assets/images/logos/til.png';

const LomdaInfo = () => {
  const [showInfo, setShowInfo] = useState(false);

  // Instead of an object → use an array of objects for flexibility
  const infoArray = [
    { title: "מפתחת לומדה:", values: ["סמל דני שריקי"] },
    { title: "גרפיקאית:", values: ["סמל דני שריקי"] },
    { 
      title: "מומחי תוכן:", 
      values: [
        'סמ"ר עומר בר'
      ] 
    },
    { title: "רמ\"ד טי\"ל:", values: ["רס\"מ עדן בן חמו"] },
    { title: "גרסה:", values: ["אוקטובר 2025"] },
  ];

  return (
    <div id="lomda-info">
      <p 
        className="btn-info" 
        onClick={() => setShowInfo(prev => !prev)}
      >
        i
      </p>
      {showInfo && (
        <div className="info-container ">
        
          <ul className="info-list">
            {infoArray.map(({ title, values }) => (
              <li key={title} className="info">
                <span className="info-title">{title}</span>
                <br />
                {values.map((v, i) => (
                  <span key={i} className="info-value">{v}<br/></span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LomdaInfo;
