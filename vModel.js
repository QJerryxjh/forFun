// const data = {

// }
// let name = 'qjerry'
// console.log(data.name)
// Object.defineProperty(data, 'name', {
//   set(value) {
//     name = value
//   },
//   get() {
//     return name
//   }
// })
// data.name = 'qje'
// console.log(data.name)

const data = {
  name: 'qjerry',
  age: 18
}

const obj = new Proxy(data, {
  set(target, key, value, receiver) {
    target[key] = value
  },
  get(target, key) {
    return target[key]
  }
})

obj.name = 'qje'
console.log(obj.name, obj.age)
