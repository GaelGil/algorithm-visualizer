import { Stack } from './datastructures/stack';


export function BFS(grid, start, destination){
    // let root = start;
    let queue = [start];
    let path = {}
    let expanded = {}
    let visited = {}
    while (queue){
        let current_node = queue[queue.length-1]
        // stack.remove(stack.length-1)
        if (current_node === destination){
            return path
        }

    }
        // let current_node = stack.pop()
        // if current_node == destination;
        // solution found 
        // else if current_node not in visited and current_node in grid:
            // visited[curernt_node] = 0
            // get neighbors 
            // append_neihbors to stack
    // get neighbors
    return 0
}

