import NavBar from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import VisualizersPage from "./pages/Visualiser";
import "./css/index.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<VisualizersPage />} />
      </Routes>
    </>
  );
}

export default App;
