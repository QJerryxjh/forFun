// const pro1 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 1000);
// })

// const pro3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(2)
//   }, 100);
// })

// const pro2 = 3

// Promise.all([pro1, pro2, pro3]).then((data) => {console.log(data)})

// function* gen() {
//   const res = yield setTimeout(() => {
//     console.log(1)
//   }, 1000)
// }

// const g = gen()
// console.log(g.next().value instanceof Promise)

// async function name() {
//   const a = await 2
//   return a
// }
// console.log(name().then((data) => {console.log(data)}))

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(fn) {
    this.state = PENDING
    this.value = null
    this.reason = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach(cb => {
          cb(this.value)
        })
      }
    }

    const reject = reason => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(cb => {
          cb(this.reason)
        })
      }
    }

    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    // 处理传递给then的参数，如果不是函数，成功就返回值本身，失败就以值为error抛出
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : y => y
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

    let promise2
    if (this.state === FULFILLED) {
      // 已经是完成状态
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            console.log('then this value', this.value)
            let x = onFulfilled(this.value) // 传递给then的onResolve方法返回值
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e) // 为什么用promise2的reject
          }
        }, 0)
      })
    }

    if (this.state === REJECTED) {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    }

    if (this.state === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              let x = onFulfilled(value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })

        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              let x = onRejected(reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      })
    }

    return promise2
  }

  resolvePromise(promise2, x, resolve, reject) {

    if (x === promise2) {
      return reject(new Error('循环引用'))
    }
    
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      // 防止resolve过的就不再reject了，创造一个标志
      let called
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(x, y => {
            if (called) {
              return
            }
            called = true
            this.resolvePromise(promise2, y, resolve, reject)
          }, error => {
            if (called) {
              return
            }
            called = true
            reject(error)
          })
        } else {
          resolve(x)
        }
      } catch (e) {
        if (called) {
          return
        }
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    resolve(value)
  })
}

MyPromise.reject = function (value) {
  return new MyPromise((resolve, reject) => {
    reject(value)
  })
}


MyPromise.all = function (promises = []) {
  let arr = []
  let index = 0

  function processData(i, data, resolve) {
    arr[i] = data  
    index ++
    if (index === promises.length) {
      resolve(arr)
    }
  }

  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i ++) {
      promises[i].then(data => {
        processData(i, data, resolve)
      }, reject)
    }
  })
}

MyPromise.race = function (promises = []) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i ++) {
      promises[i].then(resolve, reject)
    }
  })
}


const newPro1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

const newPro2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(3)
  }, 3000)
})


const newPro3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 5000)
})


MyPromise.race([newPro1, newPro2, newPro3]).then(res => console.log(res), err => console.log(err))

// newPro.then((res) => {
//   console.log(res)
//   return new MyPromise((resolve) => {
//     resolve(222)
//   })
// }, err => console.log(err))
//   .then(res => {
//     console.log(res)
//   })