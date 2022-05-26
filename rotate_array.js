function rotateArray(array, K) {
  let A = array.slice();
  if (!A.length) return A;
  let index = -1;
  while (++index < K) {
      A.unshift(A.pop());
  }
  return A;
}

let testArray = [3, 8, 9, 7, 6];
let rotatedArray = rotateArray(testArray,3);

console.log(`test array => ${testArray}, rotated array is ${rotatedArray}`);

// [
//   rotateArray([3, 8, 9, 7, 6], 3),
//   rotateArray([0, 0, 0], 1),
//   rotateArray([1, 2, 3, 4], 4),
//   rotateArray([], 4),
// ].join(' | ');