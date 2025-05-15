import React, { useState, useEffect } from 'react';
import "./Graphs.css"
import { UCS } from './graphAlgorithms/ucs';
import { BFS } from './graphAlgorithms/bfs';
import { DFS } from './graphAlgorithms/dfs';
import { conflict } from './graphAlgorithms/helper';

const MatrixVisualization = () => {
  const [matrix, setMatrix] = useState([]);
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [objectives, setObjectives] = useState([]);
  // const [weights, setWeights] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [algorithm, setAlgorithm] = useState('Reset');
  const [button] = useState(false);

  useEffect(() => {
    generateMatrix();
  }, []);

  // generate a new matrix
  const generateMatrix = () => {
    const n = 30
    const newMatrix = Array.from({ length: n }, () => Array(n).fill(" ")); // generate array
    const objectivesArray = []; // array to hold bojectives
    const obstaclesArray = []; // array to hold obstacles
    const indices = {}; // dictionary to hold indicies to avoid overlap
    const numObjectives = 2; // number of objectives
    const numObstacles = 100; // number of obstacles
    let x = Math.floor(Math.random() * (newMatrix.length)); // a random x cord
    let y = Math.floor(Math.random() * (newMatrix[0].length)); // a randon y cord
    setStart({ row: x, col: y }); // set the starting point
    indices[`${x},${y}`] = 0; // add starting point to indices
    
    // generate the map
    while (Object.keys(indices).length < numObjectives + numObstacles) {
      x = Math.floor(Math.random() * (newMatrix.length)); // new x cord
      y = Math.floor(Math.random() * (newMatrix[0].length)); // new y cord
  
      if (indices.hasOwnProperty(`${x},${y}`)) { // if its an index we have been to ignore it
        continue;
      } else {
        if (Object.keys(indices).length > numObjectives - 1) {
          if (conflict(x, y, newMatrix)) { // if there is a conflic ignore the index
            continue;
          } else {
            obstaclesArray.push({ row: x, col: y }); // add to obstacles
            indices[`${x},${y}`] = 0;
            newMatrix[x][y] = "w";
          }
        } else {
          objectivesArray.push({ row: x, col: y }); // add to objectives
          indices[`${x},${y}`] = 0;
        }
      }
    }
    // set the approriate obstacles, objectives and new matrix/grid
    setObjectives(objectivesArray);
    setObstacles(obstaclesArray);
    // setWeights(weightsArray);
    setMatrix(newMatrix);
  };

  // reset the matrix
  const resetMatrix = () => {
    clearPath(); // remove the previously drawn path
    generateMatrix(); // generate a new matrix
  };

  const colorNodes = (path, expanded) => {
    path.forEach(node => {
      const [row, col] = node;
      const nodeElement = document.querySelector(`.matrix-row-${row} .col-index-${col}`);
      if (nodeElement) {
        if (!(nodeElement.classList.contains('objective')) && !(nodeElement.classList.contains('start'))){
          nodeElement.classList.add('path');          
        }
      }});

    if (expanded){
    expanded.forEach(node => {
      const [row, col] = node;
      const nodeElement = document.querySelector(`.matrix-row-${row} .col-index-${col}`);
      if (nodeElement) {
        if (!(nodeElement.classList.contains('path')) && !(nodeElement.classList.contains('objective')) && !(nodeElement.classList.contains('start'))){
          nodeElement.classList.add('expanded');          
        } 
      }});
    }
    }

  // clear the old path
  const clearPath = () => {
    const pathNodes = document.querySelectorAll('.path');
    pathNodes.forEach((node) => {
      node.classList.remove('path');
    });
    const expandedNodes = document.querySelectorAll('.expanded');
    expandedNodes.forEach((node) => {
      node.classList.remove('expanded');
    });
  };

  const handleSubmit = (event) => {
    let method = algorithm;
    if (method === 'astar') {
      // 
    } else if (method === 'BFS') {
      // console.log(objectives)
      const result = BFS(matrix, [start.row, start.col], [objectives[0].row, objectives[0].col]); 
      colorNodes(result.path, result.expanded);
    } else if (method === 'Reset') {
      resetMatrix();
    } else if (method === 'DFS') {
      const result = DFS(matrix,[start.row, start.col], [objectives[0].row, objectives[0].col]); 
      colorNodes(result.path, result.expanded);
    } else if (method === 'UCS') {
      const result = UCS(matrix, [start.row, start.col], [objectives[0].row, objectives[0].col]); 
      console.log(result.expanded); 
      colorNodes(result.path, result.expanded);
    }

    event.preventDefault();
  };

  const handleChange = (event) => {
    setAlgorithm(event.target.value);
  };


  return (
    <div className="GraphTraversalVisualiser container d-flex flex-column align-items-center py-4">

  {/* Matrix Grid */}
  <div className="matrix-container d-flex flex-column mb-4">
    {matrix.map((row, rowIndex) => (
      <div key={rowIndex} className={`matrix-row d-flex`}>
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className={`matrix-cell text-center border
              ${start.row === rowIndex && start.col === colIndex ? 'start' : ''}
              ${objectives.some(obj => obj.row === rowIndex && obj.col === colIndex) ? 'objective' : ''}
              ${obstacles.some(obs => obs.row === rowIndex && obs.col === colIndex) ? 'obstacle' : ''}
            `}
          >
            {cell}
          </div>
        ))}
      </div>
    ))}
  </div>

  {/* Legend */}
  <div className="legend mb-4 text-center">
    <ul className="list-inline">
      <li className="list-inline-item px-2"><span className="legend-box start"></span> Start</li>
      <li className="list-inline-item px-2"><span className="legend-box objective"></span> Objective</li>
      <li className="list-inline-item px-2"><span className="legend-box path"></span> Path</li>
      <li className="list-inline-item px-2"><span className="legend-box obstacle"></span> Obstacle</li>
      <li className="list-inline-item px-2"><span className="legend-box expanded"></span> Expanded Nodes</li>
      <li className="list-inline-item px-2"><span className="legend-box weight"></span> Weighted</li>
    </ul>
  </div>

  {/* Form */}
  <form onSubmit={handleSubmit} className="p-3 border rounded bg-light shadow w-100" style={{ maxWidth: '400px' }}>
    <div className="mb-3">
      <label htmlFor="menu" className="form-label fw-bold">Algorithm:</label>
      <select
        className="form-select"
        id="menu"
        value={algorithm}
        onChange={handleChange}
      >
        <option value="Reset">Reset Array</option>
        <option value="BFS">BFS</option>
        <option value="DFS">DFS</option>
        <option value="UCS">UCS</option>
        <option value="Astar">Astar</option>
      </select>
    </div>
    <input
      className="btn btn-primary w-100"
      type="submit"
      value="Submit"
      disabled={button}
    />
  </form>
</div>

  );
};

export default MatrixVisualization;