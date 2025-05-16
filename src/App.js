import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MyNavbar from './components/NavBar/MyNavbar';
import Home from './pages/Home';
import Graphs from './pages/graphs/Graphs';
import Arrays from './pages/array/Arrays';

function App() {
  return (
    <Router>
      <div>
        <MyNavbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/graph" element={<Graphs />} />
            <Route path="/array" element={<Arrays />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;