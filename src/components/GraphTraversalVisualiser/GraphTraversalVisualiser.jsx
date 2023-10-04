import React, { useState } from 'react';
import { BFS } from './graphAlgorithms/bfs'; 
import { DFS } from './graphAlgorithms/dfs'; 
import { UCS } from './graphAlgorithms/ucs'; 
import { IDS } from './graphAlgorithms/ids'; 
import { Astar } from './graphAlgorithms/astar'; 
import './GraphTraversalVisualiser.css'; // You can create a CSS file for styling

const GraphTraversalVisualiser = () => {
  // Define your graph data structure and state here
  const [graph, setGraph] = useState(/* Initialize your graph */);
  const [algorithm, setAlgorithm] = useState('Reset');
  const [current, setCurrent] = useState(false);
  const [button, setButton] = useState(false);

  // Function to visualize BFS
  // const visualiseBFS = () => {
  //   const result = BFS(/* Provide required parameters */);
  //   // Implement the visualization for BFS traversal
  //   // ...
  // };

  // const resetArray = () => {
  //   const newArray = Array.from({ length: 50 }, () => randInts(5, 300));
  //   setGraph(newArray);
  // };


  const startTraversal = () => {

  }

  const handleSubmit = (event) => {

    // let method = algorithm;
    // let time = 0;
    // disableButtons();
    // if (method === 'Merge') {
    //   time = startSorting(getMergeSortAnimations(array));
    //   // time = mergeSort();
    // } else if (method === 'Bubble') {
    //   time = startSorting(getBubbleSortAnimations(array));
    // } else if (method === 'Reset') {
    //   resetArray();
    //   enableButtons(1);
    // } else if (method === 'Insertion') {
    //   time = startSorting(getInsertionSortAnimations(array));
    // } else if (method === 'Selection') {
    //   time = startSorting(getSelectionSortAnimations(array));

    // }

    // enableButtons(time);
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
      {/* Render your graph */}
      <div className="graph-container">
        {/* Graph rendering */}
      </div>
      {/* Add buttons for other traversal algorithms */}
      <div style={{ text: 'black' }} className="custom-select">
          <form onSubmit={handleSubmit}>
            <label htmlFor='algorithm' className='label'>Sorting Algorithms: 
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
