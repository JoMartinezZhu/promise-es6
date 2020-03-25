class MyPromise {
    constructor(excutor) {
        this.state = MyPromise.PENDING;
        this.value = null;
        this.callbacks = [];
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        try {
            excutor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(value) {
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.FULFILLED;
            this.value = value;
            // TODO: 执行 等待操作
            this.callbacks.forEach(cb => {
                cb.onFulFilled(value);
            });
        }
    }

    // 将状态改变成 rejected,然后执行后续操作
    reject(reason) {
        if (this.state === MyPromise.PENDING) {
            this.state = MyPromise.REJECTED;
            this.value = reason;
            // TODO: 执行 等待操作
            this.callbacks.forEach(cb => {
                cb.onRejected(reason);
            });
        }
    }

    then(onFulFilled, onRejected) {
        if (typeof onFulFilled !== "function") {
            onFulFilled = v => {};
        }

        if (typeof onRejected !== "function") {
            onRejected = v => {};
        }

        if (this.state === MyPromise.PENDING) {
            this.callbacks.push({
                onFulFilled: value => {
                    try {
                        onFulFilled(this.value);
                    } catch (error) {
                        // TODO: 使用catch处理
                        onRejected(error);
                    }
                },
                onRejected: reason => {
                    // TODO: 使用catch处理
                    try {
                        onRejected(this.value);
                    } catch (error) {
                        // TODO: 使用catch处理
                        onRejected(error);
                    }
                }
            });
        }

        if (this.state === MyPromise.FULFILLED) {
            setTimeout(() => {
                try {
                    onFulFilled(this.value);
                } catch (error) {
                    // TODO: 使用catch处理
                    onRejected(error);
                }
            }, 0);
        }

        if (this.state === MyPromise.REJECTED) {
            setTimeout(() => {
                try {
                    onRejected(this.value);
                } catch (error) {
                    // TODO: 使用catch处理
                    onRejected(error);
                }
            }, 0);
        }
    }

    catch(onHandleError) {
        if (typeof onHandleError !== "function") {
            onHandleError = () => {};
        }
        onHandleError();
    }
}

MyPromise.PENDING = "pending";
MyPromise.FULFILLED = "fulfilled";
MyPromise.REJECTED = "rejected";
