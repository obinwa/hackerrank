'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let substringMap = new Map();

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



function main() {
    const n = parseInt(readLine().trim(), 10);

    const genes = readLine().replace(/\s+$/g, '').split(' ');

    const health = readLine().replace(/\s+$/g, '').split(' ').map(healthTemp => parseInt(healthTemp, 10));

    const s = parseInt(readLine().trim(), 10);
    
    let maxGeneLength = getMaxSizeOfGene(genes);
    let max = 0;
    let min = Infinity;

    let [hashMap1,hashMap2,multipleStringIndex] = getMap(genes,health,0,n);
    
    for (let sItr = 0; sItr < s; sItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const first = parseInt(firstMultipleInput[0], 10);

        const last = parseInt(firstMultipleInput[1], 10);

        const d = firstMultipleInput[2];
        
        let totalHealth = findHealthyGenes(hashMap1,hashMap2,multipleStringIndex,first,last,d,maxGeneLength);
        
        if(totalHealth > max) max = totalHealth;
        if(totalHealth < min) min = totalHealth;
    }
    
    console.log(`${min} ${max}`);
}

function findHealthyGenes(map1,map2,multipleStringIndex,first,last,d,max){
  let hashMap1 = getSubMap(map1,map2,multipleStringIndex,first,last);
  
  let sum = 0;
  for(let i = 0; i< d.length; i++){
    sum = sum + (getMaxHealthyGene(d,i,hashMap1,map2,max,first,last));     
  }
  return sum;
  
}

function getMaxHealthyGene(d,index, map1,map2,maxGeneLength,first,last){
  let max = 0;
    
  let geneSubstrings = generateSubString(d,index,maxGeneLength);
    
  for(let geneSubstring of geneSubstrings){
      //if(!substringMap.get(geneSubstring)){
        let geneValue = getGeneValue(geneSubstring,map1);
        let geneMultipleValue = getGeneAlternateValues(map2,geneSubstring,first,last);
        geneValue = geneValue + geneMultipleValue;
      
        max =  geneValue > max ?  geneValue : max;
        
        console.log(`substring => ${geneSubstring}`);
       // substringMap.set(geneSubstring,geneValue);
     // }else{
    //      max = substringMap.get(geneSubstring) > max ? substringMap.get(geneSubstring) //: max;
     // }
  }

  return max;   
}

function getGeneAlternateValues(map,gene,first,last){
    let total = 0;
    let array = Array.from(map);
    for(let element of array){
        
        if(element[1]["gene"] === gene && (first <= element[0] && last >= element[0])) {            total = total + element[1]["value"];
        }
    }
    return total;
}

function generateSubString(healthyString,index,max){
  let forwardSubString = generateForwardSubString(healthyString,index,max);
  
  let subStrings = forwardSubString;
  return subStrings;
}

function generateForwardSubString(healthyString,index,max){
  if(index >= healthyString.length -1){
      return [healthyString[index]];
  }
  
  let subStrings = [];
  for(let i = index+1; i <= index + max + 1; i++){
      subStrings.push(healthyString.substring(index,i));
  }
  return subStrings;
}

function getMaxSizeOfGene(genes){
  let maxLength = 0;

  for(let gene of genes){
    let lengthOfGene = gene.length;
    if(lengthOfGene > maxLength) maxLength = lengthOfGene;
  }

  return maxLength;
}

function getMap(genes,health,first,last){
  let map1 = new Map();
  let map2 = new Map();
  let listOfMultipleStringIndex = [];
  for(let i = first; i< last; i++){
      if(map1.get(genes[i])){
        map2.set(i,{"gene":genes[i],"value":health[i]});
        listOfMultipleStringIndex.push(i);
        //map.set(genes[i],health[i] + map.get(genes[i]) );
      }else{
        map1.set(genes[i],health[i]);
      }
  }
  
  return [map1,map2,listOfMultipleStringIndex];
}

function getSubMap(map1,map2,list,first,last){
    let lastIndex = last;
    for(let index of list){
        if(first <= index && last>= index) lastIndex = lastIndex - 1;
    }
    let array = Array.from(map1).slice(first,lastIndex+1);
    let newSubMap = new Map(array);
    return newSubMap;
}



function getGeneValue(gene,map){
  if(!map.get(gene)) return 0;
  
  return map.get(gene);
}

//console.log(findHealthyGenes(['a','b','c','aa','d','b'],1,5,[1,2,3,4,5,6],"caaab",2));