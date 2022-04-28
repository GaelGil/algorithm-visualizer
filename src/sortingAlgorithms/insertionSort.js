export function getInsertionSortAnimations(){
}

function insertionSort(arr){
    for (let i = 1; i < arr.length; i++){
        let right = arr[i];

        while (arr[i-1] > right){
            let temp = arr[i];
            arr[i] = arr[i-1];
            arr[i-1] = temp;
            i-=1
        }
    }
    return arr
}

