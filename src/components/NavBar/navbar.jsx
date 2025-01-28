import React from 'react';
import './navbar.css';

function NavBar({ onNavigate }) {
  return (
    <nav className="NavBar">
      <li><button class='nav_button' onClick={() => onNavigate('sorting')}>Sorting Visualizer</button></li>
      <li><button class='nav_button'  onClick={() => onNavigate('traversal')}>Graph Traversal Visualizer</button></li>
      <li><a href="https://github.com/GaelGil/algorithm-visualizer">About</a></li>
    </nav>
  );
}

export default NavBar;
