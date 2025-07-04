export function getSelectionSortAnimations(array: number[]) {
  const animations: any[] = [];
  if (array.length <= 1) return array;
  selectionSort(array.slice(), animations);
  return animations;
}

function selectionSort(arr: number[], animations: any[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    let currentMin = i;

    for (var j = i + 1; j < arr.length; j++) {
      // add the animations once to change the color
      animations.push({ compare: [j, currentMin] });
      // add the animations again to remove that color
      animations.push({ compare: [j, currentMin] });
      if (arr[j] < arr[currentMin]) {
        currentMin = j;
      }
    }

    // sawp
    if (currentMin !== i) {
      animations.push([i, arr[currentMin]]);
      animations.push([currentMin, arr[i]]);
      let temp = arr[i];
      arr[i] = arr[currentMin];
      arr[currentMin] = temp;
    }
  }
  return arr;
}
