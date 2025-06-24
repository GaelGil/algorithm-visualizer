import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AlgorithmForm from "./AlgorithmForm";
import AlgorithmInfo from "./AlgorithmInfo";
import { graphsInfo } from "../data/graphsInfo";
import "../css/Arrays.css";

const generateRandomArray = (length = 50, min = 20, max = 200): number[] =>
  Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

const TraversalVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<string>("");
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    setArray(generateRandomArray());
  }, []);

  const resetArray = () => {
    if (!isSorting) {
      setArray(generateRandomArray());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!algorithm || isSorting) return;
    setIsSorting(true);

    await fakeSort(array, setArray, algorithm);

    setIsSorting(false);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="array-container mb-4">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="array-bar"
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>

      <div style={{ maxWidth: "400px", width: "100%" }}>
        <AlgorithmForm
          value={algorithm}
          options={["Merge", "Bubble", "Selection", "Insertion"]}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={resetArray}
          disabled={isSorting}
        />
      </div>

      <Container className="mt-5">
        <h2 className="text-center mb-4">About Sorting Algorithms</h2>
        <AlgorithmInfo items={graphsInfo} />
      </Container>
    </Container>
  );
};

export default TraversalVisualizer;
