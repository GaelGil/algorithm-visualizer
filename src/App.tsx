import "./css/App.css";
import NavBar from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import VisualizersPage from "./pages/Visualiser";

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<VisualizersPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
