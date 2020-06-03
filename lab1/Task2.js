function WordsToUpperCase(str){
    let Array = str.split(" ");
    let output = "";
    for (let i = 0; i < Array.length; i++) {
       output += Array[i][0].toUpperCase() + Array[i].slice(1) + " ";
        
    }
    return output.substring(0, output.length - 1);
}

console.log(WordsToUpperCase("cлово1 cлово2 cлово3"));