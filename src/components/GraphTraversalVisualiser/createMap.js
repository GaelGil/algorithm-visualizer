class Map{
    constructor(maze){
        this.maze = maze
        this.obstacles = 0;
        this.objectives = 0
    }

    checkConflicts(){
        // for i in obstacles and start
        // if obstacles is or start is blocked
    }

    setObstacles(numObstacles, numObjectives){
        let obstacles = {};
        let objectives = {};
        while (length(obstacles) + length(objectives) < numObstacles+numObjectives){
            // generate tuples
            // if tuple not in set,
                // add to set
                // set the obstacle in the maze
            // else
                // ignore and continue
        }

    }

    setStart(){
        for (let i = 0; i < length(maze); i++){
            for (let j = 0; j < length(maze[i]); j++){
                if (maze[i][j] != 1 || maze[i][j] != 2){
                    maze[i][j] == "s";
                }
            }
        }
    }
}