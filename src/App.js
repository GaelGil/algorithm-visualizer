import './App.css';
import './index.css'
import React from 'react';
import NavBar from './components/NavBar/navbar';
import { mergeSort, bubbleSort, insertionSort, selectionSort } from './sortingAlgorithms/sortingAlgorithms';

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
      array.push(randInts(5, 1000));
    }
    this.setState({array});
  }

  componentDidMount() {
      this.resetArray();
  }

  handleChange(event) {
    this.setState({algorithm: event.target.value});
  }

  handleSubmit(event) {
    // alert('Your favorite flavor is: ' + this.state.algorithm);
    let method = this.state.algorithm;
    if (method === 'Merge'){
      let sorted = mergeSort(this.state.array);
      this.setState({sorted});
    }
    else if (method === 'Bubble'){
      let sorted = bubbleSort(this.state.array);
      this.setState({sorted});
    }
    else if (method === 'Reset'){
      this.resetArray()
    }
    else if (method === 'Insertion'){
      let sorted = insertionSort(this.state.array);
      this.setState({sorted});
    }
    else if (method === 'Selection'){
      let sorted = selectionSort(this.state.array);
      this.setState({sorted});
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
