import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/navbar/MyNavbar';

import Home from './pages/Home';
import Graph from './pages/graphs/Graphs';
import Array from './pages/array/Arrays';

function App() {
  return (
    <Router>
      <MyNavbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/array" element={<Array />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
