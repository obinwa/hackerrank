// Javascript implementation of search and insert operations
// on Trie

// Alphabet size (# of symbols)
let ALPHABET_SIZE = 26;

// trie node
class TrieNode
{
  isEndOfWord;
  children;
  variants;
  index;
	constructor()
	{
		this.isEndOfWord = false;
		this.children = new Array(ALPHABET_SIZE);
    this.variants = [];
    this.index=0;
		for (let i = 0; i < ALPHABET_SIZE; i++)
			this.children[i] = null;
	}
}

let root;

// If not present, inserts key into trie
	// If the key is prefix of trie node,
	// just marks leaf node
function insert(key,weight,indexOfKey)
{
	let level;
  let length = key.length;
  let index;
  let seen = true;;

  let pCrawl = root;

  for (level = 0; level < length; level++)
  {
    index = key[level].charCodeAt(0) - 'a'.charCodeAt(0);
    if (pCrawl.children[index] == null){
      pCrawl.children[index] = new TrieNode();
      seen = false;
    }else{
      seen = seen && true;
    }
    pCrawl = pCrawl.children[index];
  }

  pCrawl.variants.push({"weight":weight,"index":indexOfKey});

  // mark last node as leaf
  pCrawl.isEndOfWord = true;
}

function constructTrie(genes, health){
  for(let i = 0; i < genes.length; i++){
    insert(genes[i],health[i],i);
  }
}

function getTotalHealth(key,first,last){
  let total = 0;
  for(let i =0; i < key.length; i++){
    total = total + getGeneHealth(key,i,first,last);
  }
  return total;
}

// Returns true if key presents in trie, else false
function getGeneHealth(key,startIndex,first,last)
{
	let level;
  let length = key.length;
  let index;
  let pCrawl = root;
  max = 0;
  
  for (level = startIndex; level < length; level++)
  {
    index = key[level].charCodeAt(0) - 'a'.charCodeAt(0);

    if (pCrawl.children[index] == null){
      return max;
    }else{
      for(let obj of pCrawl.children[index].variants){

        if(obj.index >= first && obj.index <= last ){
          max = max + obj.weight;
        }
      }
    }
      
    pCrawl = pCrawl.children[index];
  }
  return max;

  //return (pCrawl.isEndOfWord);
}



// Driver
// Input keys (use only 'a' through 'z' and lower case)

root = new TrieNode();
let genes = ['a','b','c','aa','d','b'];
let health = [1,2,3,4,5,6];
constructTrie(genes,health);

getMinMaxGeneHealth(listOfSampleGenes,)

console.log(getTotalHealth("xyz",1,5));



// let keys = ["the", "a", "there", "answer", "any",
// 				"by", "bye", "their"];

// let output = ["Not present in trie", "Present in trie"];


// root = new TrieNode();

// // Construct trie
// let i;
// for (i = 0; i < keys.length ; i++)
// 	insert(keys[i]);

// // Search for different keys
// if(search("the") == true)
// 	document.write("the --- " + output[1]+"<br>");
// else
// 	document.write("the --- " + output[0]+"<br>");

// if(search("these") == true)
// 	document.write("these --- " + output[1]+"<br>");
// else
// 	document.write("these --- " + output[0]+"<br>");

// if(search("their") == true)
// 	document.write("their --- " + output[1]+"<br>");
// else
// 	document.write("their --- " + output[0]+"<br>");

// if(search("thaw") == true)
// 	document.write("thaw --- " + output[1]+"<br>");
// else
// 	document.write("thaw --- " + output[0]+"<br>");


