const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class myPromise {
  constructor(fn) {
    this.state = PENDING
    this.data = null
    this.reason = null
    this.fulfilledCallback = []
    this.rejectedCallback = []

    const resolve = value => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.data = value
        this.fulfilledCallback.forEach(cb => cb(value))
      }
    }
    const reject = reason => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.rejectedCallback.forEach(cb => cb(reason))
      }
    }
    
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
    
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

    let promise2
    if (this.state === PENDING) {
      promise2 = new myPromise((resolve, reject) => {
        this.fulfilledCallback.push((value) => {
          setTimeout(() => {
            try {
              let x = onResolved(value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })

        this.rejectedCallback.push((reason) => {
          setTimeout(() => {
            try {
              let x = onRejected(reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      })
    } else if (this.state === FULFILLED) {
      promise2 = new myPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onResolved(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    } else if (this.state === REJECTED) {
      promise2 = new myPromise((resolve, reject) => {
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
    return promise2
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new Error('循环引用'))
    }

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      let called
      try {
        const then = x.then
        if (typeof then === 'function') {
          then.call(x, y => {
            if (called) {
              return
            }
            called = true
            this.resolvePromise(promise2, y, resolve, reject)
          }, reason => {
            if (called) {
              return
            }
            called = true
            reject(reason)
          })
        } else {
          resolve(x)
        }
      } catch (error) {
        if (called) {
          return
        }
        called = true
        reject(error)
      }
    } else {
      resolve(x)
    }
  }

  catch(fn) {
    this.then(null, fn)
  }
  
}

myPromise.resolve = function(v) {
  return new myPromise((resolve) => {
    resolve(v)
  })
}

myPromise.reject = function(r) {
  return new myPromise((resolve, reject) => {
    reject(r)
  })
}

myPromise.all = function(promises = []) {
  let arr = []
  let index = 0

  function processData(i, data, resolve) {
    arr[i] = data
    index ++
    if (index === promises.length) {
      resolve(arr)
    }
  }

  return new myPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(data => {
        processData(i, data, resolve)
      }, reject)
    }
  })
}

myPromise.race = function (promises = []) {
  return new myPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i ++) {
      promises[i].then(resolve, reject)
    }
  })
}

const pro = new myPromise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  }, 1000)
})

pro.then().then((v) => {
  console.log(v)
  return 2
}).then(v => {
  console.log(v)
}).catch(r => {
  console.log(r)
})

console.log(pro)