Array.prototype.myReduce = function(fn, initValue) {
  const _this = this
  const len = _this.length
  let accumulator = undefined, k = 0, kPresent = false
  
  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' is not a function')
  }

  if (len === 0 && initValue !== undefined) {
    throw new TypeError('reduce of empty array with no initial value')
  }

  if (initValue !== undefined) {
    accumulator = initValue
  } else {
    accumulator = _this[k]
    k ++
  }

  while (k < len) {
    kPresent = _this.hasOwnProperty(k)
    if (kPresent) {
      const kValue = _this[k]
      accumulator = fn.apply(undefined, [accumulator, kValue, k, _this])
    }
    k ++
  }
}

const arr = [1, 2, 3]
const res = arr.reduce((be, af, k, array) => {
  console.log(be, af, k, array)
  return be + af * 2
}, 0.5)

console.log(res)
