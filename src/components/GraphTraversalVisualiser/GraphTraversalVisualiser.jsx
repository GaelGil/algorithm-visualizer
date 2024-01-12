import React, { useState, useEffect } from 'react';
import { getMap } from './createMap';
import './GraphTraversalVisualiser.css';
import { UCS } from './graphAlgorithms/ucs';
import { BFS } from './graphAlgorithms/bfs';
import { DFS } from './graphAlgorithms/dfs';

const GraphTraversalVisualiser = () => {
  const [graph, setGraph] = useState([]);
  const [algorithm, setAlgorithm] = useState('Reset');
  const [button, setButton] = useState(false);
  const [path, setPath] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [startNode, setStartNode] = useState([]);
  const [endNode, setEndNode] = useState([]);

  useEffect(() => {
    // Load the maze grid on page load
    resetGraph();
  }, []); // Empty dependency array to run only once on mount

  // function to reset graph the graph
  const resetGraph = () => {
    let n = 20;
    const newGraph = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push("0");
      }
      newGraph.push(row);
    }
    // set an empty graph
    setGraph([]);
    // create a new graph using createMap.js
    const updatedGraph = getMap(newGraph);
    // update the visuales of the graph
    setGraphVisuals(updatedGraph);
    // set the new graph
    setGraph(updatedGraph);

  };
  
  // clear the old graph of its obstacles and medals
  const setCleanGraph = () => {
    const graph = document.getElementsByClassName('grid-item');
    if (graph[0]){
      for (let i = 0; i < graph.length; i++){
        graph[i].style.backgroundColor = "#282c34";
      }
    }

  }
  
  const colorNodes = () => {
// TODO: make sure path overlaps the expanded if needed but not the other way around
// TODO: currently the the algorithms are showing the viaul path for the grid before
    // color nodes in the path
    path.forEach(node => {
      const [row, col] = node;
      console.log(node)
      const nodeElement = document.querySelector(`.row-index-${row} .grid-item-${col}`);
      if (nodeElement) {
        nodeElement.style.backgroundColor = "green";
      }
    });

    // color nodes in the expanded list
    // expanded.forEach(node => {
    //   const [row, col] = node;
    //   const nodeElement = document.querySelector(`.row-index-${row} .grid-item-${col}`);
    //   if (nodeElement) {
    //     nodeElement.style.backgroundColor = "blue"; // or any color you prefer for expanded nodes
    //   }
    // });
  };
  


  // set the new visuals
  const setGraphVisuals = (graph) => {
    // the graph comes from createmap.js where we create some number of obstacles 
    setCleanGraph(); // clear the old obstacles
    const graphContainer = document.getElementsByClassName('graph-container');
    if (graphContainer){
      for (let i = 0; i < graph.length; i++){
        for (let j = 0; j < graph[i].length; j++){
          let row = "row-index-" + i;
          let col = "grid-item-" + j;
          let node = document.querySelector("." + row + " ." + col);
          if (node){
            if (graph[i][j] === "o"){  // for objective
              node.style.backgroundColor = "green";
              setEndNode([i, j])
            } 
            else if (graph[i][j] === "w"){  // for wall 
              node.style.backgroundColor = "black";
            }
            else if (graph[i][j] === "s"){  // for start
              node.style.backgroundColor = "red";
              setStartNode([i, j])

            }
          }
        }
      }
    }
  }
  

  const handleSubmit = (event) => {

    let method = algorithm;
    // let startNode = []
    let time = 0;
    disableButtons();
    if (method === 'astar') {
      // time = startSorting(getMergeSortAnimations(array));
      // time = mergeSort();
    } else if (method === 'BFS') {
      // time = startSorting(getBubbleSortAnimations(array));
      const result = BFS(graph, startNode, endNode); // replace with your own search function
      setPath(result.path);
      setExpanded(result.expanded);
      colorNodes();
    } else if (method === 'Reset') {
      resetGraph();
      enableButtons(1);
    } else if (method === 'DFS') {
      const result = DFS(graph, startNode, endNode); // replace with your own search function
      setPath(result.path);
      setExpanded(result.expanded);
      colorNodes();
      // time = startSorting(getInsertionSortAnimations(array));
    } else if (method === 'UCS') {
      // time = startSorting(getSelectionSortAnimations(array));
      const result = UCS(graph, startNode, endNode); // replace with your own search function
      setPath(result.path);
      setExpanded(result.expanded);
      colorNodes();

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
              <tr key={rowIndex} className={"row-index row-index-" + rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    value={cell}
                    className={"grid-item grid-item-" + cellIndex}
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