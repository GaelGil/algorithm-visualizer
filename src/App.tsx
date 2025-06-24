import "./css/App.css";
import NavBar from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VisualizersPage from "./pages/Visualiser";

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Router>
          <Routes>
            <Route path="/" element={<VisualizersPage />} />
            {/* Add more routes here */}
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
