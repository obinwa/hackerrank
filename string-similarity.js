function stringSimilarity(s) {
  let suffixes = getSufixes(s);
  let totalMatch = 0;
  
  for(let suffix of suffixes){
      totalMatch = totalMatch + getMatchCount(suffix,s);
  }
  
  return totalMatch + s.length;
  
  // Write your code here
}

function getMatchCount(suffix,stringValue){
  let count = 0;
  
  for(let i = 0; i < suffix.length; i++){
      if(suffix[i] === stringValue[i]) {
          count = count + 1;
          console.log(`${suffix[i]} === ${stringValue[i]}, count =:> ${count}`);
      }else{
          break;
      }
  }
  console.log(`${suffix} =:> ${count}`);
  return count;
}

function getSufixes(stringValue){
  let suffixSubstrings = [];
  for(let i = 1; i < stringValue.length; i++){
      if(stringValue[i] === stringValue[0]){
          suffixSubstrings.push(stringValue.substring(i,stringValue.length));
      }
  }
  return suffixSubstrings;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
      const s = readLine();

      const result = stringSimilarity(s);

      ws.write(result + '\n');
  }

  ws.end();
}

