function GetUnique(Array){
    let current;
    let unique = [];
    for (let i = 0; i < Array.length; i++) {
        current = Array[i];
        if (unique.indexOf(current) == -1)
                unique.push(current);
    }
    return unique;
}

console.log(GetUnique(["слово1", "слово2", "слово2"]));