import { PriorityQueue } from "./datastructures/priorityQueue";
import { getNeighbors, heuristic, exists } from "./helper";

export function ASTAR(grid: any[][], start: number[], destination: number[]) {
  let priorityQueue = new PriorityQueue(); // prioirty queue with lowest cost priority
  priorityQueue.enqueue({
    node: start,
    path: [start],
    cost: heuristic(start, destination),
    gcost: 0,
  }); // add start node with cost being heuristic value
  let expanded = []; // expanded nodes (nodes that weve checked all neighbors)

  while (!priorityQueue.isEmpty()) {
    let { node, path, cost, gcost } = priorityQueue.dequeue(); // get the node, its path, and cost from the front of the priority queue
    if (node.toString() === destination.toString()) {
      // if node is destination
      return { status: "found", path, cost, expanded }; // return found, path, cost, and expanded.
    }

    if (exists(expanded, node)) {
      // if we have already expanded this node continue
      continue;
    }

    let neighbors = getNeighbors(grid, node); // get neighbors of current node
    for (let i = 0; i < neighbors.length; i++) {
      // for all neighbors
      let neighbor = neighbors[i]; // select neighbor
      if (grid[neighbor[0]][neighbor[1]] !== "w") {
        // if not a wall
        let costToNeighbor = 1; // set cost to neighbor as 1
        if (grid[neighbor[0]][neighbor[1]] === "e") {
          // if weighted
          costToNeighbor = 5; // set weight cost 5
        }
        let g = gcost + costToNeighbor; // add up total cost actual to neighbor node (cost to current node + cost of neighbor)
        let f = g + heuristic(neighbor, destination); // f = g (total cost to node) + heuristic
        priorityQueue.enqueue({
          node: neighbor,
          path: path.concat([neighbor]),
          cost: f,
          gcost: g,
        }); // add neihhbor, path, fcost, and gcost
      }
    }
    expanded.push(node); // add to expanded list
  }

  return { status: "not found", path: [], cost: 0 };
}
