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





// Example Usage
// const matrix = [
//     ["s", "0", "0", "0", "0"],
//     ["0", "0", "0", "0", "0"],
//     ["0", "0", "0", "0", "0"],
//     ["0", "0", "0", "0", "0"],
//     ["0", "0", "0", "0", "0"],
//     ["0", "0", "0", "0", "o"],
// ];






export function BFS(grid, start, destination) {
    let queue = [{ node: start, path: [start] }];
    let visited = {};
    let expanded = [];

    while (queue.length > 0) {
        let { node, path } = queue.shift(); // get the node and its path from the front of the queue
        let current_node_key = node.toString(); // to string for comparison

        if (current_node_key === destination.toString()) { // check if we have arrived at the solution
            return { status: "found", path , expanded};
        } else {
            if (!(visited.hasOwnProperty(current_node_key))) { // if we have not been to this node, add it
                visited[current_node_key] = true; // mark as visited
                let neighbors = getNeighbors(grid, node); // get neighbors of the current node
                for (let i = 0; i < neighbors.length; i++) {
                    let neighbor = neighbors[i];
                    let neighbor_key = neighbor.toString();

                    if (!(visited.hasOwnProperty(neighbor_key))) { // if the neighbor has not been visited, add to the queue
                        if (!(grid[neighbor[0]][neighbor[1]] === "w")) { // if there is no wall, then we add to end of queue
                            queue.push({ node: neighbor, path: path.concat([neighbor]) });
                            expanded.push(neighbor); // add the expanded node to the list
                        }
                    }
                }
            }
        }
    }

    return { status: "not found", path: [], expanded};
}



