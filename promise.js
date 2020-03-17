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
      console.log(MyPromise.PENDING);
      this.callbacks.push({
        onFulFilled: value => {
          onFulFilled(value);
        },
        onRejected: reason => {
          onRejected(reason);
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
          console.log(1);
          onRejected(this.value);
        } catch (error) {
          console.log(error);
          // TODO: 使用catch处理
          // onRejected(error);
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

/**
 * MyPromise case
 */

new MyPromise((resolve, reject) => {
  // do something
  console.log("开始执行 MyPromise 了");
  // resolve("MyPromise resolve");
  reject("MyPromise reject");
}).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(a);
  }
);

console.log("=====1==end======");
// .catch(reason => {
//   console.log("MyPromise catch");
// });

/**
 * 原生Promoise case
 */

// new Promise((resovle, reject) => {
//   console.log("开始执行 Promise 了");
//   resovle("native");
// })
//   .then(
//     value => {
//       console.log(value);
//     },
//     reason => {
//       console.log(reason);
//     }
//   )
//   .catch(reason => {
//     console.log("Promise catch ");
//   });
// console.log("=====2==end======");
