// Graph legend component. Only imported in traversal visualiser
const GraphLegend = () => {
  return (
    <div className="legend mb-4 text-center">
      <ul className="flex flex-wrap justify-center mb-0">
        <li className="mr-4 mb-2">
          <span className="bg-blue-500 w-4 h-4 inline-block mr-2"></span>
          <span className="text-gray-700">Start</span>
        </li>
        <li className="mr-4 mb-2">
          <span className="bg-green-500 w-4 h-4 inline-block mr-2"></span>
          <span className="text-gray-700">Objective</span>
        </li>
        <li className="mr-4 mb-2">
          <span className="bg-yellow-500 w-4 h-4 inline-block mr-2"></span>
          <span className="text-gray-700">Path</span>
        </li>
        <li className="mr-4 mb-2">
          <span className="bg-gray-500 w-4 h-4 inline-block mr-2"></span>
          <span className="text-gray-700">Obstacle</span>
        </li>
        <li className="mr-4 mb-2">
          <span className="bg-teal-500 w-4 h-4 inline-block mr-2"></span>
          <span className="text-gray-700">Expanded Nodes</span>
        </li>
        <li className="mr-4 mb-2">
          <span className="bg-red-500 w-4 h-4 inline-block mr-2"></span>
          <span className="text-gray-700">
            Weighted (ignored for bfs and dfs)
          </span>
        </li>
      </ul>
    </div>
  );
};

export default GraphLegend;
