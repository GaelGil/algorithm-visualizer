export function getBubbleSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    // console.log(array)
    // console.log(auxiliaryArray)
    bubbleSort(array, animations, auxiliaryArray);
    return animations;
}


function bubbleSort(arr, animations){
    for (let j = 0; j < arr.length; j++){
        for (let i = 0; i < arr.length-1; i++){
            // add the animations once to change the color
            animations.push({'compare' : [i, i+1]});
            // add the animations again to remove that color
            animations.push({'compare' : [i, i+1]});
            if (arr[i] > arr[i+1]){
                // add the animations for the swap
                animations.push([i, arr[i+1]]);
                animations.push([i+1, arr[i]])
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
        }
    }
    return arr;
}