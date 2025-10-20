import React from 'react'
import "../css/Button.css";

function Button({ text, href = "#" }) {
  return (
    <a className="btn-1" href={href}>
      {text.map((info,index) => (
      <p className={`text-btn ${index === 1 ? "second-text-btn" : ""}`}>{info}</p>

      ))}
    
  </a>
  )
}

export default Button
