// function LazyMan(name) {
//     this.taskQueue = [];
//     console.log(name);
//     setTimeout(() => {
//         this.next();
//     }, 0);
// }

// LazyMan.prototype.next = function () {
//     let fn = this.taskQueue.shift();
//     fn && fn();
// };

// LazyMan.prototype.sleep = function (timer) {
//     let fn = () => {
//         console.log("sleep start ", timer);
//         setTimeout(() => {
//             console.log("sleep end ", timer);
//             this.next();
//         }, timer * 1000);
//     };
//     this.taskQueue.push(fn);
//     return this;
// };

// LazyMan.prototype.eat = function (dinner) {
//     let fn = () => {
//         console.log("eat ", dinner);
//         this.next();
//     };
//     this.taskQueue.push(fn);
//     return this;
// };

// new LazyMan("lazyman").sleep(1).eat("a").sleep(3).eat("c");

class LazyMan {
    constructor(name) {
        console.log(name);
        setTimeout(() => {
            console.log("task queue ", this.taskQueue);
            this.next();
        });
    }

    taskQueue = [];

    next = () => {
        let fn = this.taskQueue.shift();
        fn && fn();
    };

    sleep = (timer) => {
        let fn = () => {
            console.log("sleep start ", timer);
            setTimeout(() => {
                console.log("sleep end ", timer);
                this.next();
            }, timer * 1000);
        };
        this.taskQueue.push(fn);
        return this;
    };

    eat = (dinner) => {
        let fn = () => {
            console.log("eat ", dinner);
            this.next();
        };
        this.taskQueue.push(fn);
        return this;
    };
}

new LazyMan("lazyman").sleep(1).eat("a").sleep(3).eat("c");
