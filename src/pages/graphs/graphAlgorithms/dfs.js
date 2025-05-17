import { getNeighbors } from './helper';

export function DFS(grid, start, destination) {
    let stack = [{ node: start, path: [start] }];
    let visited = {};
    let expanded = [];

    while (stack) {
        let { node, path } = stack.shift(); // get the node and its path from the front of the queue
        let current_node_key = node.toString(); // to string for comparison

        if (current_node_key === destination.toString()) { // check if we have arrived at the solution
            return { status: "found", path , expanded};
        } 

        if (visited.hasOwnProperty(current_node_key)) { // if we have not been to this node, add it
            continue;
        }
        visited[current_node_key] = true; // mark as visited

        let neighbors = getNeighbors(grid, node); // get neighbors of the current node
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]; 
            if (!(grid[neighbor[0]][neighbor[1]] === "w")) { // if there is no wall, then we add beggining of queue
                stack.unshift({ node: neighbor, path: path.concat([neighbor]) }); // add to beggining of queue
                expanded.push(neighbor); // add the expanded node to the list
            }
        }
            
    }

    return { status: "not found", path: [], expanded};
}