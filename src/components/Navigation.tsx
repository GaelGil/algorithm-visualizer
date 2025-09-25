import { Link } from "react-router-dom";

// simple navbar component to be usedon all pages
const Navigation = () => {
  return (
    <div className="border-b border-gray-300 m-2">
      <div className="flex p-2 mx-auto space-x-4">
        <Link
          to="/"
          className="py-2 text-lg hover:text-blue-500 font-bold text-decoration-none"
        >
          Algorithm Visualiser
        </Link>

        <a
          href="https://github.com/GaelGil/algorithm-visualizer"
          className="py-2 text-lg hover:text-blue-500 font-bold text-decoration-none"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Navigation;
