class MiniPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    static resolvePromise(promise, result, resolve, reject) {
        if (promise === result) {
            throw new TypeError('Chaining cycle detected for promise');
        }

        if (result instanceof MiniPromise) {
            result.then(
                value => {
                    // console.log('resolve promise', value);
                    // resolve(value);
                    MiniPromise.resolvePromise(promise, value, resolve, reject);
                },
                reason => {
                    reject(reason);
                }
            );
        } else {
            resolve(result);
        }
    }

    static resolve(value) {
        return new MiniPromise((resolve, reject) => {
            if (value instanceof MiniPromise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        });
    }
    static reject(reason) {
        return new MiniPromise((resolve, reject) => {
            reject(reason);
        });
    }

    static all(promises) {
        const values = [];
        return new MiniPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(
                    value => {
                        values.push(value);
                        if (values.length === promises.length) {
                            resolve(values);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                );
            });
        });
    }

    static race(promises) {
        return new MiniPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(
                    value => {
                        resolve(value);
                    },
                    reason => {
                        reject(reason);
                    }
                );
            });
        });
    }

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
            this.reject(error);
        }
    }

    resolve = data => {
        if (this.status === MiniPromise.PENDING) {
            this.value = data;
            this.status = MiniPromise.FULFILLED;
            this.onResolvedCallbacks.forEach(fn => fn(this.value));
        }
    };

    reject = reason => {
        if (this.status === MiniPromise.PENDING) {
            this.reason = reason;
            this.status = MiniPromise.REJECTED;
            this.onRejectedCallbacks.forEach(fn => fn(this.reason));
        }
    };

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = value => value;
        }
        if (typeof onRejected !== 'function') {
            onRejected = reason => reason;
        }

        let promise = null;
        promise = new MiniPromise((resolve, reject) => {
            if (this.status === MiniPromise.FULFILLED) {
                setTimeout(() => {
                    try {
                        let result = onFulfilled(this.value);
                        MiniPromise.resolvePromise(promise, result, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }

            if (this.status === MiniPromise.REJECTED) {
                setTimeout(() => {
                    try {
                        let result = onRejected(this.reason);
                        MiniPromise.resolvePromise(promise, result, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }

            if (this.status === MiniPromise.PENDING) {
                this.onResolvedCallbacks.push(value => {
                    try {
                        let result = onFulfilled(value);
                        MiniPromise.resolvePromise(promise, result, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });

                this.onRejectedCallbacks.push(reason => {
                    try {
                        let result = onRejected(reason);
                        MiniPromise.resolvePromise(promise, result, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        });
        return promise;
    }
}
