
// Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

/*Input: [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

*/

console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2]));


function longestConsecutiveSequence(numArray){
  if(numArray.length <= 0) return 0;

  let maximumValue = getMaxValue(numArray);
  let minimumValue = getMinValue(numArray);
  console.log(`minimum value => ${minimumValue} , maximum value => ${maximumValue}`);

  let numSet = new Set(numArray);

  let maxLength = 0;

  while(numSet.size > 0){
    let initialVal = numSet.values().next().value;

    numSet.delete(initialVal);

    let count = 1;
    for(let n = initialVal + 1; numSet.delete(n); n++){
      count = count + 1;
    }

    for(let n = initialVal - 1; numSet.delete(n); n--){ 
      count = count + 1;
    }

    console.log(`count is ${count} for value => ${initialVal}`)
    if(count > maxLength) maxLength = count;
  }
  return maxLength;
}

