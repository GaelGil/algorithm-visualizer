import React, { useState } from "react";
import { Container, ButtonGroup, ToggleButton } from "react-bootstrap";
import SortingVisualizer from "../components/SortingVisualizer";
import TraversalVisualizer from "../components/TraversalVisualizer";
import { arraysInfo } from "../data/arraysInfo";
import { graphsInfo } from "../data/graphsInfo";

const VisualizersPage: React.FC = () => {
  const [selected, setSelected] = useState<"sorting" | "graph">("sorting"); // declare the default state as string

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Algorithm Visualizers</h1>

      {/* the selection options for sorting options */}
      <ButtonGroup className="mb-4 d-flex justify-content-center">
        <ToggleButton
          id="sorting-toggle"
          type="radio"
          variant="outline-primary"
          name="visualizer"
          value="sorting"
          checked={selected === "sorting"}
          onChange={() => setSelected("sorting")}
        >
          Sorting Visualizer
        </ToggleButton>
        <ToggleButton
          id="graph-toggle"
          type="radio"
          variant="outline-secondary"
          name="visualizer"
          value="graph"
          checked={selected === "graph"}
          onChange={() => setSelected("graph")}
        >
          Graph Visualizer
        </ToggleButton>
      </ButtonGroup>

      {/* if we are sorting  render the sorting component */}
      {selected === "sorting" ? (
        <SortingVisualizer arraysInfo={arraysInfo} />
      ) : (
        <TraversalVisualizer graphsInfo={graphsInfo} />
      )}
    </Container>
  );
};

export default VisualizersPage;
