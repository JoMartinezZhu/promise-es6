function add(...args) {
    let sum = args.reduce((s, item) => (s = s + item), 0);
    let addChain = function (...args2) {
        sum = sum + args2.reduce((s, item) => (s = s + item), 0);
        return addChain;
    };
    addChain.valueOf = function () {
        console.log("valueOf");
        return sum;
    };
    return addChain;
}

console.log(add(1) + 0);
console.log(add(1, 2) + 0);
console.log(add(1, 2, 3) + 0);
console.log(add(1)(2, 3) + 0);
console.log(add(1)(2)(3)(4)(5)(6) + 0);
console.log(add(1)(2, 3)(5)(6)(7) + 0);
