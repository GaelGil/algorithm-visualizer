let array = [23, 452, 52, 35, 235,  2, 3, 42, 78, 2332, 2234, 312, 98, 132]


function merge(nums_one, nums_two){
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
        } else if (nums_one[i] == nums_two[j]){
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

function mergeSort(arr){
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



function bubbleSort(arr){
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
