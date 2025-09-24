import React, { useState } from "react";
import SortingVisualizer from "../components/SortingVisualizer";
import TraversalVisualizer from "../components/TraversalVisualizer";
import { arraysInfo } from "../data/arraysInfo";
import { graphsInfo } from "../data/graphsInfo";

const VisualizersPage: React.FC = () => {
  const [selected, setSelected] = useState<"sorting" | "graph">("sorting"); // declare the default state as string

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Algorithm Visualizers</h1>

      {/* the selection options for sorting options */}
      <div className="mb-4 d-flex justify-content-center">
        <button
          className={`rounded  text-white px-4 py-2 ${
            selected === "sorting" ? "bg-blue-500" : "bg-gray-500"
          }`}
          onClick={() => setSelected("sorting")}
        >
          Sorting Visualizer
        </button>
        <button
          className={`rounded text-white  px-4 py-2  ${
            selected === "graph" ? "bg-blue-500" : "bg-gray-500"
          }`}
          onClick={() => setSelected("graph")}
        >
          Graph Visualizer
        </button>
      </div>

      {/* if the current state of our variable selected=sorting then we load the 
        sorting component with its info, otherwise we will load the traversal
        visualiser component
      */}
      {selected === "sorting" ? (
        <SortingVisualizer arraysInfo={arraysInfo} />
      ) : (
        <TraversalVisualizer graphsInfo={graphsInfo} />
      )}
    </div>
  );
};

export default VisualizersPage;
