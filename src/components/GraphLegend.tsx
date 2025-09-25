// Graph legend component. Only imported in traversal visualiser
const GraphLegend = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 px-2">
      <ul className="flex flex-wrap justify-center mb-0">
        <li className="mr-4 mb-2">
          <span className="start w-4 h-4 inline-block mr-2"></span>
          <span>Start</span>
        </li>
        <li className="mr-4 mb-2">
          <span className="objective w-4 h-4 inline-block mr-2"></span>
          <span>Objective</span>
        </li>
        <li className="mr-4 mb-2">
          <span className="path w-4 h-4 inline-block mr-2"></span>
          <span>Path</span>
        </li>
        <li className="mr-4 mb-2">
          <span className="obstacle w-4 h-4 inline-block mr-2"></span>
          <span>Obstacle</span>
        </li>
        <li className="mr-4 mb-2">
          <span className="expanded w-4 h-4 inline-block mr-2"></span>
          <span>Expanded Nodes</span>
        </li>
        <li className="mr-4 mb-2">
          <span className="weight w-4 h-4 inline-block mr-2"></span>
          <span>Weighted (ignored for bfs and dfs)</span>
        </li>
      </ul>
    </div>
  );
};

export default GraphLegend;
