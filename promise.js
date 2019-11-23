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
