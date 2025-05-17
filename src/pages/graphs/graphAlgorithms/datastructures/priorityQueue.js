export class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    enqueue(node, path, priority) {
        const newNode = { node, path , priority};
        let added = false;
        for (let i = 0; i < this.heap.length; i++) {
            if (priority < this.heap[i].priority) {
                this.heap.splice(i, 0, newNode);
                added = true;
                break;
            }
        }
        if (!added) {
            this.heap.push(newNode);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.heap.shift().node;
    }

    peek() {
        return this.isEmpty() ? undefined : this.heap[0].node;
    }
}
