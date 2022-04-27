import './App.css';
import './index.css'
import React from 'react';
import NavBar from './components/NavBar/navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      array : [],
      algorithm : 'merge',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetArray() {
    let array = [];
    for (let i = 0; i < 300; i++) {
      array.push(randInts(5, 1000));
    }
    this.setState({array});
  }
  componentDidMount() {
      this.resetArray();
  }

  handleClick() {
    alert('Click happened');
  }

  handleChange(event) {
    this.setState({algorithm: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.algorithm);
    // let method = this.state.algorithm;
    // if (method == 'Merge'){
    //   mergeSort(this.state.array);
    // }
    // else if (method == 'Bubble'){
    //   bubbleSort(this.state.array);
    // }
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
                    backgroundColor: "blue",
                    height: `${value}px`,
                  }}>
                </div>
              ))}
              <br></br>
          </div> 
          {/* Algorithms available */}
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='algorithm' className='label'>Sorting Algorithms: 
              <select value={this.state.value} onChange={this.handleChange}>
                <option value='Reset'>Reset Array</option>
                <option value='Merge'>Merge Sort</option>
                <option value='Bubble'>Bubble Sort</option>
                <option value='Selection'>Selection Sort</option>
                <option value='Insertion'>Insertion Sort</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
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
