



function merge(nums_one, nums_two){
    let i = 0
    let j = 0
    let array = []

    while (i < nums_one.length && i < nums_two.length){
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
        let array = array.join(nums_one.slice(i, nums_one.length))
    }
    if (j < nums_two.length){
        let array = array.join(nums_two.slice(j, nums_two.length)) 
    }



    return array;
}

function mergeSort(arr){
    
}


let array = [23, 452, 52, 35, 235,  2, 3, 42, 78, 2332, 2234, 312, 98, 132]

let sorted_one = [1,2 ,3 ,4, 5]
let sorted_two = [5, 6, 7, 8, 9]

// console.log(mergeSort(array));


console.log(merge(sorted_one, sorted_two))