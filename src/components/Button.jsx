import React from 'react'
import "../css/Button.css";

function Button({ text, onClick}) {
  return (
    <a className="btn-1" onClick={onClick} >
      {text.map((info,index) => (
      <p key={index} className={`text-btn ${index === 1 ? "second-text-btn" : ""}`}>{info}</p>

      ))}
    
  </a>
  )
}

export default Button
