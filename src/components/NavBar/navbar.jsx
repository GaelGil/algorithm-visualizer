import React from 'react';
import './NavBar.css';

function NavBar({ onNavigate }) {
  return (
    <nav className="NavBar">
      <li><a onClick={() => onNavigate('sorting')}>Sorting Visualizer</a></li>
      <li><a onClick={() => onNavigate('traversal')}>Graph Traversal Visualizer</a></li>
      <li><a href="https://github.com/GaelGil/algorithm-visualizer">About</a></li>
    </nav>
  );
}

export default NavBar;
