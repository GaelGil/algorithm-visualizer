function isValidIndex(matrix: any[][], i: number, j: number) {
  return i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length;
}

export function getNeighbors(matrix: any[][], current_node: number[]) {
  let neighbors = [];
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
    neighbors.push([i, j - 1]);
  }

  // right neighbor
  if (isValidIndex(matrix, i, j + 1)) {
    neighbors.push([i, j + 1]);
  }

  return neighbors;
}

// function to check for conflict
export function conflict(i: number, j: number, maze: any[][]) {
  // index checking
  if (i < 0 || i >= maze.length || j < 0 || j >= maze[0].length) {
    return false;
  }

  if (
    maze[i][j] === "w" ||
    maze[i][j] === "e" ||
    maze[i][j] === "o" ||
    maze[i][j] === "s"
  ) {
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

export function heuristic(node: number[], destination: number[]) {
  return (
    Math.abs(node[0] - destination[0]) + Math.abs(node[1] - destination[1])
  );
}

export function exists(list_: any[], node: any[]) {
  const nodeString = JSON.stringify(node);
  return list_.some((item) => JSON.stringify(item) === nodeString);
}

export function randInts(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
