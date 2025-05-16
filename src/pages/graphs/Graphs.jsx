import React, { useState, useEffect } from 'react';
import "./Graphs.css"
import { UCS } from './graphAlgorithms/ucs';
import { BFS } from './graphAlgorithms/bfs';
import { DFS } from './graphAlgorithms/dfs';
import { ASTAR } from './graphAlgorithms/astar';
import { conflict } from './graphAlgorithms/helper';

const MatrixVisualization = () => {
  const [matrix, setMatrix] = useState([]);
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [objectives, setObjectives] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [weights, setWeights] = useState([]);
  const [algorithm, setAlgorithm] = useState('Reset');
  const [button] = useState(false);

  useEffect(() => {
    generateMatrix();
  }, []);

  // generate a new matrix
  const generateMatrix = () => {
    const n = 30 // nxn array
    const newMatrix = Array.from({ length: n }, () => Array(50).fill(" ")); // generate array
    const objectivesArray = []; // array to hold bojectives
    const obstaclesArray = []; // array to hold obstacles
    const weightsArray = []; // array to hold obstacles
    // const indices = {}; // dictionary to hold indicies to avoid overlap
    const numObjectives = 1; // number of objectives
    const numObstacles = 100; // number of obstacles
    const numWeights = 50; // number of weights
    let placed = 0;
    // create and set the starting point
    let x = Math.floor(Math.random() * (newMatrix.length)); 
    let y = Math.floor(Math.random() * (newMatrix[0].length)); 
    
    setStart({ row: x, col: y }); 
    newMatrix[x][y] = 's';


    while (placed < numObjectives + numObstacles + numWeights){
      // generate random x and y cord 
      x = Math.floor(Math.random() * (newMatrix.length));
      y = Math.floor(Math.random() * (newMatrix[0].length));
      if (!conflict(x, y, newMatrix)){ // if not conflict 
        if (placed === 0){
            objectivesArray.push({ row: x, col: y }); // add to objective
            newMatrix[x][y] = 'o';
        }
        else if (placed >= numObjectives && placed <= numObjectives+numObstacles){
            obstaclesArray.push({ row: x, col: y }); // add to obstacles
            newMatrix[x][y] = 'w';
        }
        else {
            weightsArray.push({ row: x, col: y }); // add to weight
            newMatrix[x][y] = 'e';
        }
        placed += 1
      }
    }


    setObjectives(objectivesArray);
    setObstacles(obstaclesArray);
    setWeights(weightsArray);
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
    if (method === 'ASTAR') {
      const result = ASTAR(matrix, [start.row, start.col], [objectives[0].row, objectives[0].col]); 
      colorNodes(result.path, result.expanded);
    } else if (method === 'BFS') {
      const result = BFS(matrix, [start.row, start.col], [objectives[0].row, objectives[0].col]); 
      colorNodes(result.path, result.expanded);
    } else if (method === 'Reset') {
      resetMatrix();
    } else if (method === 'DFS') {
      const result = DFS(matrix,[start.row, start.col], [objectives[0].row, objectives[0].col]); 
      colorNodes(result.path, result.expanded);
    } else if (method === 'UCS') {
      const result = UCS(matrix, [start.row, start.col], [objectives[0].row, objectives[0].col]); 
      colorNodes(result.path, result.expanded);
    }
    event.preventDefault();
  };

  const handleChange = (event) => {
    setAlgorithm(event.target.value);
  };


  return (
    <div className='GraphTraversalVisualiser container d-flex flex-column align-items-center py-4'>
      <div className="matrix-container d-flex flex-column mb-4">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className={"matrix-row matrix-row-"+rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`matrix-cell
                            ${start.row === rowIndex && start.col === colIndex ? 'start' : ''}
                            ${objectives.some(obj => obj.row === rowIndex && obj.col === colIndex) ? 'objective' : ''}
                            ${obstacles.some(obs => obs.row === rowIndex && obs.col === colIndex) ? 'obstacle' : ''} 
                            ${weights.some(weight => weight.row === rowIndex && weight.col === colIndex) ? 'weight' : ''}
                            col-index-${colIndex}`}>
                {cell}
              </div> 
            ))}
          </div>
        ))}
      </div>
      <div className='legend mb-4 text-center'>
          <ul>
            <li className='start'>Start</li>
            <li className='objective'>Objective</li>
            <li className='path'>Path</li>
            <li className='obstacle'>Obstacle</li>
            <li className='expanded'>Expanded Nodes</li>
            <li className='weight'>Weighted (ignored for bfs and dfs)</li>
          </ul>
        </div>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light shadow w-100" style={{ maxWidth: '400px' }}>
          <label htmlFor='algorithm' className='form-label fw-bold'>
            Algorithms:
            <select
              className='form-select'
              id='menu'
              value={algorithm}
              onChange={handleChange}>
              <option value='Reset'>Reset Array</option>
              <option value='BFS'>BFS</option>
              <option value='DFS'>DFS</option>
              <option value='UCS'>UCS</option>
              <option value='ASTAR'>Astar</option>
            </select>
          </label>
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