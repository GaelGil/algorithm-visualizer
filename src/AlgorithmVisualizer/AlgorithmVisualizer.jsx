import React from "react";
import './AlgorithmVisualizer.css';



export default class AlgorithmVisualizer extends React.Component{
    constructor(props) {
        super(props);
        this.state = { array : [] };
      }


    setArray(){
        let array = [];
        for (let i = 0; i < 100; i ++){
            array.push(randInts(5, 1000));
        }
        this.setState({array})
    }

    componentDidMount() {
        this.setArray();
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array">
            {array.map((value, index) => (
                <div className="array-bar" key={index}>{value}</div>
            ))}
            </div>
        )
    };

}


function randInts(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}