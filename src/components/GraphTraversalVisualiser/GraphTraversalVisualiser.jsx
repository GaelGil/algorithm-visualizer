import React, { useState, useEffect } from 'react';
import "./GraphTraversalVisualiser.css"
import { UCS } from './graphAlgorithms/ucs';
import { BFS } from './graphAlgorithms/bfs';
import { DFS } from './graphAlgorithms/dfs';

const MatrixVisualization = () => {
  const [matrix, setMatrix] = useState([]);
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [objective, setObjective] = useState({ row: 0, col: 0 });

  const [objectives, setObjectives] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [algorithm, setAlgorithm] = useState('Reset');
  const [button, setButton] = useState(false);


  useEffect(() => {
    generateMatrix();
  }, []);

  const generateMatrix = () => {
    const newMatrix = Array.from({ length: 30 }, () => Array(30).fill(" "));

    const randomRow = Math.floor(Math.random() * 30);
    const randomCol = Math.floor(Math.random() * 30);

    setStart({ row: randomRow, col: randomCol });

    const objectivesCount = Math.floor(Math.random() * 1) + 1;
    const objectivesArray = [];
    for (let i = 0; i < objectivesCount; i++) {
      const objRow = Math.floor(Math.random() * 30);
      const objCol = Math.floor(Math.random() * 30);
      objectivesArray.push({ row: objRow, col: objCol });
    }

    setObjectives(objectivesArray);

    const obstaclesCount = Math.floor(Math.random() * 10);
    const obstaclesArray = [];
    for (let i = 0; i < obstaclesCount; i++) {
      const obsRow = Math.floor(Math.random() * 30);
      const obsCol = Math.floor(Math.random() * 30);
      obstaclesArray.push({ row: obsRow, col: obsCol });
    }

    setObstacles(obstaclesArray);

    setMatrix(newMatrix);
  };

  const resetMatrix = () => {
    generateMatrix();
  };

  const colorNodes = (path) => {
    // TODO: make sure path overlaps the expanded if needed but not the other way around
    // TODO: currently the the algorithms are showing the viaul path for the grid before
        // color nodes in the path
        console.log(path);
        path.forEach(node => {
          const [row, col] = node;
          const nodeElement = document.querySelector(`.row-index-${row} .grid-item-${col}`);
          if (nodeElement) {
            nodeElement.style.backgroundColor = "green";
          }
        });
      }

  const handleSubmit = (event) => {
    let method = algorithm;
    let time = 0;
    disableButtons();
    if (method === 'astar') {
      // time = startSorting(getMergeSortAnimations(array));
      // time = mergeSort();
    } else if (method === 'BFS') {
      const result = BFS(matrix, [start.row, start.col], objectives[0]); // replace with your own search function
     console.log(result)
      colorNodes(result.path);
    } else if (method === 'Reset') {
      resetMatrix();
      enableButtons(1);
    } else if (method === 'DFS') {
      const result = DFS(matrix,[start.row, start.col], objectives[0]); // replace with your own search function
      // colorNodes();
      // time = startSorting(getInsertionSortAnimations(array));
    } else if (method === 'UCS') {
      // time = startSorting(getSelectionSortAnimations(array));
      const result = UCS(matrix, [start.row, start.col], objectives[0]);; // replace with your own search function
      // colorNodes();

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
    <div className='GraphTraversalVisualiser'>
      {/* <div className='graph-container'> */}
      <div className="matrix-container">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="matrix-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`matrix-cell ${start.row === rowIndex && start.col === colIndex ? 'start' : ''}
                            ${objectives.some(obj => obj.row === rowIndex && obj.col === colIndex) ? 'objective' : ''}
                            ${obstacles.some(obs => obs.row === rowIndex && obs.col === colIndex) ? 'obstacle' : ''}`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
          <label htmlFor='algorithm' className='label'>
            Algorithms:
            <select
              className='menu'
              id='menu'
              value={algorithm}
              onChange={handleChange}>
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
      {/* </div> */}
    </div>
  );
};

export default MatrixVisualization;
