import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/navbar/MyNavbar';

import Home from './pages/Home';
// import About from './pages/About';
import Contact from './pages/Contact';
import Graph from './pages/graphs/graph'

function App() {
  return (
    <Router>
      <MyNavbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
