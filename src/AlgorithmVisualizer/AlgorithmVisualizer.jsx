import React from "react";
import './AlgorithmVisualizer.css';



export default class AlgorithmVisualizer extends React.Component{
    constructor(props) {
        super(props);
        this.state = { array : [1, 2, 3, 4, 5] };
      }


    render() {
        const {array} = this.state;

        return (
            <>
            {array.map((value, index) => (
                <div className="array-bar" key={index}>{value}</div>
            ))}
            </>
        )
    };

}