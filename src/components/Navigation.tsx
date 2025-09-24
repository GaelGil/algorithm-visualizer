import { Link } from "react-router-dom";

// simple navbar component to be usedon all pages
const Navigation = () => {
  return (
    <nav className="bg-gray-900 text-white p-3">
      <div className="flex p-2 mx-auto space-x-4">
        <Link
          to="/"
          className="py-2 text-white text-lg font-bold text-decoration-none"
        >
          Algorithm Visualiser
        </Link>

        <a
          href="https://github.com/GaelGil/algorithm-visualizer"
          className="py-2 text-white text-lg font-bold text-decoration-none"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
