import { PriorityQueue } from "./datastructures/priorityQueue";
import { getNeighbors, exists } from "./helper";

export function UCS(grid: any[][], start: number[], destination: number[]) {
  let priorityQueue = new PriorityQueue(); // create pq
  // add start node to pq, initialize, set cost
  priorityQueue.enqueue({ node: start, path: [start], cost: 0 });
  let expanded = []; // create expanded list

  while (!priorityQueue.isEmpty()) {
    let { node, path, cost } = priorityQueue.dequeue(); // deqeue node with lowest cost
    if (node.toString() === destination.toString()) {
      // if node is destination
      // return found, path, cost, and expanded.
      return { status: "found", path, cost, expanded };
    }

    if (exists(expanded, node)) {
      // if we have already expanded this node continue
      continue;
    }

    let neighbors = getNeighbors(grid, node); // get neighbors
    for (let i = 0; i < neighbors.length; i++) {
      // for every neighbor
      let neighbor = neighbors[i]; // select neighbor
      if (grid[neighbor[0]][neighbor[1]] !== "w") {
        // if not a wall
        let costToNeighbor = 1; // set cost to move to neighbor (+1)
        if (grid[neighbor[0]][neighbor[1]] === "e") {
          // if weighted
          costToNeighbor = 5; // set cost (+5)
        }
        let total_cost = cost + costToNeighbor; // add up cost to neighbor (cost from current node to negihbor)
        priorityQueue.enqueue({
          node: neighbor,
          path: path.concat([neighbor]),
          cost: total_cost,
        }); // add neihhbor, path and total cost to neighbor
      }
    }
    expanded.push(node); // add to expanded list
  }

  return { status: "not found", path: [], cost: 0 };
}
