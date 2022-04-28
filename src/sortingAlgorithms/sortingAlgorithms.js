export function merge(nums_one, nums_two){
    let i = 0
    let j = 0
    let array = []

    // console.log('here')
    while (i < nums_one.length && j < nums_two.length){
        if (nums_one[i] < nums_two[j]){
            array.push(nums_one[i]);
            i++;
        } else if (nums_one[i] > nums_two[j]){
            array.push(nums_two[j])
            j++;
        } else if (nums_one[i] === nums_two[j]){
            array.push(nums_one[i]);
            array.push(nums_two[j]);
            i++;
            j++;
        }
    }


    if (i < nums_one.length){
        array = array.concat(nums_one.slice(i));
    }
    if (j < nums_two.length){
        array = array.concat(nums_two.slice(j));
    }


    console.log(array);
    return array;
}

export function mergeSort(arr){
    // console.log(arr)
    if (arr.length <= 1){
        return arr;
    }
    let mid = Math.floor(arr.length/2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    left = mergeSort(left);
    right = mergeSort(right);
    let array = merge(left, right);
    console.log(array);

    return array;
}



export function bubbleSort(arr){
    for (let j = 0; j < arr.length-1; j++){
        for (let i = 0; i < arr.length; i++){
            if (arr[i] > arr[i+1]){
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
        }
    }
    return arr;
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

export function insertionSort(arr){
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

