class NodeVal{
  // root;
  // value; 
  constructor(root,val){
      this.root = root;
      this.value = val;
  }
}

let array = [[1, 2]];

// let array = [[100, 70],
//   [0, 11],
//   [2, 4],
//   [2, 95],
//   [3, 48],
//   [4, 85],
//   [4, 95],
//   [5, 67],
//   [5, 83],
//   [5, 42],
//   [6, 76],
//   [9, 31],
//   [9, 22],
//   [9, 55],
//   [10, 61],
//   [10, 38],
//   [11, 96],
//   [11, 41],
//   [12, 60],
//   [12, 69],
//   [14, 80],
//   [14, 99],
//   [14, 46],
//   [15, 42],
//   [15, 75],
//   [16, 87],
//   [16, 71],
//   [18, 99],
//   [18, 44],
//   [19, 26],
//   [19, 59],
//   [19, 60],
//   [20, 89],
//   [21, 69],
//   [22, 96],
//   [22, 60],
//   [23, 88],
//   [24, 73],
//   [27, 29],
//   [30, 32],
//   [31, 62],
//   [32, 71],
//   [33, 43],
//   [33, 47],
//   [35, 51],
//   [35, 75],
//   [37, 89],
//   [37, 95],
//   [38, 83],
//   [39, 53],
//   [41, 84],
//   [42, 76],
//   [44, 85],
//   [45, 47],
//   [46, 65],
//   [47, 49],
//   [47, 94],
//   [50, 55],
//   [51, 99],
//   [53, 99],
//   [56, 78],
//   [66, 99],
//   [71, 78],
//   [73, 98],
//   [76, 88],
//   [78, 97],
//   [80, 90],
//   [83, 95],
//   [85, 92],
//   [88, 99],
//   [88, 94]];

// let array = [[0, 2],
//   [1 ,8],
//   [1, 4],
//   [2, 8],
//   [2, 6],
//   [3, 5],
//   [6, 9]];
let val = journeyToMoon(1000,array);
console.log(val);

function journeyToMoon(n, astronaut) {
  // Write your code here
  
  let mapForest = new Map();
  let mapHold = new Map();
  
  for(let array of astronaut){
      let [a,b] = array;
      if(mapHold.get(a) && !mapHold.get(b)){
          let root = mapHold.get(a).root;
          // let rootNode = mapHold.get(root);
          mapHold.set(b,new NodeVal(root,b));
          let currentCount = mapForest.get(root);
          mapForest.set(root, currentCount + 1);
      }
      else if(mapHold.get(a) && mapHold.get(b)){
       // let root = mapHold.get(a).root;
          // let rootNode = mapHold.get(root);
          
          merge(a,b,mapForest,mapHold);

          // let currentCount = mapForest.get(a);
          // mapForest.set(a, currentCount + 1);
      }
      else if(mapHold.get(b) && !mapHold.get(a)){
          let root = mapHold.get(b).root;
          // let rootNode = mapHold.get(root);
          mapHold.set(a,new NodeVal(root,a));
          let currentCount = mapForest.get(root);
          mapForest.set(root, currentCount + 1);
      }
      else{
          let aNode = new NodeVal(a,a);
          let bNode = new NodeVal(a,b);
          mapHold.set(a,aNode);
          mapHold.set(b,bNode);
          
          mapForest.set(a,2);
      }
      console.log(mapForest);
      console.log(mapHold);
      console.log(`${a}, ${b}`);
      console.log();
  }
  
  let totalPartCombination = 0 ;
  let total = combine(n);
  for (const [key, value] of mapForest.entries()) {
      totalPartCombination = totalPartCombination + combine(value)
  }

  console.log(` part combination => ${totalPartCombination} total combination => ${total}`);
 return total - totalPartCombination; 

}

function merge(a,b,mapForest,mapHold){
  console.log("In merge");
  let rootA = mapHold.get(a).root;
  let rootB = mapHold.get(b).root;

  if(rootA === rootB) return;

  for(const [key, value] of mapHold.entries()) {
    if(value.root === rootB){
      value.root = rootA;
      mapHold.set(key,value);
      let currentCount = mapForest.get(rootA);
      mapForest.set(rootA,currentCount + 1);
    }
  }
  mapForest.delete(rootB);
}

function combine(n){
  // let numerator = factorial(n);
  // let denominator = factorial(n-2)*2;
  return (n*(n-1)/2);
}
var f = [];
function factorial (n) {
if (n == 0 || n == 1)
  return 1;
if (f[n] > 0)
  return f[n];
return f[n] = factorial(n-1) * n;
}

function factorial(num)
{
  var rval=1;
  for (var i = 2; i <= num; i++)
      rval = rval * i;
  return rval;
}



