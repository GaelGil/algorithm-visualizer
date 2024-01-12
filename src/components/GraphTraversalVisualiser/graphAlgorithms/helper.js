function isValidIndex(matrix, i, j) {
    return i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length;
}


export function getNeighbors(matrix, current_node) {
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
