function conflict(i, j, maze) {
    if (i < 0 || i >= maze.length || j < 0 || j >= maze[0].length) {
        return false;
    }
    if (maze[i][j] === "w") {
        return true;
    }
    if (maze[i][j] === "o") {
        if (
            (i > 0 && maze[i - 1][j] === "w") ||
            (i < maze.length - 1 && maze[i + 1][j] === "w") ||
            (j > 0 && maze[i][j - 1] === "w") ||
            (j < maze[0].length - 1 && maze[i][j + 1] === "w")
        ) {
            return true;
        }
    }
    return false;
}
function setMap(numObjectives, numObstacles, maze) {
    let indices = {};
    let x = Math.floor(Math.random() * (maze.length - 1));
    let y = Math.floor(Math.random() * (maze[0].length - 1)); // Assuming the maze has consistent column lengths
    maze[x][y] = "s";
    indices[`${x},${y}`] = 0;
    
    while (Object.keys(indices).length < numObjectives + numObstacles) {
      x = Math.floor(Math.random() * (maze.length - 1));
      y = Math.floor(Math.random() * (maze[0].length - 1)); // Assuming the maze has consistent column lengths
  
      if (indices.hasOwnProperty(`${x},${y}`)) {
        continue;
      } else {
        if (Object.keys(indices).length > numObjectives - 1) {
          if (conflict(x, y, maze)) {
            continue;
          } else {
            maze[x][y] = "w";
            indices[`${x},${y}`] = 0;
          }
        } else {
          maze[x][y] = "o";
          indices[`${x},${y}`] = 0;
        }
      }
    }
  
    return maze;
  }
  

export function getMap(grid){
    let maze = setMap(2, 10, grid);
    // console.log(maze);
    return maze;
}

