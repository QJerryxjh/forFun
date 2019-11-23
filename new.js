function myNew(fn, ...params) {
  const _this = {}
  _this.__proto__ = fn.prototype
  const ret = fn.call(_this, ...params)
  return Object.prototype.toString.bind(ret) === 'object Object' ? ret : _this
}

function Person(name, age) {
  this.name = name
  this.age = age
}

const me = myNew(Person, 'qjerry', 18)
console.log(me)
