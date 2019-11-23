Object.prototype.myGetOwnPropertyNames = function() {
  const ownProperties = []
  for (let i in this) {
    if (this.hasOwnProperty(i)) {
      ownProperties.push(i)
    }
  }
  return ownProperties
}

const obj = {
  a: 1,
  b: 2,
  c: 3
}

console.log(obj.myGetOwnPropertyNames())