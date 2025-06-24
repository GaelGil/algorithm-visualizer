import { useState, useEffect } from "react";
import { getMergeSortAnimations } from "../services/sortingAlgorithms/mergeSort";
import { getBubbleSortAnimations } from "../services/sortingAlgorithms/bubbleSort";
import { getInsertionSortAnimations } from "../services/sortingAlgorithms/insertionSort";
import { getSelectionSortAnimations } from "../services/sortingAlgorithms/selectionSort";
import "../css/Arrays.css";

const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = "green";
const SECONDARY_COLOR = "red";
const algorithmsInfo = [
  {
    name: "General",
    description: `Here you can visulize sorting algorithms. The array contains 50 items. Below are some basic notes on each algorithm. To learn more
    about the implementation of the algorithms click the link below.`,
    link: "https://en.wikipedia.org/wiki/Sorting_algorithm",
  },
  {
    name: "Bubble Sort",
    description: `Bubble sort goes through every element in the array comparing the current item to the one after it.
    If the current is greater than the next we swap them.  We repeat this until were done. The time complexity of this is
    O(N^2)`,
  },
  {
    name: "Merge Sort",
    description: `In merge sort we split the array recursively. The idea is that we want to solve a smaller version of the problem so we break it down
    to its simplest form. This would be two items that we compare which merge into correct order. Then we repeat again until fully merged. The time complexity of this is
    O(N LOG(N))`,
  },
  {
    name: "Selection Sort",
    description: `In selection sort we set a min (first item by default). We itterate the list looking for a smaller min.
     If we get to the end of the list without finding another min we swap it. We continue this until all iterrations are done.
    The time complexity of this is
    O(N^2)`,
  },
  {
    name: "Insertion Sort",
    description: `Here we itterate through the array with a right pointer. If it the item before the right pointer is greater than we pass it back and swap it.
    We continue this until it the right pointer is in the correct position. The time complexity of this is
    O(N^2) `,
  },
];

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
  const startSorting = (animations) => {
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

  const handleSubmit = (event) => {
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
          {algorithmsInfo.map((algo, index) => (
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

function randInts(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
