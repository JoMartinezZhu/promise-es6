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
        if (this.status === MiniPromise.FULFILLED) {
            setTimeout(() => {
                onFulfilled(this.value);
            }, 0);
        }

        if (this.status === MiniPromise.REJECTED) {
            setTimeout(() => {
                onRejected(this.reason);
            }, 0);
        }

        if (this.status === MiniPromise.PENDING) {
            this.onResolvedCallbacks.push(() => {
                setTimeout(() => {
                    onFulfilled(this.value);
                }, 0);
            });

            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    onRejected(this.reason);
                }, 0);
            });
        }
    }
}
