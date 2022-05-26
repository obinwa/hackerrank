function getMaxSizeOfGene(genes){
  let max = 0;

  for(let gene of genes){
    lengthOfGene = gene.length;
    if(lengthOfGene > max) max = lengthOfGene;
  }

  return max;
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

function generateBackwardSubString(healthyString,index){
  if(index <= 0){
      return [healthyString[0]];
  }
  
  let subStrings = [];
  for(let i = index; i >= 0; i--){
      subStrings.push(healthyString.substring(i,index+1));
  }
  return subStrings;
}

function generateSubString(healthyString,index){
  let forwardSubString = generateForwardSubString(healthyString,index);
  //let backwardSubString = generateBackwardSubString(healthyString,index);

  let subStrings = forwardSubString;//.concat(backwardSubString.slice(1));
  return subStrings;
}

function getMap(genes,health,first,last){
  let map = new Map();
  for(let i = first; i<= last; i++){
      if(map.get(genes[i])){
        map.set(genes[i],health[i] + map.get(genes[i]) );
      }else{
        map.set(genes[i],health[i]);
      }
  }
  
  return map;
}

function getMaxHealthyGene(d,index, map){
  let max = 0;
  
  let geneSubstrings = generateSubString(d,index);
    
  for(let geneSubstring of geneSubstrings){
      let geneValue = getGeneValue(geneSubstring,map);
      max =  max + geneValue;
  }

  //console.log(`${d[index]} count is ${max}`);
  
  return max;   
}

function getGeneValue(gene,map){
  if(!map.get(gene)) return 0;
  
  return map.get(gene);
}

function findHealthyGenes(genes,first,last,healthyGenes,d){
  let maxGeneLength = getMaxSizeOfGene(genes);
  console.log(maxGeneLength);
  let hashMap = getMap(genes,healthyGenes,first,last);
  //console.log(hashMap);
  let sum = 0;
  for(let i = 0; i< d.length; i++){
      sum = sum + (getMaxHealthyGene(d,i,hashMap,maxGeneLength));
  }
  return sum;
  
}


console.log(findHealthyGenes(['a','b','c','aa','d','b'],1,5,[1,2,3,4,5,6],"caaab"));
//console.log(getMap("abcdef",[1,3,5,2,1,4],1,5));
//console.log(generateSubString("abghuieeo",4));
