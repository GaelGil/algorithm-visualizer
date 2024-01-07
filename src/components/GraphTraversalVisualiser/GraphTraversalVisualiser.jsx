import React, { useState, useEffect } from 'react';
import { getMap } from './createMap';
import './GraphTraversalVisualiser.css';

const GraphTraversalVisualiser = () => {
  const [graph, setGraph] = useState([]);
  const [algorithm, setAlgorithm] = useState('Reset');
  const [button, setButton] = useState(false);

  useEffect(() => {
    // Load the maze grid on page load
    resetGraph();
  }, []); // Empty dependency array to run only once on mount

  const resetGraph = () => {
    let n = 50;
    const newGraph = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push("0");
      }
      newGraph.push(row);
    }
    var graph = getMap(newGraph);
    setGraphVisuals(graph);
    setGraph(graph);
  };

  const setGraphVisuals = (graph) => {
    console.log(graph);
    const graphItem = document.getElementsByClassName('grid-item');
    console.log(graphItem.length);
    for (var i = 0; i < graphItem.length; i++) {
      console.log(graphItem[i]);
      if (graph[i] === "s"){ // need i and j
        graphItem[i].style.backgroundColor = "red";
      }
      else if (graph[i] === "w"){  // need i and j
        graphItem[i].style.backgroundColor ="black";
      }
      if (graph[i] === "o"){ // need i and j
        graphItem[i].style.backgroundColor ="yellow";
      }    
    }
  }
  

  const handleSubmit = (event) => {

    let method = algorithm;
    let time = 0;
    disableButtons();
    if (method === 'astar') {
      // time = startSorting(getMergeSortAnimations(array));
      // time = mergeSort();
    } else if (method === 'BFS') {
      // time = startSorting(getBubbleSortAnimations(array));
    } else if (method === 'Reset') {
      resetGraph();
      enableButtons(1);
    } else if (method === 'DFS') {
      // time = startSorting(getInsertionSortAnimations(array));
    } else if (method === 'UCS') {
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
              <tr key={rowIndex} className={"row-index"}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    value={cell}
                    className={"grid-item"}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ text: 'black' }} className="custom-select">
        <form onSubmit={handleSubmit}>
          <label htmlFor='algorithm' className='label'>
            Algorithms:
            <select
              className='menu'
              id='menu'
              value={algorithm}
              onChange={handleChange}
            >
              <option value='Reset'>Reset Array</option>
              <option value='BFS'>BFS</option>
              <option value='DFS'>DFS</option>
              <option value='UCS'>UCS</option>
              <option value='Astar'>Astar</option>
              <option value='IDS'>IDS</option>
            </select>
          </label>
          <input
            style={{ color: 'black' }}
            className="btn"
            type="submit"
            value="Submit"
            disabled={button}
          />
        </form>
      </div>
    </div>
  );
};

export default GraphTraversalVisualiser;