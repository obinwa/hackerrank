
function* arrayGenerator(x, y){
  yield [0,0];
  let start = 0;
  let area = (x-1) * (y-1);
  while(start <= area ){
    start = start + 1;
  let aX = (start) % x;
  //let yTemp = start;
  let aY = Math.floor((start)/x) % y;
  yield [aX,aY];
  }
}

const gen = arrayGenerator(3,9);

for(let n of gen){
  console.log(n);
}