// Graph legend component. Only imported in traversal visualiser
const GraphLengend = () => {
  return (
    <>
      <div className="legend mb-4 text-center">
        <ul>
          <li className="start">Start</li>
          <li className="objective">Objective</li>
          <li className="path">Path</li>
          <li className="obstacle">Obstacle</li>
          <li className="expanded">Expanded Nodes</li>
          <li className="weight">Weighted (ignored for bfs and dfs)</li>
        </ul>
      </div>
    </>
  );
};

export default GraphLengend;
