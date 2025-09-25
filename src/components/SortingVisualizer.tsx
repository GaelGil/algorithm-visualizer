import React, { useState, useEffect } from "react";
import AlgorithmForm from "./AlgorithmForm";
import AlgorithmInfo from "./AlgorithmInfo";
import type { ArrayProps } from "../types/info";
import { getMergeSortAnimations } from "../services/sortingAlgorithms/mergeSort";
import { getInsertionSortAnimations } from "../services/sortingAlgorithms/insertionSort";
import { getBubbleSortAnimations } from "../services/sortingAlgorithms/bubbleSort";
import { getSelectionSortAnimations } from "../services/sortingAlgorithms/selectionSort";
import { startSorting } from "../services/utils";
import "../css/Arrays.css";

const generateRandomArray = (length = 50, min = 20, max = 200): number[] =>
  Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

const SortingVisualizer: React.FC<ArrayProps> = ({ arraysInfo }) => {
  const [array, setArray] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<string>("");
  const [isSorting, setIsSorting] = useState(false);
  // function load new array on component load
  useEffect(() => {
    setArray(generateRandomArray());
  }, []);

  // function to set a new array
  const resetArray = () => {
    if (!isSorting) {
      setArray(generateRandomArray());
    }
  };

  // function to handle if algorithm changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value);
  };

  // function to handle what happens on submit.
  // in our case we will get the sorting animations and then
  // color the nodes accordingly
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!algorithm || isSorting) return;
    setIsSorting(true);
    let method: string = algorithm;
    if (method === "Merge") {
      startSorting(getMergeSortAnimations(array));
    } else if (method === "Bubble") {
      startSorting(getBubbleSortAnimations(array));
    } else if (method === "Insertion") {
      startSorting(getInsertionSortAnimations(array));
    } else if (method === "Selection") {
      startSorting(getSelectionSortAnimations(array));
    }
    setIsSorting(false);
  };

  // the sorting visualizer component
  return (
    <div className="">
      <div className="flex flex-wrap justify-center items-end  h-full w-full">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="array-bar mr-1"
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>

      {/* importing algorithm form component with sorting specific values */}
      <AlgorithmForm
        value={algorithm}
        options={["Merge", "Bubble", "Selection", "Insertion"]}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={resetArray}
        disabled={isSorting}
      />

      {/* importing algorithm form component with sorting specific values */}
      <AlgorithmInfo info={arraysInfo} name="Sorting" />
    </div>
  );
};

export default SortingVisualizer;
