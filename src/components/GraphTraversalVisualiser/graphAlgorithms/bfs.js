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
const matrix = [
    ["s", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "o"],
];






export function BFS(grid, start, destination) {
    let queue = [start];
    let visited = {};

    while (queue.length > 0) {
        // console.log(queue);
        // fix the checking if visited
        let current_node = queue.shift();  // Use shift to remove the first element (FIFO for BFS)
        console.log(current_node);
        if (current_node === destination) {
            return "found";
        } else { 
            let current_node_key = JSON.stringify(current_node);
            // console.log(current_node_key)
            if (!(visited.hasOwnProperty(current_node_key))) {
                // console.log("here");
                visited[current_node_key] = current_node;
                let neighbors = getNeighbors(grid, current_node);
                // console.log(neighbors)
                for (let i = 0; i < neighbors.length; i++) {
                    queue.push(neighbors[i]);
                }
            }
        }
    }

    return "not found";
}


