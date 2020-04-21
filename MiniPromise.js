class MiniPromise {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";

    constructor(executor) {
        this.status = MiniPromise.PENDING;
        this.value = undefined;
        this.reason = undefined;
        // 存放成功的回调;
        this.onResolvedCallbacks = [];
        // 存放失败的回调;
        this.onRejectedCallbacks = [];

        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            console.error("catch error", error);
            this.reject(error);
        }
    }

    resolve = (data) => {
        if (this.status === MiniPromise.PENDING) {
            this.value = data;
            this.status = MiniPromise.FULFILLED;
            this.onResolvedCallbacks.forEach((fn) => fn());
        }
    };

    reject = (reason) => {
        if (this.status === MiniPromise.PENDING) {
            this.reason = reason;
            this.status = MiniPromise.REJECTED;
            this.onRejectedCallbacks.forEach((fn) => fn());
        }
    };

    then(onFulfilled, onRejected) {
        let promise = null;
        promise = new MiniPromise((resolve, reject) => {
            if (this.status === MiniPromise.PENDING) {
                console.log(this);
                this.onResolvedCallbacks.push(() => {
                    this.parse(promise, onFulfilled(this.value), resolve, reject);
                });

                this.onRejectedCallbacks.push(() => {
                    this.parse(promise, onRejected(this.value), resolve, reject);
                });
            }

            if (this.status === MiniPromise.FULFILLED) {
                console.log("promise fulfilled");
            }
            if (this.status === MiniPromise.REJECTED) {
                console.log("promise reject");
            }
        });

        return promise;
    }

    parse(promise, result, resolve, reject) {
        if (promise == result) {
            throw new TypeError("Chaining cycle detected");
        }
        try {
            if (result instanceof MiniPromise) {
                result.then(resolve, reject);
            } else {
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    }
}

// if (this.status === MiniPromise.FULFILLED) {
//     setTimeout(() => {
//         onFulfilled(this.value);
//     }, 0);
// }

// if (this.status === MiniPromise.REJECTED) {
//     setTimeout(() => {
//         onRejected(this.reason);
//     }, 0);
// }

// if (this.status === MiniPromise.PENDING) {
//     this.onResolvedCallbacks.push(() => {
//         setTimeout(() => {
//             onFulfilled(this.value);
//         }, 0);
//     });

//     this.onRejectedCallbacks.push(() => {
//         setTimeout(() => {
//             onRejected(this.reason);
//         }, 0);
//     });
// }
