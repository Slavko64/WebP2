'use strict'
function WordsToString(Array){
    let str = "";
    for (let i = 0; i < Array.length; i++) {
        str += Array[i] + " ";
        }
        return str.substring(0, str.length - 1);
}

console.log(WordsToString(["слово1", "слово2", "слово3"]));