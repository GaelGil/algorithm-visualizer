export function getSelectionSortAnimations(){
}

export function selectionSort(arr){
    for (let i = 0; i < arr.length-1; i++){
        let currentMin = i
        for (var j = i+1; j < arr.length; j++){
            if (arr[j] < arr[currentMin]){
                currentMin = j;
            }
        }
        // sawp
        if (currentMin !== i){
            let temp = arr[i]
            arr[i] = arr[currentMin]
            arr[currentMin] = temp
        }
        
    }
    return arr;
}