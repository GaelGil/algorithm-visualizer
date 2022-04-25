import React from "react";
import './AlgorithmVisualizer.css';

export default class AlgorithmVisualizer extends React.Component{
    constructor(props) {
        super(props);
        this.state = { array : [] };
      }


  resetArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(randInts(5, 1000));
    }
    this.setState({array});
  }
    componentDidMount() {
        this.resetArray();
    }



    render() {
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
          </div>
        );
    };

}

// export default AlgorithmVisualizer;


function randInts(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}