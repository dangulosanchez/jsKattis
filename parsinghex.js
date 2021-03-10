let input = new Array();
const hexCharacters = "0123456789abcdefABCDEFxX";

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    input.push(line);
});

rl.on('close', function () {
    for(let i = 0; i < input.length; i++){
        parsingHex(input[i]);
    }
});

function parsingHex(string){
    //replace any character that is not a valid hex character with a space
    //remove duplicate spaces, split by spaces and then evaluate which are proper hex numbers
    for(let i = 0; i < string.length; i++){
        if(!hexCharacters.includes(string[i])){
            string = replaceAt(string, i, " ");
        }
    }
    while(string.includes("  ")){
        string = string.replace("  ", " ");
    }
    let chunks = string.trim().split(" ");
    for(let i = 0; i < chunks.length; i++){
        let current = format(chunks[i]);
        let parsed = parseInt(current, 16);
        if(!isNaN(parsed)){
            console.log(current + " " + parsed);
        }
    }
}

function format(string){
    string = string.trim();
    //hex numbers must start with 0x (or 0X) and an X must only be used in that part
    while(string.endsWith("X") || string.endsWith("x")){
        string = string.substring(0, string.length - 1);
    }
    while(string.length >= 3 && (!string.startsWith("0x") && !string.startsWith("0X"))){
        string = string.substring(1);
    }
    return string;
}

function replaceAt(string, index, character){
    let firstHalf = string.substring(0, index);
    let secondHalf = string.substring(index + 1);
    return firstHalf + "" + character + "" + secondHalf;
}