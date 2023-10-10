import React, { useState } from 'react';
import { getMergeSortAnimations } from "./sortingAlgorithms/mergeSort";
import { getBubbleSortAnimations } from './sortingAlgorithms/bubbleSort';
import { getInsertionSortAnimations } from './sortingAlgorithms/insertionSort';
import { getSelectionSortAnimations } from './sortingAlgorithms/selectionSort';
import './SortingVisualiser.css'; 
const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = 'red';
const SECONDARY_COLOR = 'grey';

const SortingVisualiser = () => {
  const [array, setArray] = useState([]); 
  const [algorithm, setAlgorithm] = useState('Reset');
  // const [current, setCurrent] = useState(false);
  const [button, setButton] = useState(false);

  // Function to reset the array
  const resetArray = () => {
    const newArray = Array.from({ length: 50 }, () => randInts(5, 300));
    setArray(newArray);
  };

  // Function to start sorting 
  const startSorting = (animations) => {
    // Function to handle the animations for sorting algorithms
    const arrayBars = document.getElementsByClassName('array-bar'); // select the array bars html
    let current_animation = {'compare': []}; // we compare this to the first animation
      for (let i = 0; i < animations.length; i++) {
        // if the current item in animations is a dictionary change the color
        if (animations[i].constructor === Object){
          const barOneIdx = (animations[i].compare[0]); // select the first bar index
          const barTwoIdx = (animations[i].compare[1]); // select the second bar index
          const barOneStyle = arrayBars[barOneIdx].style; 
          const barTwoStyle = arrayBars[barTwoIdx].style;
          let color = PRIMARY_COLOR; 
          // If the animation is the same as the previous one this means that we are only adding it
          // to show the values we are currently comparing. So we change the color of them.
          if (JSON.stringify(animations[i].compare) === JSON.stringify(current_animation.compare)){
            color = SECONDARY_COLOR;
          }
          current_animation = animations[i];
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } 
        else { // if not we are just performing a swap on the array bars
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    return animations.length*ANIMATION_SPEED_MS;
  };

  const handleSubmit = (event) => {
    let method = algorithm;
    let time = 0;
    disableButtons();
    if (method === 'Merge') {
      time = startSorting(getMergeSortAnimations(array));
    } else if (method === 'Bubble') {
      time = startSorting(getBubbleSortAnimations(array));
    } else if (method === 'Reset') {
      resetArray();
      enableButtons(1);
    } else if (method === 'Insertion') {
      time = startSorting(getInsertionSortAnimations(array));
    } else if (method === 'Selection') {
      time = startSorting(getSelectionSortAnimations(array));
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
    <div className='App'>
      <header className="App-header">
        {/* The array to be sorted */}
        <div className="array-container">
              {array.map((value, idx) => (
                <div
                  className="array-bar"
                  key={idx}
                  style={{
                    backgroundColor: "grey",
                    height: `${value}px`,
                    width: "20px",
                  }}>
                </div>
              ))}
              <br></br>
          </div> 
        {/* Algorithms available */}
        <div style={{ text: 'black' }} className="custom-select">
          <form onSubmit={handleSubmit}>
            <label htmlFor='algorithm' className='label'>Sorting Algorithms: 
              <select className='menu' id='menu' value={algorithm} onChange={handleChange}>
                <option value='Reset'>Reset Array</option>
                <option value='Merge'>Merge Sort</option>
                <option value='Bubble'>Bubble Sort</option>
                <option value='Selection'>Selection Sort</option>
                <option value='Insertion'>Insertion Sort</option>
              </select>
            </label>
            <input style={{ color: 'black' }} className="btn" type="submit" value="Submit" disabled={button} />
          </form>
        </div>
      </header>
    </div>
  );
};

export default SortingVisualiser;

function randInts(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
