import React, { useState } from 'react';
import './App.css';
import SortingVisualiser from './components/SortingVisualiser/SortingVisualiser';
import GraphTraversalVisualiser from './components/GraphTraversalVisualiser/GraphTraversalVisualiser';
import NavBar from './components/NavBar/navbar'

function App() {
  const [currentView, setCurrentView] = useState('sorting'); // Default to sorting visualization

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      <NavBar onNavigate={handleViewChange} />
      {currentView === 'sorting' ? <SortingVisualiser /> : null}
      {currentView === 'traversal' ? <GraphTraversalVisualiser /> : null}
    </div>
  );
}

export default App;
