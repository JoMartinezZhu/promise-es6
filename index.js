new Promise((resovle, reject) => {
  console.log("开始执行 Promise 了");
  setTimeout(() => {
    resovle("native");
  }, 1000);
})
  .then(
    value => {
      console.log(value);
    },
    reason => {
      console.log(reason);
    }
  )
  .catch(reason => {
    console.log("Promise catch ");
  });
console.log("=====2==end======");
