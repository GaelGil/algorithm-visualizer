import './App.css';
import './index.css'
import React from 'react';
import NavBar from './components/NavBar/navbar';
import { getMergeSortAnimations } from './sortingAlgorithms/mergeSort';
import { getBubbleSortAnimations } from './sortingAlgorithms/bubbleSort';
import { getInsertionSortAnimations } from './sortingAlgorithms/insertionSort';
import { getSelectionSortAnimations } from './sortingAlgorithms/selectionSort';
const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = 'red';
const SECONDARY_COLOR = 'grey';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      array : [],
      algorithm : 'Reset',
      current : false,
      button: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  resetArray() {
    // Function to reset array
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


  handleAnimations(animations){
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
  }

  mergeSort() {
    // get sorting algorithm animations
    const animations = getMergeSortAnimations(this.state.array);
    // handle the animations
    let time = this.handleAnimations(animations);
    return time; // return time for animations to run
  }

  disableButtons(){
    // disable menu and btn
    let menu = document.getElementsByClassName('menu');
    let btn = document.getElementsByClassName('btn');
    btn[0].disabled = true;
    menu[0].disabled = true;
  }

  enableButtons(time){
    // enable buttons
    let menu = document.getElementsByClassName('menu');
    let btn = document.getElementsByClassName('btn');
    window.setTimeout(function(){
      for (let i = 0; i < time; i++){
      btn[0].disabled = false;
      menu[0].disabled = false;
      }
    },time);
  }



  bubbleSort(){
    // get sorting algorithm animations
    const animations = getBubbleSortAnimations(this.state.array);
    // handle the animations
    let time = this.handleAnimations(animations);
    return time; // return time for animations to run
  }

  insertionSort(){
    // get sorting algorithm animations
    const animations = getInsertionSortAnimations(this.state.array);
    // handle the animations
    let time = this.handleAnimations(animations);
    return time; // return time for animations to run
  }

  selectionSort(){
    // get sorting algorithm animations
    const animations = getSelectionSortAnimations(this.state.array);
    // handle the animations
    let time = this.handleAnimations(animations);
    return time; // return time for animations to run
  }

  handleSubmit(event) {
    let method = this.state.algorithm;
    let time = 0;
    this.disableButtons()
    if (method === 'Merge'){
      time = this.mergeSort();
    }
    else if (method === 'Bubble'){
      time = this.bubbleSort();
    }
    else if (method === 'Reset'){
      this.resetArray();
      this.enableButtons(1);
    }
    else if (method === 'Insertion'){
      time = this.insertionSort();
    }
    else if (method === 'Selection'){
      time = this.selectionSort();
    }

    this.enableButtons(time);
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
                    width: "20px",
                  }}>
                </div>
              ))}
              <br></br>
          </div> 
          {/* Algorithms available */}
          <div style={{text:'black'}} className="custom-select">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='algorithm' className='label'>Sorting Algorithms: 
              <select className='menu' id='menu' value={this.state.value} onChange={this.handleChange}>
                <option value='Reset'>Reset Array</option>
                <option value='Merge'>Merge Sort</option>
                <option value='Bubble'>Bubble Sort</option>
                <option value='Selection'>Selection Sort</option>
                <option value='Insertion'>Insertion Sort</option>
              </select>
            </label>
            <input style={{color: 'black'}} className="btn" type="submit" value="Submit" />
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
