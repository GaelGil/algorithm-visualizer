export function getSelectionSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    // const auxiliaryArray = array.slice();
    // console.log(array)
    // console.log(auxiliaryArray)
    selectionSort(array, animations);
    return animations;
}

export function selectionSort(arr, animations){
    for (let i = 0; i < arr.length-1; i++){
        let currentMin = i
        for (var j = i+1; j < arr.length; j++){
            if (arr[j] < arr[currentMin]){
                currentMin = j;
            }
        }
        // sawp
        if (currentMin !== i){
            animations.push([i, arr[currentMin]]);
            animations.push([currentMin, arr[i]]);
            let temp = arr[i]
            arr[i] = arr[currentMin]
            arr[currentMin] = temp
        }
        
    }
    return arr;
}