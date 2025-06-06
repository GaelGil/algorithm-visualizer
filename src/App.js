import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navigattion from './components/navigation/Navigattion';
import Graphs from './pages/graphs/Graphs';
import Arrays from './pages/array/Arrays';

function App() {
  return (
    <Router>
      <div>
        <Navigattion />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Graphs />} />
            <Route path="/array" element={<Arrays />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;