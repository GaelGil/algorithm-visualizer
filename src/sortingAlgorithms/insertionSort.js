export function getInsertionSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    // const auxiliaryArray = array.slice();
    // console.log(array)
    // console.log(auxiliaryArray)
    insertionSort(array, animations);
    return animations;
}

function insertionSort(arr, animations){
    for (let i = 1; i < arr.length; i++){
        let right = arr[i];
        // add the animations once to change the color
        animations.push({'compare' : [i-1, i]});
        // add the animations again to remove that color
        animations.push({'compare' : [i-1, i]});
        
        while (arr[i-1] > right){
            // add the animations once to change the color
            animations.push({'compare' : [i-1, i]});
            // add the animations again to remove that color
            animations.push({'compare' : [i-1, i]});
        

            animations.push([i, arr[i-1]]);
            animations.push([i-1, arr[i]]);
            let temp = arr[i];
            arr[i] = arr[i-1];
            arr[i-1] = temp;
            i-=1
        }
    }
    return arr;
}

