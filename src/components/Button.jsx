import React from 'react';
import "../css/Button.css";

function Button({ text, onClick }) {
  // נוודא שתמיד יש לנו מערך (גם אם זה רק שורה אחת)
  const textArray = Array.isArray(text) ? text : [text];

  return (
    <a className="btn-1" onClick={onClick}>
      {textArray.map((info, index) => (
        <p
          key={index}
          className={`text-btn ${index === 1 ? "second-text-btn" : ""}`}
        >
          {info}
        </p>
      ))}
    </a>
  );
}

export default Button;
