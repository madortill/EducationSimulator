import React from 'react'
import Button from "./Button.jsx";
import data from "../data.json";
import "../css/OpenPage.css";

function OpenPage() {
  return (
    <div id="open-page">
        <p className='main-headline'>סימולטור חיל חינוך</p>
        <p className='instruct-open-page'>- בחרו בתפקיד -</p>
        <div className='role-btns-container'>
        {data.roles.map((name,index) => (
            <Button text={name}/>
        ))}
        </div>
    </div>
  )
}


export default OpenPage
