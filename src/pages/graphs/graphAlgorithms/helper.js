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


  // function to check for conflict
export function conflict(i, j, maze){
    // index checking
    if (i < 0 || i >= maze.length || j < 0 || j >= maze[0].length) { 
        return false;
    }


    if (maze[i][j] === 'w' || maze[i][j] === 'e' || maze[i][j] === 'o' || maze[i][j] === 's'){
        return true;
    }

    // if objective is surronded by obstacles
  
        if (
            (i > 0 && maze[i - 1][j] === "w") ||
            (i < maze.length - 1 && maze[i + 1][j] === "w") ||
            (j > 0 && maze[i][j - 1] === "w") ||
            (j < maze[0].length - 1 && maze[i][j + 1] === "w")
        ) {
            return true;
        }
    
    return false;
  }


  export function heuristic(neighbor, destination){
    return 1;
  }