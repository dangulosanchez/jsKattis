let input = new Array();

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//read all input and save into "input" array
rl.on('line', (line) => {
    input.push(line);
});


//once input is read, solve it per groups of data
rl.on('close', function () {
    const groups = formatInput(input);
    for(let i = 0; i < groups.length; i++){
        solveDyslectionary(groups[i]);
        if(i !== groups.length - 1){
            console.log("");
        }
    }
});


//sorts the list of reversed words, adds padding
function solveDyslectionary(group){
    let words = group.words;
    let maxLength = group.maxLength;
    
    words.sort();
    for(let i = 0; i < words.length; i++){
        let reversed = reverse(words[i]);
        while(reversed.length < maxLength){
            reversed = " " + reversed;
        }
        console.log(reversed);
    }
}

function formatInput(input){
    input.push("");
    //each "group" consists of the words and the maximum length of a string
    //this is to avoid having to run through the array unecessarily again
    const groups = new Array({
        words: new Array(),
        maxLength: 0
    });
   
    let currentArray = new Array();
    let currentMaxLength = 0;
    for(let i = 0; i < input.length; i++){
        if(input[i] === ""){
            const newGroup = new Object();
            newGroup.words = currentArray;
            newGroup.maxLength = currentMaxLength;
            groups.push(newGroup);
            
            currentArray = new Array();
            currentMaxLength = 0;
        }
        else{
            currentArray.push(reverse(input[i]));
            currentMaxLength = Math.max(input[i].length, currentMaxLength);
        }
    }
    
    //to catch errors
    for(let i = 0; i < groups.length; i++){
        if(groups[i].words.length === 0){
            groups.shift();
            i--;
        }
    }
    return groups;
}

function reverse(string){
    let index = string.length - 1;
    let newString = "";
    for(let i = 0 ; i < string.length; i++){
        newString += string[index];
        index--;
    }
    return newString;
}
