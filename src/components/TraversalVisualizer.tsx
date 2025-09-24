import React, { useState, useEffect } from "react";
import AlgorithmForm from "./AlgorithmForm";
import AlgorithmInfo from "./AlgorithmInfo";
import GraphLegend from "./GraphLegend";
import type { GraphProps } from "../types/info";
import type { Item } from "../types/item";
import { UCS } from "../services/graphAlgorithms/ucs";
import { BFS } from "../services/graphAlgorithms/bfs";
import { DFS } from "../services/graphAlgorithms/dfs";
import { ASTAR } from "../services/graphAlgorithms/astar";
import { conflict } from "../services/graphAlgorithms/helper";
import { colorNodes, clearPath } from "../services/utils";

import "../css/Graphs.css";

const TraversalVisualizer: React.FC<GraphProps> = ({ graphsInfo }) => {
  const [matrix, setMatrix] = useState<any[][]>([]);
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [objectives, setObjectives] = useState<Item[]>([]);
  const [obstacles, setObstacles] = useState<Item[]>([]);
  const [weights, setWeights] = useState<Item[]>([]);
  const [algorithm, setAlgorithm] = useState("");
  const [isSorting, setIsSorting] = useState(false);

  // function to generate a new matrix/grid
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
    return newMatrix;
  };

  // function that gets called on component load
  useEffect(() => {
    setMatrix(generateMatrix());
  }, []);

  // function to reset the matrix
  const resetMatrix = () => {
    if (!isSorting) {
      setAlgorithm("");
      clearPath();
      setMatrix(generateMatrix());
    }
  };

  // function to handle if algorithm changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value);
  };
  // function to handle what happens on submit.
  // in our case we will get the paths and expanded nodes and then
  // color the nodes accordingly
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!algorithm || isSorting) return;
    setIsSorting(true);
    let method: string = algorithm;
    let result;
    const startPos = [start.row, start.col];
    const endPos = [objectives[0].row, objectives[0].col];

    switch (method) {
      case "Astar":
        result = ASTAR(matrix, startPos, endPos);
        break;
      case "BFS":
        result = BFS(matrix, startPos, endPos);
        break;
      case "DFS":
        result = DFS(matrix, startPos, endPos);
        break;
      case "UCS":
        result = UCS(matrix, startPos, endPos);
        break;
    }

    if (result) {
      colorNodes(result.path, result.expanded);
    }
    setIsSorting(false);
  };

  // the traversal visualizer component
  return (
    <div className=" ">
      <div className="">
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
      {/* importing legend for our graph/matrix/grid */}
      <GraphLegend />
      {/* importing algorithm form component with sorting specific values */}
      <AlgorithmForm
        value={algorithm}
        options={["Astar", "BFS", "DFS", "UCS"]}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={resetMatrix}
        disabled={isSorting}
      />
      {/* importing algorithm info component with traversal specific values */}
      <AlgorithmInfo info={graphsInfo} name="Traversal" />
    </div>
  );
};

export default TraversalVisualizer;
