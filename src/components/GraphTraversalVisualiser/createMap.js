class Map{
    constructor(maze){
        this.maze = maze
    }

    conflict(i, j) {
        if (i < 0 || i >= this.maze.length || j < 0 || j >= this.maze[0].length) {
            return false;
        }
        if (this.maze[i][j] === "w") {
            return true;
        }
        if (this.maze[i][j] === "o") {
            if (
                (i > 0 && this.maze[i - 1][j] === "w") ||
                (i < this.maze.length - 1 && this.maze[i + 1][j] === "w") || 
                (j > 0 && this.maze[i][j - 1] === "w") || 
                (j < this.maze[0].length - 1 && this.maze[i][j + 1] === "w") 
            ) {
                return true;
            }
        }
        return false;
    }
    

    setMap(numObjectives, numObstacles){
        let indices = {}
        let x = Math.floor(Math.random() * (this.maze.length + 1));
        let y = Math.floor(Math.random() * (this.maze.length + 1));
        this.maze[x][y] = "s";
        indices[(x, y)] = 0;

        while (indices.length < numObjectives+numObstacles){
            x = Math.floor(Math.random() * (this.maze.length + 1));
            y = Math.floor(Math.random() * (this.maze.length + 1));
            if (indices.length === numObjectives){
                if (this.conflict(x ,y)){
                    continue;
                } else {
                    this.maze[x][y] = "w"
                }
            } 
            else if(indices.hasOwnProperty((x,y))){
                continue;
            } else {
                this.maze[x][y] = "o"
            }

        }

    }

    getMap(){
        this.setMap(30, 10);
        return this.maze
    }
}

export default { Map };