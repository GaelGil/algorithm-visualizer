import './App.css';
import './index.css'
import React from 'react';
import NavBar from './components/NavBar/navbar';
import { getMergeSortAnimations } from './sortingAlgorithms/mergeSort';
import { getBubbleSortAnimations } from './sortingAlgorithms/bubbleSort';
import { getInsertionSortAnimations } from './sortingAlgorithms/insertionSort';
import { getSelectionSortAnimations } from './sortingAlgorithms/selectionSort';
const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = 'aqua';
const SECONDARY_COLOR = 'green';


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
    for (let i = 0; i < 100; i++) {
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

  handleAnimations(animate, animation, arrayBars, current_animation, i){
    if (animate) {
        // select the first bar index
        const barOneIdx = (animation.compare[0]);
        // select the second bar index
        const barTwoIdx = (animation.compare[1]);
        const barOneStyle = arrayBars[barOneIdx].style; 
        const barTwoStyle = arrayBars[barTwoIdx].style;
        let color = PRIMARY_COLOR; 
        // if the animation is the first as the previous one change the color
        if (JSON.stringify(animation.compare) === JSON.stringify(current_animation.compare)){
          color = SECONDARY_COLOR;
        }
        current_animation = animation;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        return current_animation
    }
    else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animation;
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
    return current_animation;
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
        const color = i % 3 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR ;
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


  bubbleSort(){
    const animations = getBubbleSortAnimations(this.state.array);
    let current_animation = {'compare': []}; // we compare this to the first animation
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar'); // select the array bars
      // if the current item in animations is a dictionary change the color
      if (animations[i].constructor === Object){
          current_animation = this.handleAnimations(true, animations[i], arrayBars, current_animation, i);
      } else { // swap the positions
        this.handleAnimations(false, animations[i], arrayBars, current_animation, i);
      }
    }
  }

  insertionSort(){
    const animations = getInsertionSortAnimations(this.state.array);
    let current_animation = {'compare': []}; // we compare this to the first animation
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar'); // select the array bars
      // if the current item in animations is a dictionary change the color
      // if the current item in animations is a dictionary change the color
      if (animations[i].constructor === Object){
        current_animation = this.handleAnimations(true, animations[i], arrayBars, current_animation, i);
      }
      else { // swap the positions
      this.handleAnimations(false, animations[i], arrayBars, current_animation, i);
      }
    }
  }

  selectionSort(){
    const animations = getSelectionSortAnimations(this.state.array);
    let current_animation = {'compare': []}; // we compare this to the first animation
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar'); // select the array bars
      // if the current item in animations is a dictionary change the color
      if (animations[i].constructor === Object){
        current_animation = this.handleAnimations(true, animations[i], arrayBars, current_animation, i);
      } 
      else { // swap the positions
      this.handleAnimations(false, animations[i], arrayBars, current_animation, i);
      }
    }
  }

  handleSubmit(event) {
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
      this.insertionSort();
    }
    else if (method === 'Selection'){
      this.selectionSort();
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
