const ANIMATION_SPEED_MS: number = 5;
const PRIMARY_COLOR: string = "green";
const SECONDARY_COLOR: string = "red";

export const colorNodes = (path: any[], expanded: any) => {
  path.forEach((node) => {
    const [row, col] = node;
    const nodeElement = document.querySelector(
      `.matrix-row-${row} .col-index-${col}`
    );
    if (nodeElement) {
      if (
        !nodeElement.classList.contains("objective") &&
        !nodeElement.classList.contains("start")
      ) {
        nodeElement.classList.add("path");
      }
    }
  });
  if (expanded) {
    expanded.forEach((node: any) => {
      const [row, col] = node;
      const nodeElement = document.querySelector(
        `.matrix-row-${row} .col-index-${col}`
      );
      if (nodeElement) {
        if (
          !nodeElement.classList.contains("path") &&
          !nodeElement.classList.contains("objective") &&
          !nodeElement.classList.contains("start")
        ) {
          nodeElement.classList.add("expanded");
        }
      }
    });
  }
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
