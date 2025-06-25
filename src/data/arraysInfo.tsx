export const arraysInfo = [
  {
    name: "General",
    description: `Here you can visulize sorting algorithms. The array contains 50 items. Below are some basic notes on each algorithm. To learn more
    about the implementation of the algorithms click the link below.`,
    link: "https://en.wikipedia.org/wiki/Sorting_algorithm",
  },
  {
    name: "Bubble Sort",
    description: `Bubble sort goes through every element in the array comparing the current item to the one after it.
    If the current is greater than the next we swap them.  We repeat this until were done. The time complexity of this is
    O(N^2)`,
  },
  {
    name: "Merge Sort",
    description: `In merge sort we split the array recursively. The idea is that we want to solve a smaller version of the problem so we break it down
    to its simplest form. This would be two items that we compare which merge into correct order. Then we repeat again until fully merged. The time complexity of this is
    O(N LOG(N))`,
  },
  {
    name: "Selection Sort",
    description: `In selection sort we set a min (first item by default). We itterate the list looking for a smaller min.
     If we get to the end of the list without finding another min we swap it. We continue this until all iterrations are done.
    The time complexity of this is
    O(N^2)`,
  },
  {
    name: "Insertion Sort",
    description: `Here we itterate through the array with a right pointer. If it the item before the right pointer is greater than we pass it back and swap it.
    We continue this until it the right pointer is in the correct position. The time complexity of this is
    O(N^2) `,
  },
];
