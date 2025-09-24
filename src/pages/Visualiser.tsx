import React, { useState } from "react";
import SortingVisualizer from "../components/SortingVisualizer";
import TraversalVisualizer from "../components/TraversalVisualizer";
import { arraysInfo } from "../data/arraysInfo";
import { graphsInfo } from "../data/graphsInfo";

const VisualizersPage: React.FC = () => {
  const [selected, setSelected] = useState<"sorting" | "graph">("sorting"); // declare the default state as string

  return (
    <div className="max-w-6xl mx-auto p-8 px-2">
      {/* the selection options for sorting options */}
      <div className="flex mb-6 text-white">
        <button
          className={`rounded px-4 py-2 ${
            selected === "sorting" ? "bg-blue-500" : "bg-gray-500"
          }`}
          onClick={() => setSelected("sorting")}
        >
          Sorting Visualizer
        </button>
        <button
          className={`rounded px-4 py-2  ${
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
