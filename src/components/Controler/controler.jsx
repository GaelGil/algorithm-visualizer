import React from "react";
import Button from "../Button/button";
import './controler.css'
import AlgorithmVisualizer from '../../AlgorithmVisualizer/AlgorithmVisualizer'

const Controler = () => {
    return (
        <div className="controler">
            <div className="dropdown">
            <Button onClick={() => AlgorithmVisualizer.resetArray} className='dropbtn' text="Algorithms"/> 
                <div className="dropdown-content">
                <Button onClick={() => console.log('here')} text='Merge Sort'  />
                <Button text='Bubble Sort' />
                <Button text='Selection Sort'/>
                <Button text='Insertion Sort'/>   
                </div>
                </div>
        </div>

        )
}

export default Controler;