// function* helloGenerator() {
//   console.log('1')
//   yield 'hello'
//   console.log('2')
//   yield 'world'
//   console.log('3')
//   return 'ending'
// }

// const helloWorld = helloGenerator()
// console.log([...helloWorld])
// const first = helloWorld.next()
// console.log(first)
// const second = helloWorld.next()
// console.log(second)
// const third = helloWorld.next()
// console.log(third)
// for (let i in helloWorld) {
//   console.log(i)
// }

// function* foo() {
//   yield 1
//   yield 2
//   yield 3
//   yield 4
//   return 5
// }

// const res = foo()

// for (let i of res) {
//   console.log(i)
// }

// console.log([...res])

// const obj = {a: 1, b: 2}

// function* objectEntries(obj) {
//   let propKeys = Reflect.ownKeys(obj)

//   for (let propKey of propKeys) {
//     yield [propKey, obj[propKey]]
//   }
// }

// function* objectEntries() {
//   let propKeys = Object.keys(this)

//   for (let propKey of propKeys) {
//     yield [propKey, this[propKey]]
//   }
// }

// obj[Symbol.iterator] = objectEntries





// for (let [key, value] of obj) {
//   console.log(key, value)
// }

// function* foo() {
//   yield 1
//   yield 2
//   yield 3
//   return 4
// }

// function* bar() {
//   yield 8
//   yield* foo()
//   yield 10
// }

// const res = bar()
// console.log(res.next())
// console.log(res.next())
// console.log(res.next())
// console.log(res.next())
// console.log(res.next())
// console.log(res.next())

function* gen(x) {
  var y = yield 2
  yield y
  console.log(y, '--')
  return y
}

const g = gen(1)
console.log(g.next())
console.log(g.next())
console.log(g.next())