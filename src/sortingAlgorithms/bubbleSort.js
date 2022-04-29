export function getBubbleSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    // console.log(array)
    // console.log(auxiliaryArray)
    bubbleSort(array, animations, auxiliaryArray);
    return animations;
}


function bubbleSort(arr, animations, aux){
    // console.log(arr);
    // console.log(aux);
    for (let j = 0; j < arr.length-1; j++){
        for (let i = 0; i < arr.length; i++){
            // animations.push([i, arr[i+1]]);
            // animations.push([aux[i], aux[i+1]]);

            if (arr[i] > arr[i+1]){
                animations.push([i, arr[i+1]]);
                animations.push([i+1, arr[i]])
                // animations.push([i, i+1]);
                // animations.push([i, aux[i+1]]);
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
        }
    }
    // return animations;
}