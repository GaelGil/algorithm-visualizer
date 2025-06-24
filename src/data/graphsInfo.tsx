export const graphsInfo = [
  {
    name: "General",
    description: `In this project you can visualize path finding algorithms.
    Each weighted node has a cost of 5 while non weighted node cost is 1. Below are some basic notes on each algorithm. To learn more
    about the implementation of the algorithms click the link below.`,
    link: "https://github.com/GaelGil/algorithm-visualizer/tree/main/src/pages/graphs/graphAlgorithms",
  },
  {
    name: "Breadth First Search (BFS)",
    description: `To implement BFS we use a queue and explore nodes in the order of the queue.
    This algorithm finds the shortest path but not necessarily the quicket path.
    This can be seen above when it goes through weighted graphs.
    Time complexity is O(V+E) where V is vertices (nodes) and E is edges. `,
  },
  {
    name: "Depth First Search (DFS)",
    description: `To implement BFS we use a stack and explore nodes in the order of the stack.
    This rarely if ever finds the shortest path.
    Because it explores depth wise it will stop until it cannot exlpore any further this can cause it to get lost in a path to nowhere.
    DFS is very similar to BFS except we use a stack instead of a queue.
    Time complexity is O(V+E)`,
  },
  {
    name: "Uniform Cost Search (UCS)",
    description: `To implement UCS we use a priority queue. 
    UCS is similar to dijkstra however we dont find the shortest path to all nodes just the goal.
    UCS can be used for weighted and non weighted graphs. When a graph is not weighted UCS will act as BFS.
    When a graph is weighted UCS will find the shortest and least costly path. It does this using a priorityqueue
    prioritizing nodes that have a lower cost path`,
  },
  {
    name: "A* (Astar)",
    description: `A* algorithm is very similar to UCS however we use a heuristic to calculate how close we are to our goal.
    What we pass in to our priorityqueue is f = h + g. Where g is the total cost to the node and h is the approximate distance from 
    the node to the destination. The priority here is the f value. This algorithm is an informed algorithm because we are using some
    information on the destination to guide us. This algorithm finds the least costly path. This also expands a less number of nodes
    them all the aobve
  `,
  },
];
