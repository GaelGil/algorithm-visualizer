import React from "react";
import Button from "../Button/button";
import './controler.css'

const Controler = () => {
    return (
        <div className="controler">
            <div className="dropdown">
            <Button className='dropbtn' text="Algorithms"/> 
                <div className="dropdown-content">
                <Button text='Merge Sort' />
                <Button text='Bubble Sort' />
                <Button text='Selection Sort'/>
                <Button text='Insertion Sort'/>   
                </div>
                </div>
        </div>

        )
}

export default Controler;