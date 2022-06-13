export function merge(nums_one, nums_two){
    let i = 0
    let j = 0
    let array = []

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


    return array;
}

export function mergeSort(arr){
    if (arr.length <= 1){
        return arr;
    }
    let mid = Math.floor(arr.length/2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    left = mergeSort(left);
    right = mergeSort(right);
    let array = merge(left, right);

    return array;
}



export function bubbleSort(arr, animations){
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

export function selectionSort(arr, animations){
    for (let i = 0; i < arr.length-1; i++){
        let currentMin = i

        
        for (var j = i+1; j < arr.length; j++){
            // add the animations once to change the color
            animations.push({'compare' : [j, currentMin]});
            // add the animations again to remove that color
            animations.push({'compare' : [j, currentMin]});
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

export function insertionSort(arr, animations){
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

