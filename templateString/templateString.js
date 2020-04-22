let str = "I am {{name}},age {{age}},job {{job}}";

let data = {
    name: "henry",
    age: 18,
    job: "IT",
};

function render(str, data) {
    return str.replace(/\{\{(\w+)\}\}/g, function (mode, key) {
        console.log(key);
        return data[key];
    });
}

var result = render(str, data);

console.log("result : ", result);
