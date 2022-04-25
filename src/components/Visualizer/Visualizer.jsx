import React from "react";
// import './navbar.css'
import Button from "../Button/button";

const Visualizer = () => {
    return (
        const {array} = this.state;

        return (

            <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: "blue",
                  height: `${value}px`,
                }}>
                </div>
            ))}
            <div className="controler">
            <div className="dropdown">
            <Button onClick={this.resetArray} className='dropbtn' text="Algorithms"/> 
                <div className="dropdown-content">
                <Button onClick={this.resetArray} text='Merge Sort'  />
                <Button text='Bubble Sort' />
                <Button text='Selection Sort'/>
                <Button text='Insertion Sort'/>   
                </div>
                </div>
        </div>
          </div>
        );
        )
}



export default Visualizer;