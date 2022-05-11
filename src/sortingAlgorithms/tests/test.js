import {bubbleSort} from '../sortingAlgorithms.mjs'
// const assert = require('assert');
// import { bubbleSort } from '../sortingAlgorithms/bubbleSort';
// import { mergeSort } from '../sortingAlgorithms';
// import { insertionSort } from '../insertionSort';



describe ('bubbleSort()', function(){
    const tests = [
        {args: [64, 46, 7, 5, 9, 12, 1, 4, 9, 8,0,], expected: [0, 1, 4,5,7,8,9,12,46,64]},
    ];
    tests.forEach(({args, expected}) => {
        it(`sorts ${args} args `, function (){
            const res = bubbleSort(args);
            assert.strictEqual(res, expected)
        });
    });
}); 


function add(args) {
    return args.reduce((prev, curr) => prev + curr, 0);
  }
  
  describe('add()', function () {
    const tests = [
      {args: [1, 2], expected: 3},
      {args: [1, 2, 3], expected: 6},
      {args: [1, 2, 3, 4], expected: 10}
    ];
  
    tests.forEach(({args, expected}) => {
      it(`correctly adds ${args.length} args`, function () {
        const res = add(args);
        assert.strictEqual(res, expected);
      });
    });
  });
