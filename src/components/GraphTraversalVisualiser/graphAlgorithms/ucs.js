import { PriorityQueue } from './datastructures/priorityQueue';

function isValidIndex(matrix, i, j) {
    return i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length;
}


function getNeighbors(matrix, current_node) {
    let neighbors = []
    let i = current_node[0];
    let j = current_node[1];
    // top neihgbor
    if (isValidIndex(matrix, i - 1, j)) {
        neighbors.push([i - 1, j]);
    }

    // bottom neighbor
    if (isValidIndex(matrix, i + 1, j)) {
        neighbors.push([i + 1, j]);
    }

    // left neighbor
    if (isValidIndex(matrix, i, j - 1)) {
        neighbors.push([i, j-1]);

    }

    // right neighbor
    if (isValidIndex(matrix, i, j + 1)) {
        neighbors.push([i, j+1]);

    }


    return neighbors;
}




export function UCS(grid, start, destination) {
    let priorityQueue = new PriorityQueue();
    priorityQueue.enqueue({ node: start, path: [start], cost: 0 });

    let visited = {};
    let expanded = [];

    while (!priorityQueue.isEmpty()) {
        let { node, path, cost } = priorityQueue.dequeue(); // get the node, its path, and cost from the front of the priority queue
        let nodeKey = node.toString(); // to string for comparison

        if (nodeKey === destination.toString()) { // check if we have arrived at the solution
            return { status: "found", path, cost };
        } else {
            if (!(visited.hasOwnProperty(nodeKey))) { // if we have not been to this node, add it
                visited[nodeKey] = true; // mark as visited
                let neighbors = getNeighbors(grid, node); // get neighbors of the current node
                for (let i = 0; i < neighbors.length; i++) {
                    let neighbor = neighbors[i];
                    let neighborKey = neighbor.toString();
                    let neighborCost = cost
                    if (grid[neighbor[0]][neighbor[1]] === "e"){
                        neighborCost += 5;
                    }else {
                        neighborCost +=1;
                    }; // Assuming each step has a uniform cost of 1 (change as needed)

                    if (!(visited.hasOwnProperty(neighborKey))) { // if the neighbor has not been visited, add to the priority queue
                        if (!(grid[neighbor[0]][neighbor[1]] === "w")) { // if there is no wall, then we add
                            priorityQueue.enqueue({ node: neighbor, path: path.concat([neighbor]), cost: neighborCost }, neighborCost);
                            expanded.push(neighbor); // add the expanded node to the list
                        }
                    }
                }
            }
        }
    }

    return { status: "not found", path: [], cost: 0 };
}