import React, { useState } from 'react';
import { getMergeSortAnimations } from "./sortingAlgorithms/mergeSort";
import { getBubbleSortAnimations } from './sortingAlgorithms/bubbleSort';
import { getInsertionSortAnimations } from './sortingAlgorithms/insertionSort';
import { getSelectionSortAnimations } from './sortingAlgorithms/selectionSort';
import './SortingVisualiser.css'; // You can create a CSS file for styling

const SortingVisualiser = () => {
  const [array, setArray] = useState([]); // Manage the array to be sorted here

  // Function to reset the array
  const resetArray = () => {
    // Generate a new array of random values
    const newArray = Array.from({ length: 50 }, () => randInts(5, 300));
    setArray(newArray);
  };

  // Function to start sorting (e.g., merge sort)
  const startSorting = () => {
    const animations = getMergeSortAnimations(array); // Use your sorting algorithm function
    // Implement the animations to visualize the sorting process
    // ...
  };

  return (
    <div className="SortingVisualiser">
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <button onClick={resetArray}>Generate New Array</button>
      <button onClick={startSorting}>Start Sorting</button>
    </div>
  );
};

export default SortingVisualiser;

function randInts(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
