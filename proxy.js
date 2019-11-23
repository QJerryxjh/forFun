// const obj = new Proxy({}, {
//   get(target, key, receiver) {
//     return target[key]
//   },
//   set(target, key, value, receiver) {
//     console.log('set')
//     return target[key] = value
//   }
// })

// obj.count = 1
// obj.count ++

var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype
    }
    return 'Hello, ' + name
  },

  apply: function(target, thisBinding, args) {
    return args[0]
  },

  construct: function(target, args) {
    return {value: args[1]}
  }
}

var fproxy = new Proxy(function(x, y) {
  return x + y
}, handler)


fproxy.apply(null, [1, 2])

// const obj = new Proxy({
//   name: 'qjerry'
// }, {
//   get(target, key) {
//     return target[key]
//   }, 
//   has(target, propKey) {
//     return !!target[propKey]
//   },
//   deleteProperty(target, propKey) {
//     delete target[propKey]
//     return true
//   }
// })

// console.log('name' in obj)
// console.log(delete obj.name)
// console.log('name' in obj)
