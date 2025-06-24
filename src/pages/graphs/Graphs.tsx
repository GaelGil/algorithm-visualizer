import React, { useState, useEffect } from 'react';
import "./Graphs.css"
import { UCS } from './graphAlgorithms/ucs';
import { BFS } from './graphAlgorithms/bfs';
import { DFS } from './graphAlgorithms/dfs';
import { ASTAR } from './graphAlgorithms/astar';
import { conflict } from './graphAlgorithms/helper';


const algorithmsInfo = [
  {
    name: 'General',
    description: `In this project you can visualize path finding algorithms.
    Each weighted node has a cost of 5 while non weighted node cost is 1. Below are some basic notes on each algorithm. To learn more
    about the implementation of the algorithms click the link below.`,
    link: 'https://github.com/GaelGil/algorithm-visualizer/tree/main/src/pages/graphs/graphAlgorithms',
  },
  {
    name: 'Breadth First Search (BFS)',
    description: `To implement BFS we use a queue and explore nodes in the order of the queue.
    This algorithm finds the shortest path but not necessarily the quicket path.
    This can be seen above when it goes through weighted graphs.
    Time complexity is O(V+E) where V is vertices (nodes) and E is edges. `,
  },
  {
    name: 'Depth First Search (DFS)',
    description: `To implement BFS we use a stack and explore nodes in the order of the stack.
    This rarely if ever finds the shortest path.
    Because it explores depth wise it will stop until it cannot exlpore any further this can cause it to get lost in a path to nowhere.
    DFS is very similar to BFS except we use a stack instead of a queue.
    Time complexity is O(V+E)`,
  },
  {
    name: 'Uniform Cost Search (UCS)',
    description: `To implement UCS we use a priority queue. 
    UCS is similar to dijkstra however we dont find the shortest path to all nodes just the goal.
    UCS can be used for weighted and non weighted graphs. When a graph is not weighted UCS will act as BFS.
    When a graph is weighted UCS will find the shortest and least costly path. It does this using a priorityqueue
    prioritizing nodes that have a lower cost path`
  },
  {
    name: 'A* (Astar)',
    description: `A* algorithm is very similar to UCS however we use a heuristic to calculate how close we are to our goal.
    What we pass in to our priorityqueue is f = h + g. Where g is the total cost to the node and h is the approximate distance from 
    the node to the destination. The priority here is the f value. This algorithm is an informed algorithm because we are using some
    information on the destination to guide us. This algorithm finds the least costly path. This also expands a less number of nodes
    them all the aobve
  `,
  },
];


const Graphs = () => {
  const [matrix, setMatrix] = useState([]);
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [objectives, setObjectives] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [weights, setWeights] = useState([]);
  const [algorithm, setAlgorithm] = useState('');

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
    setAlgorithm('')
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
    clearPath()
    if (method === 'ASTAR') {
      const result = ASTAR(matrix, [start.row, start.col], [objectives[0].row, objectives[0].col]); 
      colorNodes(result.path, result.expanded);
    } else if (method === 'BFS') {
      const result = BFS(matrix, [start.row, start.col], [objectives[0].row, objectives[0].col]); 
      colorNodes(result.path, result.expanded);
    } else if (method === 'DFS') {
      const result = DFS(matrix,[start.row, start.col], [objectives[0].row, objectives[0].col]); 
      colorNodes(result.path, result.expanded);
    } else if (method === 'UCS') {
      const result = UCS(matrix, [start.row, start.col], [objectives[0].row, objectives[0].col]); 
      colorNodes(result.path, result.expanded);
    } else {
      resetMatrix();
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
              <option value="">Select Algorithm</option>
              <option value='BFS'>BFS</option>
              <option value='DFS'>DFS</option>
              <option value='UCS'>UCS</option>
              <option value='ASTAR'>Astar</option>
            </select>
          </label>
          <input
            className="btn btn-primary"
            type="submit"
            value="Submit"
          />
        <button className='btn btn-secondary' onClick={resetMatrix} value='Submit' type='button'>Reset Matrix</button>
        </form>

      <div className="container mt-5">
      <h2 className="mb-4 text-center">About Pathfinding Algorithms</h2>
      <div className="row">
        {algorithmsInfo.map((algo, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{algo.name}</h5>
                <p className="card-text">{algo.description}</p>
                {algo.link && (
              <>
              {' '}
             <a href={algo.link} target="_blank" rel="noopener noreferrer">Learn more</a>
              </>
              )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>

  );
};

export default Graphs;