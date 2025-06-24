import "./css/App.css";
import NavBar from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Arrays from "./pages/Arrays";
import Graphs from "./pages/Graphs";

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          {/* set the routes to the pages */}
          <Route path="/" element={<Arrays />} />
          <Route path="/graphs" element={<Graphs />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
