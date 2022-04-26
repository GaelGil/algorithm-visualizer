import './App.css';
import './index.css'
import React from 'react';
import NavBar from './components/NavBar/navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array : [] };
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    alert('Click happened');
  }

  
  render (){
    const {array} = this.state;
    return (
      <div className="App">
        <NavBar/ >
        <header className="App-header">
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
          <div className="controler">
                <div className="dropdown">
                  <button onClick={() => this.resetArray()} className='dropbtn'> Algorithms</button> 
                    <div className="dropdown-content">
                      <button className='btn' onClick={() => this.resetArray()}> Merge Sort</button>
                      <button className='btn' onClick={() => this.resetArray()}> Bubble Sort</button>
                      <button className='btn' onClick={() => this.resetArray()}> Selection Sort</button>
                      <button className='btn' onClick={() => this.resetArray()}> Insertion Sort</button>
                    </div>
                </div>
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
