import './App.css';
import './index.css'
import React from 'react';
import NavBar from './components/NavBar/navbar';
// import { bubbleSort, insertionSort, selectionSort } from './sortingAlgorithms/sortingAlgorithms';
import { getMergeSortAnimations } from './sortingAlgorithms/mergeSort';
import { getBubbleSortAnimations } from './sortingAlgorithms/bubbleSort';
const ANIMATION_SPEED_MS = 1;
const SECONDARY_COLOR = 'white';
const PRIMARY_COLOR = 'purple';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      array : [],
      algorithm : 'Reset',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetArray() {
    let array = [];
    for (let i = 0; i < 50; i++) {
      array.push(randInts(5, 300));
    }
    this.setState({array});
  }

  componentDidMount() {
      this.resetArray();
  }

  handleChange(event) {
    this.setState({algorithm: event.target.value});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // Set sorted array to green bars
    // for (let i = 0; i < this.state.array.length; i++){
    //   const arrayBars = document.getElementsByClassName('array-bar');
    //   array
    // }
  }

  bubbleSort(){
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  handleSubmit(event) {
    // alert('Your favorite flavor is: ' + this.state.algorithm);
    let method = this.state.algorithm;
    if (method === 'Merge'){
      this.mergeSort();
    }
    else if (method === 'Bubble'){
      this.bubbleSort();
    }
    else if (method === 'Reset'){
      this.resetArray();
    }
    else if (method === 'Insertion'){
      this.resetArray();
    }
    else if (method === 'Selection'){
      this.resetArray();
    }
    event.preventDefault();
  }

  
  render (){
    const {array} = this.state;
    return (
      <div className='App'>
        <NavBar/ >
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
                  }}>
                </div>
              ))}
              <br></br>
          </div> 
          {/* Algorithms available */}
          <div className="custom-select">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='algorithm' className='label'>Sorting Algorithms: 
              <select className='menu' value={this.state.value} onChange={this.handleChange}>
                <option value='Reset'>Reset Array</option>
                <option value='Merge'>Merge Sort</option>
                <option value='Bubble'>Bubble Sort</option>
                <option value='Selection'>Selection Sort</option>
                <option value='Insertion'>Insertion Sort</option>
              </select>
            </label>
            <input className='btn' type="submit" value="Submit" />
          </form>
          </div>
      </header>
    </div>
  );}
}

function randInts(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



export default App;
