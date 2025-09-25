const ANIMATION_SPEED_MS: number = 5;
const PRIMARY_COLOR: string = "green";
const SECONDARY_COLOR: string = "red";

// Function to color nodes
export const colorNodes = (path: any[], expanded: any[]) => {
  // get node html element by row and col
  const getNodeElement = ([row, col]: any) =>
    document.querySelector(
      `.matrix-row-${row} .col-index-${col}`
    ) as HTMLElement | null;

  // Color path nodes
  path.forEach((node: any) => {
    const el = getNodeElement(node);
    if (
      el &&
      !el.classList.contains("objective") &&
      !el.classList.contains("start")
    ) {
      el.classList.add("path");
    }
  });

  // Color expanded nodes with delay
  expanded?.forEach((node: any, index: number) => {
    const el = getNodeElement(node);
    if (
      el &&
      !el.classList.contains("path") &&
      !el.classList.contains("objective") &&
      !el.classList.contains("start") &&
      !el.classList.contains("obstacle")
    ) {
      setTimeout(() => {
        el.classList.add("expanded");
      }, index * 10);
    }
  });
};

export const startSorting = (animations: any[]) => {
  // Function to handle the animations for sorting algorithms
  const arrayBars = document.getElementsByClassName("array-bar"); // select the array bars html
  let current_animation = { compare: [] }; // we compare this to the first animation
  for (let i = 0; i < animations.length; i++) {
    // if the current item in animations is a dictionary change the color
    if (animations[i].constructor === Object) {
      const barOneIdx = animations[i].compare[0]; // select the first bar index
      const barTwoIdx = animations[i].compare[1]; // select the second bar index
      const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
      const barTwoStyle = (arrayBars[barTwoIdx] as HTMLElement).style;
      let color = PRIMARY_COLOR;
      // If the animation is the same as the previous one this means that we are only adding it
      // to show the values we are currently comparing. So we change the color of them.
      if (
        JSON.stringify(animations[i].compare) ===
        JSON.stringify(current_animation.compare)
      ) {
        color = SECONDARY_COLOR;
      }
      current_animation = animations[i];
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else {
      // if not we are just performing a swap on the array bars
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
        barOneStyle.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
  return animations.length * ANIMATION_SPEED_MS;
};

export const clearGrid = () => {
  // Function to clear the grid of path and expanded nodes
  const pathNodes = document.querySelectorAll(".matrix-cell.path");
  pathNodes.forEach((node) => {
    node.classList.remove("path");
  });

  const expandedNodes = document.querySelectorAll(".matrix-cell.expanded");
  expandedNodes.forEach((node) => {
    node.classList.remove("expanded");
  });
};
