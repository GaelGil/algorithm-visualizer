import React from 'react';
import './NavBar.css';

function NavBar({ onNavigate }) {
  return (
    <nav className="NavBar">
      <button onClick={() => onNavigate('sorting')}>Sorting Visualizer</button>
      <button onClick={() => onNavigate('traversal')}>Graph Traversal Visualizer</button>
      <li><a href="https://github.com/GaelGil/algorithm-visualizer">About</a></li>
    </nav>
  );
}

export default NavBar;
