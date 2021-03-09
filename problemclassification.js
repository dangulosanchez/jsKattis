let input = new Array();

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    input.push(line);
});


rl.on('close', function () {
    let categories = parseInt(input[0]);
    let dictionary = new Array(0);
    let wordsUsed = new Array();

    for(let i = 0; i < categories; i++){

        let currentLine = input[i + 1].split(" ");
        let amountOfWords = parseInt(currentLine[1]);

        dictionary.push({
            problem: currentLine[0],
            numberOfWords: amountOfWords,
            words: currentLine.slice(2),
            timesAppeared: 0
        })

        for(let j = 0; j < dictionary[i].words.length; j++){
            wordsUsed.push(dictionary[i].words[j]);
        }
    }
    wordsUsed = wordsUsed.filter(onlyUnique);

    let timesUsed = new Map();

    for(let i = categories + 1; i < input.length; i++){
        let currentLine = input[i].split(" ");
        for(let j = 0; j < currentLine.length; j++){
            if(wordsUsed.includes(currentLine[j])){
                if(timesUsed.has(currentLine[j])){
                    timesUsed.set(currentLine[j], timesUsed.get(currentLine[j]) + 1);
                }
                else{
                    timesUsed.set(currentLine[j], 1);
                }
            }
        }
    }

    for(let[key, value] of timesUsed){
        for(let i = 0; i < dictionary.length; i++){
            if(dictionary[i].words.includes(key)){
                dictionary[i].timesAppeared += value;
            }
        }
    }

    let max = 0;
    let possibleCategories = new Array(0);

    for(let i = 0; i < dictionary.length; i++){
        if(max < dictionary[i].timesAppeared){
            max = dictionary[i].timesAppeared;
            possibleCategories = new Array(0);
            possibleCategories.push(dictionary[i].problem);
        }
        else if(max === dictionary[i].timesAppeared){
            possibleCategories.push(dictionary[i].problem);
        }
    }

    if(possibleCategories.length === 1){
        console.log(possibleCategories[0]);
    }
    else{
        possibleCategories.sort();
        for(let i = 0; i < possibleCategories.length; i++){
            console.log(possibleCategories[i]);
        }
    }
});
    
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
