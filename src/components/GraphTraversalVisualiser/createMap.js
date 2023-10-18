class Map{
    constructor(maze){
        this.maze = maze
        // this.obstacles = 0;
        // this.objectives = 0
    }

    conflict(i, j){
        // for i in obstacles and start
        // if obstacles is or start is blocked
        if (this.maze[i][j] === "w" || this.maze[i][j] === "o"){
            return false;
        }
        else if (i < 0 || j <0 ){
            if (this.maze[i+1][j+1] ){
                
            }
        }

        return true;
    }

    setMap(numObjectives, numObstacles){
        let objectivesAndObstacles = {};
        let objectives = {};
        // create a randpm tuple and set is as start
        this.maze[i][j] = "s";

        while (objective.length < numObjectives+numObstacles){
            // generate tuples
            if (objectives.length === numObjectives){

            }
            // if tuple not in set
                // add to set
                // set the obstacle in the maze
                if (objectives.length === numObjectives){

                }
            // else
                // ignore and continue
        }

    }

    setStart(){
        for (let i = 0; i < this.maze.length; i++){
            for (let j = 0; j < this.maze[i].length; j++){
                if (!this.conflict(i, j)){
                    this.maze[i][j] = "s";
                }
            }
        }
    }

    getMap(){
        this.setMap(30, 10);
        return this.maze
    }
}

export default Map;