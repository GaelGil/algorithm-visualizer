import { useState, useEffect } from "react";
import { getMergeSortAnimations } from "../services/sortingAlgorithms/mergeSort";
import { getBubbleSortAnimations } from "../services/sortingAlgorithms/bubbleSort";
import { getInsertionSortAnimations } from "../services/sortingAlgorithms/insertionSort";
import { getSelectionSortAnimations } from "../services/sortingAlgorithms/selectionSort";
import { randInts } from "../services/graphAlgorithms/helper";
import { arraysInfo } from "../data/arraysInfo";
import "../css/Arrays.css";

const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = "green";
const SECONDARY_COLOR = "red";

const Arrays = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState("Reset");
  const [button, setButton] = useState(false);

  useEffect(() => {
    // Load a new array on page load
    resetArray();
  }, []);

  // Function to reset the array
  const resetArray = () => {
    const newArray = Array.from({ length: 50 }, () => randInts(5, 300));
    setArray(newArray);
  };

  // Function to start sorting visuals
  const startSorting = (animations: any[]) => {
    // Function to handle the animations for sorting algorithms
    const arrayBars = document.getElementsByClassName("array-bar"); // select the array bars html
    let current_animation = { compare: [] }; // we compare this to the first animation
    for (let i = 0; i < animations.length; i++) {
      // if the current item in animations is a dictionary change the color
      if (animations[i].constructor === Object) {
        const barOneIdx = animations[i].compare[0]; // select the first bar index
        const barTwoIdx = animations[i].compare[1]; // select the second bar index
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        let color = PRIMARY_COLOR;
        // If the animation is the same as the previous one this means that we are only adding it
        // to show the values we are currently comparing. So we change the color of them.
        if (
          JSON.stringify(animations[i].compare) ===
          JSON.stringify(current_animation.compare)
        ) {
          color = SECONDARY_COLOR;
        }
        current_animation = animations[i];
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        // if not we are just performing a swap on the array bars
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    return animations.length * ANIMATION_SPEED_MS;
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    let method = algorithm;
    let time = 0;
    disableButtons();
    if (method === "Merge") {
      time = startSorting(getMergeSortAnimations(array));
    } else if (method === "Bubble") {
      time = startSorting(getBubbleSortAnimations(array));
    } else if (method === "Insertion") {
      time = startSorting(getInsertionSortAnimations(array));
    } else if (method === "Selection") {
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
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="array-container d-flex justify-content-center align-items-end mb-4 flex-wrap">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: "red",
              height: `${value}px`,
              width: "20px",
            }}
          ></div>
        ))}
      </div>

      <div style={{ text: "black" }} className="custom-select text-center">
        <form
          onSubmit={handleSubmit}
          className="p-3 border rounded bg-light shadow"
        >
          <label htmlFor="algorithm" className="form-label fw-bold">
            Sorting Algorithms:
            <select
              className="form-select my-2"
              id="menu"
              value={algorithm}
              onChange={handleChange}
            >
              <option value="">Select Algorithm</option>
              <option value="Merge">Merge Sort</option>
              <option value="Bubble">Bubble Sort</option>
              <option value="Selection">Selection Sort</option>
              <option value="Insertion">Insertion Sort</option>
            </select>
          </label>
          <input
            className="btn btn-primary w-100"
            type="submit"
            value="Submit"
            disabled={button}
          />
          <button
            className="btn btn-secondary"
            onClick={resetArray}
            value="Submit"
            type="button"
          >
            Reset Array
          </button>
        </form>
      </div>

      <div className="container mt-5">
        <h2 className="mb-4 text-center">About Sorting Algorithms</h2>
        <div className="row">
          {arraysInfo.map((algo, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{algo.name}</h5>
                  <p className="card-text">{algo.description}</p>
                  {algo.link && (
                    <>
                      {" "}
                      <a
                        href={algo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn more
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arrays;
