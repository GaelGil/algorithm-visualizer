export class PriorityQueue {
  private heap: Array<{ node: any; path: any; cost: number; gcost: number }>;
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.heap.shift(); // return from beggining of pq { node, path, cost }
  }

  enqueue({
    node,
    path,
    cost,
    gcost = 0,
  }: {
    node: any;
    path: any;
    cost: number;
    gcost?: number;
  }) {
    // priority is f cost not g cost
    const newNode = { node, path, cost, gcost }; // create new node for pq
    if (
      this.isEmpty() ||
      newNode.cost >= this.heap[this.heap.length - 1].cost
    ) {
      // if pq is empty or larger than current largest
      this.heap.push(newNode); // add to the end
    } else {
      for (let i = 0; i < this.heap.length; i++) {
        // loop through pq and add node accordingly
        if (newNode.cost < this.heap[i].cost) {
          this.heap.splice(i, 0, newNode);
          break;
        }
      }
    }
  }
}
