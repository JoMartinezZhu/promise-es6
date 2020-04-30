class Observer {
    constructor(value) {
        this.value = value;
    }

    walk(value) {
        Object.keys(value).forEach((key) => this.convert(key, value[key]));
    }

    convert(key, val) {
        defineReactive(this.value, key, val);
    }
}

function defineReactive(obj, key, val) {}
