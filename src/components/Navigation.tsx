import { Link } from "react-router-dom";

// simple navbar component to be usedon all pages
const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-3">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">
          Algorithm Visualiser
        </Link>
        <ul className="flex items-center">
          <li className="mr-6">
            <Link
              to="/https://github.com/GaelGil/algorithm-visualizer"
              className="text-gray-300 hover:text-white"
            >
              Git-Repo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
