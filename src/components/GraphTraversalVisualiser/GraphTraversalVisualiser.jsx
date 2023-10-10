import React, { useState } from 'react';
import { Map } from './createMap';
// import { BFS } from './graphAlgorithms/bfs'; 
// import { DFS } from './graphAlgorithms/dfs'; 
// import { UCS } from './graphAlgorithms/ucs'; 
// import { IDS } from './graphAlgorithms/ids'; 
// import { Astar } from './graphAlgorithms/astar'; 
import './GraphTraversalVisualiser.css'; 

const GraphTraversalVisualiser = () => {
  const [graph, setGraph] = useState([]);
  const [algorithm, setAlgorithm] = useState('Reset');
  const [button, setButton] = useState(false);


  const resetGraph = () => {
    // const graph = Map();
    // setGraph(graph.newGraph());
    let n =50;
    const newGraph = []
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push(0); 
      }
      newGraph.push(row);
    } 
      setGraphVisuals(newGraph);
      setGraph(newGraph);
  };

  const setGraphVisuals = (graph) => {
    const graphItem = document.getElementsByClassName('grid-item');
    // const graph =

    console.log(Object.keys(graphItem));
    for (let i = 0; i <= graphItem.length; i ++){
      // for (let j = 0; j <= graphItem[i].length; j++){
        // barOneStyle.backgroundColor = color;
        // const barOneStyle = arrayBars[barOneIdx].style; 
      console.log("4");
        // console.log(graphItem[i][j])
        // graphItem[i][j].style.backgroundColor = "red";
      // }
    }




    // const arrayBars = document.getElementsByClassName('array-bar'); // select the array bars html
    // let current_animation = {'compare': []}; // we compare this to the first animation
    //   for (let i = 0; i < animations.length; i++) {
    //     // if the current item in animations is a dictionary change the color
    //     if (animations[i].constructor === Object){
    //       const barOneIdx = (animations[i].compare[0]); // select the first bar index
    //       const barTwoIdx = (animations[i].compare[1]); // select the second bar index
    //       const barOneStyle = arrayBars[barOneIdx].style; 
    //       const barTwoStyle = arrayBars[barTwoIdx].style;
    //       let color = PRIMARY_COLOR; 
    //       // If the animation is the same as the previous one this means that we are only adding it
    //       // to show the values we are currently comparing. So we change the color of them.
    //       if (JSON.stringify(animations[i].compare) === JSON.stringify(current_animation.compare)){
    //         color = SECONDARY_COLOR;
    //       }
    //       current_animation = animations[i];
    //       setTimeout(() => {
    //         barOneStyle.backgroundColor = color;
    //         barTwoStyle.backgroundColor = color;
    //       }, i * ANIMATION_SPEED_MS);
    //     } 
  }


  

  const handleSubmit = (event) => {

    let method = algorithm;
    let time = 0;
    disableButtons();
    if (method === 'Merge') {
      // time = startSorting(getMergeSortAnimations(array));
      // time = mergeSort();
    } else if (method === 'Bubble') {
      // time = startSorting(getBubbleSortAnimations(array));
    } else if (method === 'Reset') {
      resetGraph();
      enableButtons(1);
    } else if (method === 'Insertion') {
      // time = startSorting(getInsertionSortAnimations(array));
    } else if (method === 'Selection') {
      // time = startSorting(getSelectionSortAnimations(array));

    }

    enableButtons(time);
    event.preventDefault();
  };

  const handleChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const disableButtons = () => {
    setButton(true);
  };

  const enableButtons = (time) => {
    setTimeout(() => {
      setButton(false);
    }, time);
  };



  return (
    <div className="GraphTraversalVisualiser">
      <div className="graph-container">
        <table>
          <tbody>
            {graph.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={"grid-item"}>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ text: 'black' }} className="custom-select">
      <form onSubmit={handleSubmit}>
            <label htmlFor='algorithm' className='label'>Algorithms: 
              <select className='menu' id='menu' value={algorithm} onChange={handleChange}>
                <option value='Reset'>Reset Array</option>
                <option value='BFS'>BFS</option>
                <option value='DFS'>DFS</option>
                <option value='UCS'>UCS</option>
                <option value='Astar'>Astar</option>
                <option value='IDS'>IDS</option>
              </select>
            </label>
            <input style={{ color: 'black' }} className="btn" type="submit" value="Submit" disabled={button} />
          </form>
      </div>
    </div>
  );
};


export default GraphTraversalVisualiser;


// function randInts(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
