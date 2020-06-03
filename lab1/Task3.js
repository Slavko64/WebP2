function Fibonachi(n){
        let a = 1;
        let b = 1;
        let c = a + b;
    for (let i = 3; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}

console.log(Fibonachi(6));