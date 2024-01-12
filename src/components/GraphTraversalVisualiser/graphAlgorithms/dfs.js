import { getNeighbors } from './helper';



export function DFS(grid, start, destination) {
    let queue = [{ node: start, path: [start] }];
    let visited = {};
    let expanded = [];

    while (queue.length > 0) {
        let { node, path } = queue.shift(); // get the node and its path from the front of the queue
        let current_node_key = node.toString(); // to string for comparison
        // console.log(current_node_key)
        if (current_node_key === destination.toString()) { // check if we have arrived at the solution
            return { status: "found", path , expanded};
        } else {
            if (!(visited.hasOwnProperty(current_node_key))) { // if we have not been to this node add it to visited
                visited[current_node_key] = true; // mark as visited
                let neighbors = getNeighbors(grid, node); // get neighbors of the current node
                for (let i = 0; i < neighbors.length; i++) {
                    let neighbor = neighbors[i]; 
                    let neighbor_key = neighbor.toString();
                    if (!(visited.hasOwnProperty(neighbor_key))) { // if the neighbor has not been visited, add to the queue
                        if (!(grid[neighbor[0]][neighbor[1]] === "w")) { // if there is no wall, then we add beggining of queue
                            queue.unshift({ node: neighbor, path: path.concat([neighbor]) });
                            expanded.push(neighbor); // add the expanded node to the list
                        }
                    }
                }
            }
        }
    }

    return { status: "not found", path: [], expanded};
}
