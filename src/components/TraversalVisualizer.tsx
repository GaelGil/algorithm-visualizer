import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AlgorithmForm from "./AlgorithmForm";
import AlgorithmInfo from "./AlgorithmInfo";
import type { GraphProps } from "../types/info";
import { conflict } from "../services/graphAlgorithms/helper";
import type { Item } from "../types/item";
import "../css/Graphs.css";

const TraversalVisualizer: React.FC<GraphProps> = ({ graphsInfo }) => {
  const [matrix, setMatrix] = useState<any[][]>([]);
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [objectives, setObjectives] = useState<Item[]>([]);
  const [obstacles, setObstacles] = useState<Item[]>([]);
  const [weights, setWeights] = useState<Item[]>([]);
  const [algorithm, setAlgorithm] = useState("");
  const [isSorting, setIsSorting] = useState(false);

  const generateMatrix = () => {
    const n = 30; // nxn array
    const newMatrix = Array.from({ length: n }, () => Array(50).fill(" ")); // generate array
    const objectivesArray = []; // array to hold bojectives
    const obstaclesArray = []; // array to hold obstacles
    const weightsArray = []; // array to hold obstacles
    const numObjectives = 1; // number of objectives
    const numObstacles = 100; // number of obstacles
    const numWeights = 50; // number of weights
    let placed = 0;
    // create and set the starting point
    let x = Math.floor(Math.random() * newMatrix.length);
    let y = Math.floor(Math.random() * newMatrix[0].length);

    setStart({ row: x, col: y });
    newMatrix[x][y] = "s";

    while (placed < numObjectives + numObstacles + numWeights) {
      // generate random x and y cord
      x = Math.floor(Math.random() * newMatrix.length);
      y = Math.floor(Math.random() * newMatrix[0].length);
      if (!conflict(x, y, newMatrix)) {
        // if not conflict
        if (placed === 0) {
          objectivesArray.push({ row: x, col: y }); // add to objective
          newMatrix[x][y] = "o";
        } else if (
          placed >= numObjectives &&
          placed <= numObjectives + numObstacles
        ) {
          obstaclesArray.push({ row: x, col: y }); // add to obstacles
          newMatrix[x][y] = "w";
        } else {
          weightsArray.push({ row: x, col: y }); // add to weight
          newMatrix[x][y] = "e";
        }
        placed += 1;
      }
    }

    setObjectives(objectivesArray);
    setObstacles(obstaclesArray);
    setWeights(weightsArray);
    // setMatrix(newMatrix);
    return newMatrix;
  };

  useEffect(() => {
    setMatrix(generateMatrix());
  }, []);

  const resetMatrix = () => {
    if (!isSorting) {
      setMatrix(generateMatrix());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!algorithm || isSorting) return;
    setIsSorting(true);

    // await fakeSort(array, setArray, algorithm);

    setIsSorting(false);
  };

  return (
    <div className="GraphTraversalVisualiser container d-flex flex-column align-items-center py-4">
      <div className="matrix-container d-flex flex-column mb-4">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className={"matrix-row matrix-row-" + rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`matrix-cell
                            ${
                              start.row === rowIndex && start.col === colIndex
                                ? "start"
                                : ""
                            }
                            ${
                              objectives.some(
                                (obj) =>
                                  obj.row === rowIndex && obj.col === colIndex
                              )
                                ? "objective"
                                : ""
                            }
                            ${
                              obstacles.some(
                                (obs) =>
                                  obs.row === rowIndex && obs.col === colIndex
                              )
                                ? "obstacle"
                                : ""
                            } 
                            ${
                              weights.some(
                                (weight) =>
                                  weight.row === rowIndex &&
                                  weight.col === colIndex
                              )
                                ? "weight"
                                : ""
                            }
                            col-index-${colIndex}`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="legend mb-4 text-center">
        <ul>
          <li className="start">Start</li>
          <li className="objective">Objective</li>
          <li className="path">Path</li>
          <li className="obstacle">Obstacle</li>
          <li className="expanded">Expanded Nodes</li>
          <li className="weight">Weighted (ignored for bfs and dfs)</li>
        </ul>
      </div>
      <AlgorithmForm
        value={algorithm}
        options={["Astar", "BFS", "DFS", "UCS"]}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={resetMatrix}
        disabled={isSorting}
      />

      <Container className="mt-5">
        <h2 className="text-center mb-4">About Sorting Algorithms</h2>
        <AlgorithmInfo items={graphsInfo} />
      </Container>
    </div>
  );
};

export default TraversalVisualizer;
